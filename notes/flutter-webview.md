# Flutter WebView & App Wrapping — Complete Notes

---

## 1. The Problem This Technology Solves

Imagine a company already has a fully working web application — a React dashboard, an Angular portal, a Vue CRM. Now the business wants Android and iOS apps. There are two paths:

**Option A — Rewrite everything in Flutter.** Rebuild every screen, every route, every form, every API call. Months of work, separate codebase to maintain forever, and you need Flutter developers who weren't originally on the web team.

**Option B — Wrap the existing website.** Flutter opens the website inside the mobile app. The web team keeps shipping. The app is live in days, not months.

| Approach | Dev Cost | Performance | Offline | Native Features | Maintenance |
|---|---|---|---|---|---|
| **Full Flutter UI** | High | Excellent | Yes | Excellent | Separate codebase |
| **WebView Wrapper** | Very Low | Good | No | Limited | Single frontend |
| **Hybrid (Flutter + WebView)** | Medium | Excellent | Partial | Excellent | Balanced |

Many startups begin with a WebView wrapper — same team, same frontend, zero duplication — and layer in native Flutter screens only where the user experience demands it.

**Interview one-liner:** *"WebView solves the problem of reusing an existing web application inside a native mobile app without rebuilding the UI from scratch — the web team ships once and both platforms benefit."*

---

## 2. Core Definition — What Is Flutter WebView?

A **WebView** is an embedded browser component inside your mobile application. It is not Chrome. It is not Safari. It is a browser *engine* exposed as a UI widget that sits inside your app's layout.

Flutter itself has no idea how to parse HTML or CSS. It delegates that entirely to the platform's native browser component:

- **Android** → `android.webkit.WebView` (Chromium/Blink engine)
- **iOS** → `WKWebView` (WebKit engine)

The `webview_flutter` plugin wraps both of these into a single cross-platform Flutter widget.

```
┌──────────────────────────────┐
│        Flutter App           │
│  ┌────────────────────────┐  │
│  │  Flutter UI (widgets)  │  │
│  ├────────────────────────┤  │
│  │       WebView          │  │
│  │  (platform browser)    │  │
│  │  company.com/mobile    │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Commonly Confused Terms

| Term | What it actually is |
|---|---|
| **Browser** | A full application — Chrome, Safari, Firefox |
| **Browser Engine** | The rendering core — Blink (Chrome), WebKit (Safari) |
| **WebView** | The browser engine embedded as a widget in your app |
| **`webview_flutter`** | Flutter's wrapper around the native WebView |
| **`url_launcher`** | Opens URLs in the external browser — user *leaves* your app |
| **Custom Tabs / SFSafariViewController** | Lightweight OS browser UI — still external, less control |

**Interview one-liner:** *"Flutter WebView is a Flutter widget that embeds the platform's native browser engine (WKWebView on iOS, Chromium on Android) inside your app as a widget you can place anywhere in the tree."*

---

## 3. How It Actually Works Under the Hood

When Flutter renders a `WebViewWidget`, it is doing something fundamentally different from every other Flutter widget. Normal Flutter widgets are drawn on Flutter's own Skia/Impeller canvas. The WebView **cannot** be drawn that way — it has its own GPU-accelerated rendering pipeline. Flutter uses a mechanism called a **Platform View** to handle this.

### The Platform View Bridge

```
Flutter Widget Tree
        │
        ▼
  WebViewWidget          ← Flutter widget (just a handle/placeholder)
        │
        ▼
Platform View Bridge     ← Flutter engine ↔ native layer glue
        │
        ▼
  Native WebView         ← android.webkit.WebView / WKWebView
  (own render surface,   ← renders HTML/CSS/JS independently
   managed by OS)
```

Flutter tells the OS: *"Create a native WebView at these coordinates, this size."* The OS renders it on a **separate surface layer** composited alongside Flutter's canvas. Flutter handles position/size/touch routing; the browser handles everything inside.

### Step-by-Step Page Load Flow

1. You call `controller.loadRequest(Uri.parse('https://example.com'))`
2. Flutter sends this over a **platform channel** to the native WebView
3. The native WebView makes the HTTP request — DNS, TCP, TLS, all of it
4. The server returns HTML, CSS, JavaScript, assets
5. The browser engine parses and renders them — Flutter is not involved in this at all
6. The rendered output appears inside `WebViewWidget`'s position in your Flutter layout

### The Communication Bridge

```
Web Page (JS)                          Flutter (Dart)
──────────────────────────────────────────────────────
FlutterBridge.postMessage(JSON)   →   onMessageReceived callback
                                  ←   controller.runJavaScript(...)
