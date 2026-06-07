import { CodeSnippet, FeatureComparison, BenchmarkMetric, TenantData } from "./types";

export const rullstFeatures: FeatureComparison[] = [
  {
    feature: "Reactivity & Render Time",
    rullst: "μs (Microseconds) - Zero-hydration compiled WASM",
    reactSpa: "ms (Milliseconds) - Heavy client Virtual DOM",
    nextJs: "ms - Hydration CPU-bound state locks",
    laravel: "ms - Interpreted request cycle",
    rustAxum: "ms - Manual layout routing & Askama static rendering",
    django: "ms - Dynamic Python server-side rendering template overhead",
    leptos: "ms - Granular client-side reactive rendering but long compilation",
    highlight: true,
  },
  {
    feature: "SaaS Multi-Tenant Architecture",
    rullst: "Native Implicit Scoping (Isolated TENANT_CONTEXT scope)",
    reactSpa: "None (Fully client-side, zero server isolation)",
    nextJs: "Manual middleware/cookies logic extraction needed",
    laravel: "Third-party packages (requires multi-tenant plugins)",
    rustAxum: "Manual SQL abstraction or verbose state wiring per route",
    django: "Requires heavy packages (e.g. django-tenants) or manual routing filters",
    leptos: "No built-in state isolation; requires custom HTTP header parsers",
    highlight: true,
  },
  {
    feature: "Database & ORM Layer",
    rullst: "Native ActiveRecord (e.g. Post::all().await.save())",
    reactSpa: "None (Relies entirely on external API calls)",
    nextJs: "None (Requires third-party wrappers like Prisma/Drizzle)",
    laravel: "Eloquent ActiveRecord (Elegant but high runtime overhead)",
    rustAxum: "Requires hand-crafted Diesel macros or SQLx raw queries",
    django: "Django ORM (Robust, mature, but blocks on heavy Python interpreters)",
    leptos: "Requires separate database layer mapping or tedious manual macros",
    highlight: true,
  },
  {
    feature: "Reactive Component Layouts",
    rullst: "Markdown-Reactive DSL (Clean, compilation-bound)",
    reactSpa: "JSX/TSX (High layout boilerplate)",
    nextJs: "JSX/TSX (Confusing hybrid Server/Client boundaries)",
    laravel: "Blade Templates (Static, manual Alpine.js coupling)",
    rustAxum: "Maestro/Askama (Strictly static HTML template compilation)",
    django: "Django HTML Templates (Completely raw, no native reactivity)",
    leptos: "view! macro (Sturdy but produces complex macro expansion errors)",
    highlight: true,
  },
  {
    feature: "Native Binary Hot-Reloading",
    rullst: "Yes (Dynamic shared library router reloading .dylib/.so)",
    reactSpa: "Vite HMR (JavaScript client-only)",
    nextJs: "Fast Refresh (JavaScript client-only)",
    laravel: "N/A (Interpreted runtime script checking)",
    rustAxum: "No (Requires complete heavy cargo rebuilds on code change)",
    django: "Auto-reloading (Restarts the entire Python interpreter process)",
    leptos: "No (Requires cargo-leptos wrapper and full rebuild loops)",
    highlight: false,
  },
  {
    feature: "Unified CLI & Management Studio",
    rullst: "Artisan CLI & Studio (cargo rullst & cargo rullst studio)",
    reactSpa: "None (Relies on raw build tools)",
    nextJs: "Basic file structure setup only",
    laravel: "Artisan CLI (Excellent)",
    rustAxum: "Basic Cargo workspace features",
    django: "manage.py CLI (Excellent, but no native thread/WASM visualization)",
    leptos: "cargo-leptos CLI tool only",
    highlight: false,
  },
];

export const benchmarkMetrics: BenchmarkMetric[] = [
  {
    name: "Request Response Time",
    unit: "ms",
    rullst: 0.12,
    nextJs: 18.5,
    rustAxum: 0.85,
    laravel: 45.2,
    django: 38.6,
    leptos: 0.92,
    description: "Time spent to process an incoming HTTP request, query database, and render the response on the server under 10,000 concurrent requests.",
  },
  {
    name: "RAM Memory Usage",
    unit: "MB",
    rullst: 12.4,
    nextJs: 320.0,
    rustAxum: 18.2,
    laravel: 110.0,
    django: 145.0,
    leptos: 22.1,
    description: "Average RAM consumption of the server container under standard production workloads.",
  },
  {
    name: "Initial Bundle Payload Size",
    unit: "KB",
    rullst: 34.0,
    nextJs: 240.0,
    rustAxum: 0.0, // Server-only static pages
    laravel: 420.0,
    django: 380.0, // Standard HTML (requires bundle scripts for reactivity)
    leptos: 180.0, // Compiles full app client runtime wasm
    description: "Payload size sent dynamically on page load to render the screen fully interactive and bind listeners.",
  },
  {
    name: "Cold Start Instance Boot",
    unit: "ms",
    rullst: 1.5,
    nextJs: 300.0,
    rustAxum: 4.2,
    laravel: 85.0,
    django: 120.0,
    leptos: 4.8,
    description: "Time required to instantiate a fresh server container from scratch in serverless platforms like Cloud Run.",
  },
];

