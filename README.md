# PM Central — Project Management Handbook & AI Copilot

PM Central is a publish-ready project management landing page for PM teams, PMOs, and product leadership. This repository now contains a Spring Boot Java backend scaffold plus a starter React frontend application for the next full-stack phase.

## What's in this repo

- `src/main/resources/static/index.html` — Java-served landing page for the Spring Boot app
- `src/main/resources/static/styles.css` — polished responsive styles with dark mode support
- `src/main/resources/static/script.js` — interactive template preview, copy-to-clipboard, dark-mode toggle, and module search
- `templates/` — Markdown templates (PRD, discovery, launch, decision)
- `agents/` — starter AI prompt files
- `pom.xml` — Spring Boot Maven project configuration
- `src/main/java` — Spring Boot app and REST API controller
- `frontend/` — React + TypeScript + Material UI frontend scaffold
- `TODO.md` — current project checklist and status

## Project status

- [x] Confirm scope & priorities
- [x] Scaffold Spring Boot backend (Java 21, Maven)
- [x] Scaffold React frontend (TypeScript, MUI)
- [x] Design DB schema and JPA entities
- [x] Implement authentication & authorization (JWT, roles)
- [ ] Implement core modules: Dashboard, RAID, Action Items, Handbook
- [ ] Add AI Copilot integration (API stubs, config)
- [ ] Add file uploads, templates, meeting transcript processing
- [ ] Dockerize services & create Docker Compose
- [ ] Add tests, Swagger docs, logging, error handling
- [x] Create README and run instructions
- [x] Iterate UI: responsive design, dark mode
- [ ] Prepare deployment and roadmap for Phase 2/3

## Live site publishing

The static landing page is still available for GitHub Pages or any static host, but the main path forward is now the Spring Boot application.

### GitHub Pages

1. Push the repository to GitHub.
2. Open the repo settings and enable GitHub Pages.
3. Set the source to the repository root (or `main` branch root).
4. The site will publish from `index.html`, `styles.css`, and `script.js`.

A GitHub Actions workflow is included at `.github/workflows/pages.yml` for automatic publishing on `main` branch pushes.

A `CNAME` file is included for custom GitHub Pages domains. Replace the placeholder domain in `CNAME` with your own site host.

### Azure Static Web Apps / Netlify

1. Connect the repo.
2. Set the build output folder to the root directory.
3. No build step is required for the static site.

## Run the static preview locally

Open `index.html` in your browser for a quick preview. For a local development server, use a simple static host such as VS Code Live Server or any HTTP server.

### Run the Java backend locally

From the repository root:

```powershell
mvn clean package
mvn spring-boot:run
```

Then open `http://localhost:8080` in your browser.

The app exposes `/api/templates` and `/api/agents` using the existing markdown content.

#### Authentication

The backend now includes JWT auth endpoints:

- `POST /api/auth/login` — login with `username` and `password`
- `POST /api/auth/register` — register a new user with `username`, `email`, and `password`

A default admin user is seeded on startup if it does not exist:

- Username: `admin`
- Password: `Admin@123`

#### Docker support

A `Dockerfile` is included so you can build and run the app as a container:

```powershell
docker build -t pm-support .
docker run -p 8080:8080 pm-support
```

### Hosting recommendations

This project is a Java Spring Boot application with static site assets. That means it is best hosted on a Java-compatible platform or container host.

Good hosting options:

- Render.com — easy Java app deployment with GitHub integration
- Fly.io — container-based, low-latency hosting for Java apps
- Azure App Service — supports Spring Boot and Java web apps
- Railway.app — quick deploy for JVM apps, with env var support
- DigitalOcean App Platform — supports Docker and Java apps

For the static-only landing page only, Vercel, Netlify, or GitHub Pages are fine. But the full Java backend should not be hosted on Vercel directly.

### Optional frontend scaffold

The `frontend/` folder contains a React + TypeScript + Material UI starter application.

```powershell
cd frontend
npm install
npm run dev
```

## What is complete

- Spring Boot backend scaffold with static content serving and markdown APIs.
- Static landing page with hero, module overview, template viewer, platform summary, and deploy guidance.
- Dark mode and search interactions.
- Publish-ready static site structure for GitHub Pages or static hosting.

## Next development phase

1. Add authentication and authorization, then connect the React frontend to secure API endpoints.
2. Expand the React frontend into a live PM dashboard with handbook, RAID, action items, and AI Copilot flows.
3. Add secure AI integration, file uploads, meeting transcript processing, and Docker Compose for local development.
