# demo-app

A tiny Node.js + Express sample application, used to demonstrate the deploy
platform (Jenkins → Docker → minikube → NGINX Ingress).

The repository root contains a `Dockerfile`, which is the only requirement the
pipeline places on a deployable repository.

## What it does

- `GET /` — one page showing **"Hello from my deployed application!"** and the
  container hostname (the pod name in Kubernetes).
- `GET /healthz` — JSON health check: `{ "status": "ok", "pod": "<hostname>" }`

Because every pod gets its own hostname, refreshing the page behind a
load-balanced Kubernetes Service shows a different pod name each time — a
visual proof that the Service is spreading requests across replicas.

## Run locally

```bash
npm install
npm start
# http://localhost:3000
```

## Run in Docker

```bash
docker build -t demo-app .
docker run --rm -p 3000:3000 demo-app
# http://localhost:3000
```

## Deploy it through the platform

```text
GitHub URL: https://github.com/Ayush-200/demo-app
App Name:   my-app
Replicas:   3
```

The app listens on port **3000**, which is the pipeline's default `APP_PORT`.