```

**Interview one-liner:** *"Flutter delegates all HTML rendering to the native platform WebView using platform channels. The WebView is composited on a separate OS surface layer — it never goes through Flutter's own rendering engine."*

---

## 4. Core Properties / Characteristics

| Property | Explanation |
|---|---|
| **Native rendering** | HTML/CSS/JS rendered by the OS browser engine, not Flutter |
| **Stateful** | Maintains browsing history, scroll position, cookies across navigations |
| **JavaScript support** | Full JS engine — can run any JS the platform browser supports |
| **Cookie support** | Persistent cookie jar, same as a real browser session |
| **Cache support** | Browser-level HTTP cache |
| **Platform View cost** | Heavier than normal Flutter widgets — creates an extra render layer |
| **Async by nature** | All controller calls go over platform channels — always async |
| **Native API access** | Only via the JS bridge — web can't directly call Flutter without it |

---

## 5. Raw Platform WebView vs. `webview_flutter` vs. `flutter_inappwebview`

Without the Flutter plugin you'd write separate Kotlin and Swift code for each platform. The plugin hides all of that:

| Feature | Raw Native WebView | `webview_flutter` (official) | `flutter_inappwebview` (community) |
|---|---|---|---|
| Platform-specific code | Required | Hidden | Hidden |
| Flutter Widget | ✗ | ✅ | ✅ |
| Cross-platform | ✗ | ✅ | ✅ |
| Navigation delegate | Manual | `NavigationDelegate` | Full + `shouldOverrideUrlLoading` |
| JS → Flutter messages | Custom interfaces | `JavaScriptChannel` | `WebMessageListener` + more |
| JS return values | Manual | ✗ (fire-and-forget only) | ✅ `evaluateJavascript()` |
| Cookie management | `CookieManager` | Basic `WebViewCookieManager` | Full get/set/delete |
| File upload (`<input type=file>`) | Full | Partial | Full |
| Download handling | `DownloadManager` | ✗ | ✅ `onDownloadStartRequest` |
| Pull-to-refresh | Manual | ✗ | ✅ `PullToRefreshController` |

**Interview one-liner:** *"Use `webview_flutter` for straightforward embedding. Upgrade to `flutter_inappwebview` the moment you need JS return values, file uploads, download handling, or fine-grained cookie control — `webview_flutter`'s API is deliberately minimal."*

---

## 6. Core Components — Practical Breakdown

### 6a. `WebViewController`

The central object. All configuration and commands go through it. Create it before the widget is built.

```dart
final controller = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..loadRequest(Uri.parse('https://example.com'));
```

Key methods:

| Method | What it does |
|---|---|
| `loadRequest(Uri)` | Navigate to a URL |
| `loadHtmlString(String)` | Load a raw HTML string — useful for local content |
| `runJavaScript(String)` | Execute JS — fire and forget, no return value |
| `runJavaScriptReturningResult(String)` | Execute JS and await the result as `Object` |
| `goBack()` / `goForward()` | Browser navigation |
| `reload()` | Refresh the current page |
| `canGoBack()` / `canGoForward()` | Check if navigation is possible |
| `currentUrl()` | Get the currently loaded URL |

> **Common mix-up:** `loadHtmlString()` loads raw HTML; `loadRequest()` fetches a URL over the network. They are not interchangeable.

---

### 6b. `WebViewWidget`

The actual Flutter widget — a thin display shell. All it does is render the WebView surface at the size/position your layout gives it. **All config goes on the controller, never on this widget.**

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: WebViewWidget(controller: controller),
  );
}
```

---

### 6c. `NavigationDelegate`

Observes and controls every navigation event. Set it on the controller.

```dart
controller.setNavigationDelegate(NavigationDelegate(
  onPageStarted: (url) { /* show loading spinner */ },
  onPageFinished: (url) { /* hide spinner */ },
  onWebResourceError: (error) { /* show error UI */ },
  onNavigationRequest: (request) {
    // Only your domain loads inside the WebView
    if (request.url.startsWith('https://myapp.com')) {
      return NavigationDecision.navigate;
    }
    // Block everything else (or launch externally)
    return NavigationDecision.prevent;
  },
));
```

`onNavigationRequest` is the key hook for a WebView wrapper — it keeps the WebView locked to your own content and prevents the user from accidentally navigating into the open web.

