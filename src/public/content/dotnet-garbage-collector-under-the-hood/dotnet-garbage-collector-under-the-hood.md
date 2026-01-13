---
title: "Garbage Collector in .NET — How It Works Under the Hood"
date: "2025-08-26"
slug: "dotnet-garbage-collector-under-the-hood"
excerpt: "A deep dive into how .NET's Garbage Collector works, from mark-and-compact algorithms to generational collection and performance optimization strategies"
thumbnail: "/images/dotnet-garbage-collector-under-the-hood-thumbnail.webp"
categories: ["Programming", ".NET"]
---

# Garbage Collector in .NET — How It Works Under the Hood

The .NET Garbage Collector is one of the most sophisticated memory management systems in modern programming platforms. Understanding how it works can help you write more efficient applications and troubleshoot memory-related issues.

## 1. The Core Idea

GC in .NET uses a **mark-and-compact algorithm** combined with **generational division** to minimize cleanup time and cost. It operates **asynchronously** (in the background) or **stop-the-world** (pausing threads) depending on the mode and settings.

## 2. GC Operation Steps — The Cleanup Cycle

### Step 1: Trigger (GC Activation)

GC starts in specific situations, such as:
* Running out of free memory in a given generation
* A large number of objects allocated in a short time
* Manual invocation of `GC.Collect()` (not recommended unless necessary)
* Operating system reporting low memory condition

### Step 2: Thread Suspension (Stop-the-world)

* GC **suspends all application threads** (called *suspend*) to get a consistent memory snapshot
* In **Server GC** mode — each CPU gets its own GC thread and works in parallel
* In **Workstation GC** mode — optimized for desktop applications with shorter pauses

### Step 3: Mark (Marking Live Objects)

1. GC **finds all "roots"**:
   * Variables on thread stacks (stack roots)
   * References in CPU registers
   * Static fields in classes
   * Objects pinned by `fixed` or `GCHandle`

2. From each root, it **recursively traverses all references** and marks objects as **live** (*reachable*)

💡 Think of it like drawing a map of all houses that have roads leading from the city center. Houses without roads = abandoned = ready for demolition.

### Step 4: Sweep

* Objects **not marked** in the previous step are considered garbage
* Their memory is added to the free memory pool

### Step 5: Compact

* GC **moves live objects** so they are arranged contiguously in memory
* Benefits:
  * No memory fragmentation
  * Fast allocation of new objects (just move the "free pointer")
* Exception: **Large Object Heap (LOH)** — not compacted by default (unless `GCSettings.LargeObjectHeapCompactionMode` is enabled)

### Step 6: Object Promotion

* If an object **survived cleanup in its generation**, it moves to a higher generation:
  * Gen 0 → Gen 1
  * Gen 1 → Gen 2
* **Gen 2** is cleaned least frequently because it contains long-lived objects
* This approach minimizes costs — most objects in .NET are short-lived, so they don't need to be moved around memory multiple times

## 3. Generation Cleanup Order

1. **GC starts with Gen 0**:
   * If enough memory is freed → done
2. If memory is still insufficient → **Gen 1 cleanup**
3. If still low on memory → **Full GC**:
   * Cleans Gen 2 and **Large Object Heap** (optionally compacts)
4. After GC completion, application threads resume

## 4. GC Operation Modes

* **Workstation GC** — shorter pauses, for desktop applications
* **Server GC** — longer but parallel cleanup, better for servers
* **Background GC** — Gen 2 cleaned in background without fully stopping the application

## 5. What Developers Should Know

* GC is smart, but not magical — if you leave references to an object, GC **won't remove it**
* External resources (files, DB connections, system handles) **must be freed manually** (`Dispose`, `using`)
* `GC.Collect()` is a last resort — often degrades performance instead of helping
* Monitor memory usage (`dotMemory`, `PerfView`, `dotnet-counters`) when applications have issues

## GC Operation Workflow Summary

```css
[Trigger] → [Thread Suspension] → [Mark] → [Sweep] → [Compact] → [Object Promotion] → [Resume]
```