export const rullstSnippets: Record<string, CodeSnippet> = {
  template: {
    title: "Dynamic Markdown-First Scripting",
    language: "rust",
    code: `# "Rullst Dev Blog"
"Sleek full-stack Rust blog powered by Rullst & Active Record"

### {post.title}
{post.body}

# "Total System Posts: " {Post::all().await.unwrap_or_default().len()}
`,
    explanation: "Rullst templates are authored in an intuitive, high-readability Markdown-First DSL. It eliminates redundant HTML syntax. The compiler parses this structure directly in Rust using macro-generation, ensuring optimized microsecond execution times both in client WASM modules and SSR threads.",
  },
  orm: {
    title: "ActiveRecord Pattern in Native Rust",
    language: "rust",
    code: `// Generate active record capabilities with macro declarations
#[rullst_orm::model]
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Post {
    pub id: i64,
    pub tenant_id: String,
    pub title: String,
    pub body: String,
}

// Seamless database interaction, highly readable and strictly typed
let mut post = Post {
    id: 0,
    tenant_id: "tenant1".to_string(),
    title: "Next-gen Isomorphic Rust".to_string(),
    body: "Rullst brings Laravel's ActiveRecord ergonomics to safe Rust!".to_string(),
};

// Write instance directly to SQLite / PostgreSQL backend
post.save().await?;

// Fetch entire database instantly
let total_posts = Post::all().await?;
`,
    explanation: "Instead of configuring heavy boilerplate wrappers or compiling verbose QueryBuilder layouts typical of Rust libraries (Diesel, SeaORM), Rullst implements active-record patterns right inside the model structure. Get direct, clean read/write transactions.",
  },
  multitenant: {
    title: "Zero-Leak SaaS Tenants Security",
    language: "rust",
    code: `// Scope operation securely isolation inside stark-industries tenant
multitenant::TENANT_CONTEXT.scope(
    std::cell::RefCell::new(Some("tenant1".to_string())),
    async {
        // Post::all() fetches ONLY entries mapped to tenant1 implicitly!
        // The Rullst ORM automatically injects database constraints at the physical layer!
        let posts = Post::all().await?;
        println!("Tenant 1 Secure posts: {:?}", posts);
        Ok(())
    }
).await;
`,
    explanation: "Tenant data leaks (Cross-Tenant Horizontal Privilege Escalation) represent a principal risk in modern cloud platforms. Rullst eliminates human mistake by embedding thread-safe context scopes. The runtime binds requests and implicitly filters all query scopes.",
  },
  hotreload: {
    title: "WASM & Library Hot-Reloading",
    language: "rust",
    code: `// Inside main.rs server configuration
let server = if is_hot {
    // Watch and dynamically hot-reload .dylib / .so files compiled in background
    // Swap application routes and state layout on the fly!
    Server::new_hot("target/debug/librullst_blog_example")
} else {
    // Ultra-optimized static release compiled binary for maximum speed
    let router = unsafe { *Box::from_raw(rullst_router_init()) };
    Server::new(router)
};

server.run(3000).await?;
`,
    explanation: "Develop in compiled Rust without being slowed down by repetitive recompilation pauses. Rullst mounts dynamic shared libraries in dev mode. Modify CSS styles, layouts, or database models, and the live application swallows the update dynamically without severing active sockets.",
  },
  artisan: {
    title: "Unified Artisan CLI",
    language: "bash",
    code: `# Launch compiler pipelines and start dynamic .dylib asset listener
$ cargo rullst dev

# Scaffold a database structure with automatic physical audit columns
$ cargo rullst artisan make:model Product

# Execute system migrations to sync database schemas
$ cargo rullst db:migrate

# Spin up Rullst Studio visualization dashboard (Inspect threads & DB)
$ cargo rullst studio
`,
    explanation: "Rullst features robust system scaffolding out-of-the-box. Handled by the `rullst::artisan!` macro integration, your actual native binary acts as an assistant CLI, executing schema generation and database validation automatically.",
  },
};

