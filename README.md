# PM Support

A Java-based starter website for product managers: good practices, reusable templates, starter AI agents, and a lightweight operating cadence.

## What is included

- `pom.xml` - Maven project definition
- `src/main/java/com/summitize/pmsupport/PmSupportApplication.java` - Java HTTP server
- `index.html` - single-page PM practice guide
- `styles.css` - responsive visual system and layout
- `script.js` - interactive template selector and copy action
- `templates/` - reusable Markdown PM templates
- `agents/` - starter AI assistant prompts for PM workflows

## How to run

Install JDK 17+. If Maven is available, run:

```powershell
mvn exec:java
```

Because the app uses only the JDK, you can also run it without Maven:

```powershell
javac -d out src/main/java/com/summitize/pmsupport/PmSupportApplication.java
java -cp out com.summitize.pmsupport.PmSupportApplication
```

Open:

```text
http://localhost:8080
```

The Java app also exposes:

- `GET /api/templates` - templates as JSON
- `GET /api/agents` - starter agent prompts as JSON
- `GET /health` - simple health check

## Suggested next steps

- Add more templates for roadmap reviews, metric trees, opportunity scoring, and post-launch reviews.
- Add server-side search across templates and agents.
- Move to Spring Boot when the site needs authentication, persistence, or admin workflows.
