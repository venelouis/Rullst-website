# ⚙️ Rullst Framework • Interactive Showcase

> **v2.0.3 Stable** - Isomorphic & Universal Compilation Engine.
> Translates declarative UI structures and server-side state machines into native Rust and WebAssembly pipelines.

Rullst is a high-performance web engineering framework built from the ground up to solve memory safety, execution latency, and deployment complexity. By replacing conventional JavaScript/VM interpretation loops with deterministic LLVM code emission, Rullst executes core workloads at microsecond speeds.

---

## 🎨 Interactive Showcase Features
This repository hosts the **official interactive landing page and runtime visualizer** for the Rullst ecosystem. Key sections include:

- **🚀 Live Benchmark Arena:** Visual comparison of request latency, throughput metrics, and resource footprints against Node.js and Go.
- **📦 Interactive Runtime Visualizer:** A built-in thread simulator leveraging a Tokio-inspired work-stealing reactor, letting you dispatch client requests and inspect scheduler core loads.
- **💎 Memory Allocator Tracer:** Step through stack and heap static allocation layouts live, demonstrating the power of zero GC pauses.
- **🧬 Syntax Playground:** Trace the isomorphic beauty of Rullst's template structures.
- **⚖️ Enterprise Isolation Sandbox:** Live testing of the Native SaaS Boundary Protection protocol ensuring multi-tenant SQL database-level safety.

---

## 🏗️ Getting Started (Web Showcase)

This landing page is built using **React, Vite, and Tailwind CSS** for clean, visual presentation of the core framework features.

### Prerequisites

You will need [Node.js](https://nodejs.org/) (Version 18 or later) installed.

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Local Development

Launch the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production Build

Compile the production assets into optimized static payloads:

```bash
npm run build
```

The resulting files will be written to the `dist/` directory, optimized with minimal footprint and zero external bundle leaks.

---

## 🚀 Automated Deployment with GitHub Pages

This project is configured with a fully automated CI/CD pipeline inside `.github/workflows/deploy.yml`. 

To host this beautiful showcase on your own GitHub account:

1. Push this repository to GitHub under your user account or organization.
2. Ensure **GitHub Actions** are turned on in your repository's settings under `Settings > Actions > General > Workflow permissions` set to **"Read and write permissions"**.
3. Any push to the `main` branch will automatically compile the showcase using Vite and deploy the production bundle directly to the `gh-pages` branch.

---

## ⚖️ Architectural Disclaimer

*Please note that the technical specifications, performance benchmarks, and interactive system models shown on the landing page are designed for conceptual presentation, illustrative simulation, and community evaluation purposes. Real-world implementation details are specified in individual module source crates.*

---
*Distributed under the Apache-2.0 License.*