---

### 6d. `JavaScriptChannel`

The bridge for **web → Flutter** messaging. You register a named channel in Dart; Flutter injects it as a global object on `window` in the web page automatically.

**Dart side:**
```dart
controller.addJavaScriptChannel(
  'FlutterBridge',
  onMessageReceived: (JavaScriptMessage message) {
    final data = jsonDecode(message.message);
    if (data['action'] == 'request_push_permission') {
      _requestNotificationPermission();
    }
  },
);
```

**JS side (in your React/Vue app):**
```javascript
// Guard: FlutterBridge only exists inside the Flutter app, not in a browser
if (window.FlutterBridge) {
  FlutterBridge.postMessage(JSON.stringify({ action: 'request_push_permission' }));
}
```

For **Flutter → web** messages, call JS directly:
```dart
await controller.runJavaScript(
  'window.dispatchEvent(new CustomEvent("flutterMessage", { detail: ${jsonEncode(payload)} }))'
);
```

---

### 6e. `WebViewCookieManager`

Sets cookies *before* loading a URL — the primary way to pass an auth token from the native app into the web session.

```dart
await WebViewCookieManager().setCookie(
  const WebViewCookie(
    name: 'auth_token',
    value: 'your_jwt_here',
    domain: 'myapp.com',
    path: '/',
  ),
);
// Now load — the page receives the cookie as if the user logged in via browser
await controller.loadRequest(Uri.parse('https://myapp.com/dashboard'));
```

---

## 7. Wrapping Your Entire App in a Flutter WebView Shell

This is the architecture used when your product's primary UI is a web app (React/Vue/Angular SPA) and you want to ship it as a native mobile app. Flutter acts as a **host shell** providing native capabilities the web cannot: push notifications, biometrics, camera, deep links, and platform permissions.

### Shell Architecture

```
┌──────────────────────────────────────────────┐
│             Flutter App Shell                │
│  ┌────────────────────────────────────────┐  │
│  │         Full-Screen WebView            │  │
│  │   (your entire web app renders here)  │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Flutter handles natively:                   │
│  • FCM push notifications                    │
│  • Biometric authentication                  │
│  • Deep link routing                         │
│  • Platform permissions (camera, mic, etc.)  │
│  • App lifecycle & background tasks          │
└──────────────────────────────────────────────┘
```

### Complete `WebAppShell` Implementation

```dart
// lib/screens/web_app_shell.dart

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebAppShell extends StatefulWidget {
  const WebAppShell({super.key});

  @override
  State<WebAppShell> createState() => _WebAppShellState();
}

class _WebAppShellState extends State<WebAppShell> {
  late final WebViewController _controller;
  bool _isLoading = true;
  bool _hasError = false;

  static const String _baseUrl = 'https://yourapp.com';

  @override
  void initState() {
    super.initState();
    _initController();
  }

  void _initController() {
    _controller = WebViewController()
      // 1. Enable JavaScript
      ..setJavaScriptMode(JavaScriptMode.unrestricted)

      // 2. Observe and gate navigation
      ..setNavigationDelegate(NavigationDelegate(
        onPageStarted: (_) =>
            setState(() { _isLoading = true; _hasError = false; }),
        onPageFinished: (_) =>
            setState(() => _isLoading = false),
        onWebResourceError: (error) {
          if (error.isForMainFrame == true) {
            setState(() { _isLoading = false; _hasError = true; });
          }
        },
        onNavigationRequest: (request) {
          // Allow only your domain inside the WebView
          if (Uri.parse(request.url).host == Uri.parse(_baseUrl).host) {
            return NavigationDecision.navigate;
          }
          return NavigationDecision.prevent; // block external URLs
        },
      ))

      // 3. Register JS → Flutter bridge
      ..addJavaScriptChannel('FlutterBridge', onMessageReceived: _handleWebMessage)

      // 4. Load the app
      ..loadRequest(Uri.parse(_baseUrl));
  }

  /// Receives messages from the web app:
  /// FlutterBridge.postMessage(JSON.stringify({ action: '...', payload: {} }))
  void _handleWebMessage(JavaScriptMessage message) {
    final data = jsonDecode(message.message) as Map<String, dynamic>;
    switch (data['action']) {
      case 'request_push_permission':
        _requestPushPermission();
        break;
      case 'navigate_native':
        Navigator.pushNamed(context, data['route'] as String);
        break;
      case 'show_dialog':
        _showNativeDialog(data['payload'] as Map<String, dynamic>);
        break;
    }
  }

  /// Sends a message from Flutter back to the web page
  Future<void> _sendToWeb(Map<String, dynamic> payload) async {
    final json = jsonEncode(payload);
    await _controller.runJavaScript(
      'window.dispatchEvent(new CustomEvent("flutterMessage", { detail: $json }))',
    );
  }

  void _requestPushPermission() {
    // Call your notification service here, then notify web when done
    _sendToWeb({'event': 'push_permission_result', 'granted': true});
  }

  void _showNativeDialog(Map<String, dynamic> payload) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(payload['title'] ?? ''),
        content: Text(payload['message'] ?? ''),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _sendToWeb({'event': 'dialog_dismissed'});
            },
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            WebViewWidget(controller: _controller),

            if (_isLoading)
              const Center(child: CircularProgressIndicator()),

            if (_hasError)
              Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.wifi_off, size: 64, color: Colors.grey),
                    const SizedBox(height: 16),
                    const Text('Unable to connect'),
                    const SizedBox(height: 8),
                    ElevatedButton(
                      onPressed: () => _controller.reload(),
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
```

