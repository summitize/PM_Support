// Quick validation of toolkit.html - checks that all the major render functions exist
// and that the structure is consistent
const fs = require('fs');
const content = fs.readFileSync('c:/GitHubWS/PM_Support/toolkit.html', 'utf-8');

const checks = [
  { name: 'Dashboard render', pattern: /function renderDashboard\(\)/, required: true },
  { name: 'Projects render', pattern: /function renderProjects\(\)/, required: true },
  { name: 'RAID render', pattern: /function renderRaid\(\)/, required: true },
  { name: 'Actions render', pattern: /function renderActions\(\)/, required: true },
  { name: 'Handbook render', pattern: /function renderHandbook\(\)/, required: true },
  { name: 'Meetings render', pattern: /function renderMeetings\(\)/, required: true },
  { name: 'Templates render', pattern: /function renderTemplates\(\)/, required: true },
  { name: 'AI render', pattern: /function renderAi\(\)/, required: true },
  { name: 'Settings render', pattern: /function renderSettings\(\)/, required: true },
  { name: 'Main render dispatch', pattern: /fns=\{(dashboard|projects|raid|actions|handbook|meetings|templates|ai|settings)/, required: true },
  { name: 'View container (vc)', pattern: /<div class="view-c" id="vc">/, required: true },
  { name: 'Sidebar nav items', pattern: /data-v="dashboard"/, required: true },
  { name: 'Init function', pattern: /function init\(\)/, required: true },
  { name: 'DOMContentLoaded init', pattern: /DOMContentLoaded.*init/, required: true },
  { name: 'Modal element', pattern: /<div class="mo" id="mo">/, required: true },
  { name: 'Seed data', pattern: /function seed\(\)/, required: true },
  { name: 'Save state', pattern: /function save\(\)/, required: true },
  { name: 'Load state', pattern: /function load\(\)/, required: true },
  { name: 'New RAID modal', pattern: /function newRaid\(\)/, required: true },
  { name: 'New Project modal', pattern: /function newProj\(\)/, required: true },
  { name: 'New Action modal', pattern: /function newAct\(\)/, required: true },
  { name: 'New Handbook modal', pattern: /function newHb\(\)/, required: true },
  { name: 'New Meeting modal', pattern: /function newMtg\(\)/, required: true },
  { name: 'AI agent functions', pattern: /function discoveryCoach|function prdReviewer|function stakeholderBrief|function statusSummary/, required: true }
];

let pass = 0, fail = 0;
checks.forEach(c => {
  const found = c.pattern.test(content);
  if (found) {
    console.log('✓', c.name);
    pass++;
  } else {
    console.log('✗', c.name, c.required ? '(REQUIRED)' : '(optional)');
    fail++;
  }
});

console.log(`\nResult: ${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);