# PM Central — Project Management Handbook & AI Copilot

PM Central is a publish-ready project management landing page for PM teams, PMOs, and product leadership. This repository now contains a complete static site experience plus a starter React frontend scaffold for the next full-stack phase.

## What's in this repo

- `index.html` — complete static landing page and product overview
- `styles.css` — polished responsive styles with dark mode support
- `script.js` — interactive template preview, copy-to-clipboard, dark-mode toggle, and module search
- `templates/` — Markdown templates (PRD, discovery, launch, decision)
- `agents/` — starter AI prompt files
- `pom.xml` — existing Maven project (backend placeholder)
- `frontend/` — React + TypeScript + Material UI frontend scaffold
- `src/main/java` — minimal Java server bootstrap
- `TODO.md` — current project checklist and status

## Project status

- [x] Confirm scope & priorities
- [ ] Scaffold Spring Boot backend (Java 21, Maven)
- [x] Scaffold React frontend (TypeScript, MUI)
- [ ] Design DB schema and JPA entities
- [ ] Implement authentication & authorization (JWT, roles)
- [ ] Implement core modules: Dashboard, RAID, Action Items, Handbook
- [ ] Add AI Copilot integration (API stubs, config)
- [ ] Add file uploads, templates, meeting transcript processing
- [ ] Dockerize services & create Docker Compose
- [ ] Add tests, Swagger docs, logging, error handling
- [x] Create README and run instructions
- [x] Iterate UI: responsive design, dark mode
- [ ] Prepare deployment and roadmap for Phase 2/3

## Live site publishing

This static landing page is ready to publish on any static host.

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

### Optional backend preview

This repo includes a minimal Java server. If you want to run the Java app using Maven:

```powershell
mvn clean package
mvn exec:java
```

If you use Java directly:

```powershell
javac -d out src/main/java/com/summitize/pmsupport/PmSupportApplication.java
java -cp out com.summitize.pmsupport.PmSupportApplication
```

### Optional frontend scaffold

The `frontend/` folder contains a React + TypeScript + Material UI starter application.

```powershell
cd frontend
npm install
npm run dev
```

## What is complete

- Static landing page with hero, module overview, template viewer, platform summary, and publish guidance.
- Dark mode and search interactions.
- Publish-ready site structure for GitHub Pages or static hosting.

## Next development phase

1. Implement the Spring Boot backend with authentication, JPA, PostgreSQL, and API endpoints.
2. Expand the React frontend into a live PM dashboard with handbook, RAID, action items, and AI Copilot flows.
3. Add secure AI integration, file uploads, meeting transcript processing, and Docker Compose for local development.
