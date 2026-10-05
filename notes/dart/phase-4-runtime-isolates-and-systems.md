# Dart Phase 4: VM Internals, Isolates, Memory & Systems

> **Status:** 🔴 Upcoming (Pro Level)  
> **Prerequisites:** Phase 1, Phase 2 & Phase 3  

---

## 📋 Curriculum Overview
- **Dart VM Architecture**: JIT + Kernel AST (Hot reload) vs AOT (Ahead-of-Time machine code) & Tree shaking.
- **Memory Management & GC**: Generational Garbage Collector (Young Scavenger vs Old Mark-Sweep), closure memory retention, and leak profiling.
- **True Multi-Threading with Isolates**: Why Dart isolates share zero heap memory, `Isolate.spawn`, `SendPort` / `ReceivePort`, and `Isolate.run()`.
- **Native Interoperability (FFI)**: `dart:ffi` pointers, structs, and zero-overhead native C/Rust interop.
- **Metaprogramming & Macros**: `build_runner` code generation vs native compile-time Dart Macros.

*(Full guide will be generated once Phase 3 is completed!)*