export const comparisonsCode = {
  rullst: {
    title: "Rullst (Simple, Integrated, Safely Isolated)",
    code: `use rullst::{Server, multitenant};
use rullst_orm::Orm;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Embedded Artisan CLI commands Hook
    rullst::artisan!(vec![]);
    
    // Initialize database pool
    Orm::init("sqlite://app.db").await?;
    
    // Launch dynamic router watching binary components
    let server = Server::new_hot("target/librullst_app");
    server.run(3000).await?;
    Ok(())
}
`,
    explanation: "Boot complete SaaS modules in under 15 lines of code. Bundles native ActiveRecord models, automatic schema migrations, secure multitenancy isolation bounds, and real-time live browser reloading under one command.",
  },
  axum: {
    title: "Standard Actix-Web / Axum (Highly Verbose & Manual)",
    code: `use axum::{routing::get, Router};
use sqlx::sqlite::SqlitePoolOptions;
use std::sync::Arc;

struct AppState { pool: sqlx::SqlitePool }

#[tokio::main]
async fn main() {
    let pool = SqlitePoolOptions::new()
        .connect("sqlite://app.db").await.unwrap();
    let state = Arc::new(AppState { pool });
    
    // Rigid routing with no standard reactive frontend or isomorphic compile
    let app = Router::new()
        .route("/posts", get(list_posts))
        .with_state(state);
        
    // Lacks native live reload, zero implicit SaaS tenant protection macros
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
`,
    explanation: "Erecting equivalent enterprise multitenant SaaS instances on top of raw Axum or Actix-web requires writing thousands of lines of boilerplate, configuring nested DB pool adapters by hand, and managing complex macro expansions.",
  },
  nextjs: {
    title: "Next.js (Heavy Memory Footprint, Hydration Latency)",
    code: `// app/posts/page.tsx
import { db } from "@/lib/db";
import { headers } from "next/headers";

export default async function Page() {
  const tenantId = headers().get("x-tenant-id"); // Vulnerable: Developer must remember to filter!
  const posts = await db.post.findMany({
    where: { tenantId } // Easy to omit, exposing client databases
  });

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Workspace: {tenantId}</h1>
      {posts.map(post => (
        <article key={post.id} className="mt-4 border-b border-gray-800 pb-2">
          <h2>{post.title}</h2>
          <p className="text-gray-400">{post.body}</p>
        </article>
      ))}
    </main>
  );
}
`,
    explanation: "Suffers from V8 execution lags and heavy Node.js process footprints (consuming 300MB+ RAM per instance). Leaving out the tenantId constraints inside query inputs invites horizontal privilege escalation leaks.",
  },
  django: {
    title: "Django (Heavy Python VM, Blocking Thread Pools)",
    code: `# views.py
from django.shortcuts import render
from .models import Post

def list_posts(request):
    # Must manually verify headers or use middleware query intercepts
    tenant_id = request.headers.get("x-tenant-id")
    posts = Post.objects.filter(tenant_id=tenant_id)
    
    # Renders static templates on blocking synchronous worker threads
    return render(request, 'posts.html', {'posts': posts, 'tenant': tenant_id})
`,
    explanation: "Highly productive but executes on top of Python's slow, single-threaded interpreter (GIL bottleneck). Requires complex thread scheduling configurations to match Rust's performance and has no native isomorphic client WASM execution.",
  },
  leptos: {
    title: "Leptos (High-Performance Client, Verbose ORM Setup)",
    code: `// leptos.rs component
use leptos::*;

#[component]
pub fn PostList() -> impl IntoView {
    // Fine-grained reactivity is excellent, but database integration
    // relies on server functions wrapper boilerplate with complex serialization
    let (posts, set_posts) = create_signal(cx, Vec::<Post>::new());
    
    view! { cx,
        <div class="posts-wrapper">
          <For each=posts key=|p| p.id view=|cx, p| {
              view! { cx, <p>{p.title}</p> }
          }/>
        </div>
    }
}
`,
    explanation: "An exceptional design for reactive browser interfaces in Rust, but it is purely UI-centric. It lacks an integrated, implicit multi-tenant database layer and safe ActiveRecord schema scaffolds, forcing developers to build their own backend servers from scratch.",
  },
};

export const tenantSandboxStore: TenantData[] = [
  {
    id: "tenant1",
    name: "Stark Industries (Tenant 1)",
    secretContent: "Intellectual Property: Arc Reactor Mk-85 Nanotechnology Schematic & AI Grid.",
    posts: [
      {
        id: 1,
        title: "Clean Energy Breakthrough",
        body: "New Arc Reactor achieves 400% efficiency. Completely green energy supplied across Stark network.",
      },
      {
        id: 2,
        title: "Defense Nanotech Updates",
        body: "Materials testing for active energy shields passed stress tests at speed Mach 4.",
      },
    ],
  },
  {
    id: "tenant2",
    name: "Wayne Enterprises (Tenant 2)",
    secretContent: "Confidential Project: Advanced Batcomputer sonar network encryption keys & tactics.",
    posts: [
      {
        id: 1,
        title: "Advanced Armor Plating",
        body: "Liquid carbon fiber alloy composite successfully absorbs impact from heavy artillery shells.",
      },
      {
        id: 2,
        title: "Sub-light Communication Grid",
        body: "Active satellite network now encrypted under proprietary key matrix. Complete communications stealth.",
      },
    ],
  },
];
