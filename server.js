// demo-app/server.js
//
// The sample application the platform deploys. It is deliberately tiny: one
// page that prints the container's hostname (the pod name in Kubernetes) so you
// can *see* the Service load-balancing across replicas — refresh a few times and
// the pod name changes.
//
// Port 3000 is what the Jenkins pipeline expects (APP_PORT=3000).

const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// In Kubernetes each pod gets its own hostname, so this value changes per pod.
const podName = os.hostname();

// Health endpoint. Not required by the platform (v1 only needs a Dockerfile),
// but the manual manifests mention it and it is the natural target for a
// readinessProbe once you add one.
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', pod: podName, uptime: process.uptime() });
});

app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello from my deployed application!</title>
    <style>
      :root { color-scheme: light dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        background: radial-gradient(circle at 20% 0%, #1e293b, #0b1120 70%);
        color: #e2e8f0;
        padding: 24px;
      }
      .card {
        width: 100%;
        max-width: 520px;
        padding: 40px 32px;
        border-radius: 18px;
        background: rgba(30, 41, 59, 0.7);
        border: 1px solid rgba(148, 163, 184, 0.25);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
        text-align: center;
      }
      .logo {
        width: 56px;
        height: 56px;
        margin: 0 auto 20px;
        display: grid;
        place-items: center;
        font-size: 28px;
        border-radius: 14px;
        background: linear-gradient(135deg, #38bdf8, #6366f1);
      }
      h1 { margin: 0 0 6px; font-size: 1.35rem; letter-spacing: -0.01em; }
      p.sub { margin: 0 0 28px; color: #94a3b8; font-size: 0.9rem; }
      .label {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.68rem;
        color: #64748b;
        margin-bottom: 8px;
      }
      .pod {
        display: inline-block;
        font-family: ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
        font-size: 1.55rem;
        font-weight: 600;
        color: #7dd3fc;
        word-break: break-all;
      }
      .hint {
        margin-top: 28px;
        padding-top: 20px;
        border-top: 1px solid rgba(148, 163, 184, 0.2);
        font-size: 0.82rem;
        color: #94a3b8;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="logo">🚀</div>
      <h1>Hello from my deployed application!</h1>
      <p class="sub">Served by one of the replicas behind the Kubernetes Service</p>

      <div class="label">Pod</div>
      <div class="pod">${podName}</div>

      <p class="hint">
        Refresh the page a few times — the pod name should change.<br />
        That is the Service load-balancing your requests across replicas.
      </p>
    </main>
  </body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`demo-app listening on http://0.0.0.0:${PORT} (pod: ${podName})`);
});