**Wire it as your root screen in `main.dart`:**

```dart
runApp(MaterialApp(
  home: const WebAppShell(),
));
```

### Web-Side Bridge Listener (in your React/Vue app)

```javascript
// Listen for messages from Flutter
window.addEventListener('flutterMessage', (event) => {
  const { detail } = event;
  if (detail.event === 'push_permission_result') {
    console.log('Push granted:', detail.granted);
  }
});

// Send a message to Flutter
function requestPushNotifications() {
  if (window.FlutterBridge) { // guard: only exists inside the Flutter app
    FlutterBridge.postMessage(JSON.stringify({ action: 'request_push_permission' }));
  }
}
```

### Deep-Link Routing Example

Push notification arrives → Flutter intercepts it → loads the right URL inside the WebView:

```dart
// When FCM notification arrives with a guestId
void _handleNotification(Map<String, dynamic> data) {
  final guestId = data['guest_id'];
  _controller.loadRequest(
    Uri.parse('https://yourapp.com/guest/$guestId'),
  );
  // Or inject JS to navigate without a full reload:
  _controller.runJavaScript('window.navigateTo("/guest/$guestId")');
}
```

---

## 8. Alternatives — When to Use What

| Option | Best for | Avoid when |
|---|---|---|
| **Full Flutter UI** | Maximum performance, offline-first, heavy animations | An existing web app is already built |
| **WebView Wrapper** | Internal dashboards, CRMs, admin panels, existing SPAs | Games, AR, camera-heavy apps |
| **Hybrid (Flutter + WebView)** | You need native feel for key screens but have a large web codebase | Team can't maintain two tech stacks |
| **React Native** | Shared JS codebase across web and mobile | You're already in the Flutter/Dart ecosystem |
| **PWA** | Browser users who need installability | App Store distribution, native hardware access |
| **Trusted Web Activity (Android only)** | Verified PWAs that pass browser quality bars | iOS support is required |

**Interview one-liner:** *"Choose WebView when the primary goal is code reuse, not maximum native performance. For apps where animation quality, offline access, or device hardware are critical, build native Flutter screens instead — but even then, WebView is valuable for the parts of the app that don't need it."*

---

## 9. Pros & Cons

### WebView Architecture (General)

| Pros | Cons |
|---|---|
| Drastically lower development cost | Scroll physics and animations feel slightly off vs native |
| Single frontend — web team ships for all platforms | No offline support unless you explicitly cache |
| App updates go live without App Store review | Limited access to native APIs without a JS bridge |
| Existing auth, routing, and state management reused | JS bridge is stringly-typed — errors fail silently |
| Simpler maintenance — one codebase | App Store may reject thin wrappers (Apple guideline 4.2) |

### `webview_flutter` (Plugin Specifically)

| Pros | Cons |
|---|---|
| Maintained by Flutter team, stable | Missing: JS return values, downloads, advanced cookies |
| Well-documented, matches Flutter releases | Platform View rendering cost |
| Simple, clean API surface | Forces you to `flutter_inappwebview` for advanced needs |

---

## 10. Scaling / Production Gotchas

### ⚠️ Apple App Store Rejection — Guideline 4.2

Apple's **Minimum Functionality** guideline explicitly rejects apps that are little more than a WebView shell over a public website. If your app opens `company.com` and offers nothing else, it will be rejected.

