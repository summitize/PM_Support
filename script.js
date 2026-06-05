let templates = {
  prd: {
    type: "Product Requirements",
    content: `# PRD Brief

## 1. Problem
- Who is affected?
- What pain or opportunity exists?
- What evidence supports this?

## 2. Outcome
- Primary success metric:
- Guardrail metric:
- Expected customer/business behavior change:

## 3. Scope
- In scope:
- Out of scope:
- Non-goals:

## 4. Requirements
- User stories:
- Functional requirements:
- Data, analytics, and reporting needs:
- Accessibility, privacy, reliability, and compliance notes:

## 5. Risks and Dependencies
- Key risks:
- Open questions:
- Dependencies:
- Rollback or mitigation plan:

## 6. Launch and Measurement
- Rollout plan:
- Support readiness:
- Experiment or telemetry plan:
- Post-launch review date:`
  },
  discovery: {
    type: "Research Planning",
    content: `# Discovery Plan

## Learning Goal
What decision will this research improve?

## Target Segment
- Users/customers:
- Relevant behaviors:
- Exclusions:

## Assumptions
- Must be true:
- Most uncertain:
- Highest risk:

## Method
- Interviews:
- Survey:
- Prototype test:
- Analytics review:

## Interview Guide
1. Tell me about the last time you experienced...
2. What made that hard or important?
3. What did you try?
4. What would a better outcome look like?

## Synthesis
- Top themes:
- Contradictions:
- Evidence strength:
- Recommended next step:`
  },
  launch: {
    type: "Launch Readiness",
    content: `# Launch Checklist

## Audience and Rollout
- Launch audience:
- Rollout phases:
- Eligibility rules:
- Rollback trigger:

## Product Readiness
- Acceptance criteria met:
- Analytics events verified:
- Edge cases reviewed:
- Documentation complete:

## Team Readiness
- Support brief:
- Sales/customer success brief:
- Incident owner:
- Executive update:

## Measurement
- Success metric:
- Guardrail metric:
- Review cadence:
- Post-launch owner:`
  },
  decision: {
    type: "Decision Record",
    content: `# Decision Log

## Decision
What did we decide?

## Context
Why does this decision matter now?

## Options Considered
1. Option:
   - Pros:
   - Cons:
2. Option:
   - Pros:
   - Cons:

## Tradeoffs
- What are we optimizing for?
- What are we accepting as a cost?

## Owner and Date
- Decision owner:
- Date:
- Revisit trigger:`
  }
};

const tabs = document.querySelectorAll(".template-tab");
const typeLabel = document.querySelector("#template-type");
const content = document.querySelector("#template-content");
const copyButton = document.querySelector("#copy-template");

function renderTemplate(key) {
  const template = templates[key];
  if (!template) {
    return;
  }
  typeLabel.textContent = template.type;
  content.textContent = template.content;

  tabs.forEach((tab) => {
    const selected = tab.dataset.template === key;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderTemplate(tab.dataset.template));
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(content.textContent);
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1200);
});

renderTemplate("prd");

async function loadTemplatesFromApi() {
  try {
    const response = await fetch("/api/templates");
    if (!response.ok) {
      return;
    }

    const apiTemplates = await response.json();
    const loadedTemplates = {};
    apiTemplates.forEach((template) => {
      loadedTemplates[template.slug] = {
        type: template.title,
        content: template.content
      };
    });

    if (Object.keys(loadedTemplates).length === 0) {
      return;
    }

    templates = {
      prd: loadedTemplates["prd-brief"] || templates.prd,
      discovery: loadedTemplates["discovery-plan"] || templates.discovery,
      launch: loadedTemplates["launch-checklist"] || templates.launch,
      decision: loadedTemplates["decision-log"] || templates.decision
    };
    renderTemplate("prd");
  } catch {
    renderTemplate("prd");
  }
}

loadTemplatesFromApi();
