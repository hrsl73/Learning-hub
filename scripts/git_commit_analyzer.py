#!/usr/bin/env python3
"""
Git Commit Analyzer
A highly optimized, concurrent tool to scan multiple repositories for specific author commits and generate reports.
"""

import os
import argparse
import subprocess
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

def parse_date(date_str):
    try:
        # standard Git date formats (e.g., "Wed Jul 15 14:54:22 2026 +0530")
        if " +" in date_str:
            clean_date = date_str.split(" +")[0]
        elif " -" in date_str:
            clean_date = date_str.split(" -")[0]
        else:
            clean_date = date_str
        return datetime.strptime(clean_date.strip(), "%a %b %d %H:%M:%S %Y")
    except Exception:
        return datetime.min

def check_branch_exists(repo_path, branch):
    """Checks if a branch exists locally or remotely."""
    for b_name in [branch, f"origin/{branch}"]:
        check_cmd = ["git", "rev-parse", "--verify", b_name]
        if subprocess.run(check_cmd, cwd=repo_path, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0:
            return b_name
    return None

def analyze_repo_branch(repo_path, repo_name, branch, authors):
    """Analyzes a specific branch in a single repository."""
    branch_resolved = check_branch_exists(repo_path, branch)
    if not branch_resolved:
        return repo_name, branch, []

    # Build authors filter
    author_args = []
    for author in authors:
        author_args.append(f"--author={author}")

    # Git command: fetch commit metadata and name status of files
    cmd = [
        "git", "log", 
        branch_resolved,
        "--name-status", 
        "--pretty=format:COMMIT_START|%h|%ad|%s|%b"
    ] + author_args

    try:
        output = subprocess.check_output(cmd, cwd=repo_path, text=True, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError:
        return repo_name, branch, []

    commits = []
    current_commit = None

    for line in output.split('\n'):
        line = line.strip()
        if not line:
            continue

        if line.startswith("COMMIT_START|"):
            if current_commit:
                commits.append(current_commit)
            parts = line.split('|')
            current_commit = {
                "hash": parts[1] if len(parts) > 1 else "",
                "date_str": parts[2] if len(parts) > 2 else "",
                "date_parsed": parts[2] if len(parts) > 2 else "",  # Will sort using helper later
                "subject": parts[3] if len(parts) > 3 else "",
                "body": parts[4] if len(parts) > 4 else "",
                "files": []
            }
        else:
            if current_commit:
                current_commit["files"].append(line)

    if current_commit:
        commits.append(current_commit)

    return repo_name, branch, commits

def scan_workspace(base_dir, repos, branches, authors, max_workers=4):
    """Runs concurrent scanning across specified repositories and branches."""
    results = {}
    
    # Generate list of tasks to execute in parallel
    tasks = []
    for repo in repos:
        repo_path = os.path.abspath(os.path.join(base_dir, repo))
        if not os.path.exists(repo_path) or not os.path.exists(os.path.join(repo_path, ".git")):
            continue
        for branch in branches:
            tasks.append((repo_path, repo, branch))

    print(f"Starting concurrent scan of {len(tasks)} target branch-repo combinations using {max_workers} threads...")
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(analyze_repo_branch, path, name, branch, authors): (name, branch)
            for path, name, branch in tasks
        }
        
        for future in as_completed(futures):
            repo_name, branch, commits = future.result()
            if branch not in results:
                results[branch] = {}
            results[branch][repo_name] = commits
            print(f"  [{branch}] {repo_name}: Found {len(commits)} commits")
            
    return results

def generate_report(results, output_format, output_path):
    """Formats and writes the compiled commit report."""
    if output_format == "json":
        with open(output_path, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nReport written to: {output_path}")
        return

    # Generate Markdown/Text Report
    with open(output_path, 'w') as f:
        f.write("# Git Commit Search Report\n\n")
        f.write(f"Generated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        for branch, repos in results.items():
            f.write(f"## Branch: `{branch}`\n\n")
            
            # Combine commits across repos for chronological order per branch
            all_commits = []
            for repo_name, commits in repos.items():
                for c in commits:
                    all_commits.append({
                        "repo": repo_name,
                        **c
                    })
            
            # Sort by date descending
            all_commits.sort(key=lambda x: parse_date(x["date_str"]), reverse=True)
            
            f.write(f"Total Unique Commits: {len(all_commits)}\n\n")
            for idx, c in enumerate(all_commits, 1):
                f.write(f"### #{idx} [{c['repo']}] Commit: `{c['hash']}`\n")
                f.write(f"* **Date:** {c['date_str']}\n")
                f.write(f"* **Subject:** {c['subject']}\n")
                if c['body'].strip():
                    f.write(f"* **Details:** {c['body'].strip()}\n")
                
                if c['files']:
                    f.write("* **Files Modified:**\n")
                    for file in c['files']:
                        f.write(f"  - `{file}`\n")
                f.write("\n" + "-"*40 + "\n\n")
                
    print(f"\nReport written to: {output_path}")

def main():
    parser = argparse.ArgumentParser(description="Scan multiple Git repositories for commits by specific authors.")
    parser.add_argument("--dir", default=os.getcwd(), help="Base workspace directory containing repositories")
    parser.add_argument("--repos", nargs="+", required=True, help="List of subdirectories (repositories) to scan")
    parser.add_argument("--branches", nargs="+", default=["develop"], help="Branches to scan (e.g. develop feat/vendor)")
    parser.add_argument("--authors", nargs="+", required=True, help="Author names or emails to filter by")
    parser.add_argument("--format", choices=["json", "md"], default="md", help="Output format")
    parser.add_argument("--output", default="commit_report.md", help="Path to write the report file")
    parser.add_argument("--workers", type=int, default=4, help="Maximum thread pool workers")

    args = parser.parse_args()

    results = scan_workspace(
        base_dir=args.dir,
        repos=args.repos,
        branches=args.branches,
        authors=args.authors,
        max_workers=args.workers
    )
    
    generate_report(results, args.format, args.output)

if __name__ == "__main__":
    main()