**How to survive review:**
- Add genuine native value: push notifications, biometrics, camera, Face ID login
- Ensure the app provides a useful experience even if the web content fails to load
- Don't wrap a publicly accessible URL that users could just open in Safari
- Highlight native features prominently in your App Store listing

> This is one of the most common interview questions on WebView architecture: *"What's the risk of wrapping a web app in Flutter?"* — App Store rejection for thin wrappers is the answer.

### Memory & Performance

Each live `WebViewWidget` holds a full browser engine in memory. Creating and destroying WebViews as the user navigates is expensive.

**Fix:** Use a **single `WebViewController` kept alive at the app root** (the shell pattern above). Hide the `WebViewWidget` with `Visibility`/`Offstage` if you need to overlay Flutter screens temporarily — don't unmount it. Dispose explicitly only when truly done.

### Authentication & Cookie Synchronization

If your Flutter app has its own login screen, you need to inject the auth token into the WebView's cookie jar *before* loading — otherwise the web app's session is separate and the user appears logged out.

```dart
// After native login succeeds:
await WebViewCookieManager().setCookie(WebViewCookie(
  name: 'auth_token', value: token, domain: 'yourapp.com', path: '/',
));
await _controller.loadRequest(Uri.parse('https://yourapp.com/dashboard'));
```

---

## 11. Quick-Fire Interview Q&A

**Q: What is a WebView?**
A native browser component embedded as a widget inside a mobile application. On Android it uses Chromium (Blink engine), on iOS it uses WebKit (WKWebView). It renders HTML, CSS, and JavaScript the same way a real browser would.

**Q: Does Flutter render HTML itself?**
No. Flutter has no HTML parser or CSS engine. It delegates all web rendering to the platform-native browser component via a Platform View bridge. Flutter only manages the widget's position and size.

**Q: How does the web page call Flutter code?**
Through a `JavaScriptChannel`. Flutter registers a named channel; it's injected as a global `window.ChannelName` object in the web page. The page calls `ChannelName.postMessage(JSON)` and Flutter receives it in a Dart callback.

**Q: How does Flutter send data to the web page?**
By calling `controller.runJavaScript(...)` to execute any JS — typically dispatching a `CustomEvent` that the web page listens for with `window.addEventListener('flutterMessage', ...)`.

**Q: How do you keep a user logged in across Flutter and WebView?**
Set the auth cookie with `WebViewCookieManager().setCookie(...)` before calling `loadRequest()`. The WebView includes it in all subsequent requests to that domain, just like a real browser session.

**Q: How do push notifications open a specific screen inside a WebView app?**
The native Flutter layer receives the FCM notification, extracts the target path or ID from the payload, and either calls `controller.loadRequest(Uri.parse(targetUrl))` for a full navigation or injects JS via `runJavaScript` to navigate the SPA's router without a page reload.

**Q: What is the biggest risk with a WebView-wrapped app?**
Apple's App Store guideline 4.2 rejects "thin wrapper" apps that add no native value over the website. You must demonstrate genuine native features — push notifications, biometrics, hardware access — to pass review.

**Q: When should you NOT use WebView?**
For experiences requiring smooth animations, offline functionality, hardware-intensive operations (camera, AR, gaming), or very low-latency user interactions. WebView adds a rendering layer you don't control and can't optimize at the Flutter level.

---

## 12. One-Paragraph Summary

Flutter WebView embeds Android's `android.webkit.WebView` or iOS's `WKWebView` inside a Flutter app as a platform view — a separate OS-managed render surface composited alongside Flutter's own canvas. Flutter itself does not parse or render HTML; all of that is handled by the native browser engine. The `webview_flutter` plugin wraps this in a simple `WebViewController` / `WebViewWidget` API where all configuration (JavaScript mode, navigation delegate, cookie injection, JS channels) lives on the controller and the widget is just a display placeholder. The power of this architecture is the JavaScript bridge: the web page can call `FlutterBridge.postMessage()` to trigger native Flutter features (push notification permission, biometrics, dialogs), and Flutter can reply by calling `controller.runJavaScript()` to dispatch events the web page listens for. The canonical production pattern is a "Flutter shell" — a single full-screen `WebViewWidget` at the app's root, with native services like FCM, biometrics, and permissions handled outside the WebView and connected to the web app via this bridge. The critical production gotcha is Apple's guideline 4.2: a pure WebView wrapper with no native value-add will be rejected from the App Store, so the Flutter shell must provide tangible native features to survive review.
