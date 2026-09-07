/* PM Central Toolkit - Comprehensive Application */
(function() {
  'use strict';

  const STATE = {
    currentView: 'dashboard',
    theme: 'dark',
    currentUser: { id: 1, name: 'PM User', displayName: 'Project Manager', email: 'pm@example.com', role: 'PM' },
    projects: [], raidItems: [], actionItems: [], handbookArticles: [],
    meetings: [], templates: [], activities: [],
    currentRaidType: '', currentHandbookCategory: '',
    currentAIAgent: 'discovery-coach', chatHistory: []
  };

  const STORAGE_KEY = 'pmcentral_data';

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        Object.assign(STATE, data);
        if (data.currentUser) STATE.currentUser = data.currentUser;
        return true;
      }
    } catch (e) { console.warn('Failed to load state:', e); }
    return false;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        projects: STATE.projects, raidItems: STATE.raidItems,
        actionItems: STATE.actionItems, handbookArticles: STATE.handbookArticles,
        meetings: STATE.meetings, activities: STATE.activities,
        currentUser: STATE.currentUser, theme: STATE.theme
      }));
    } catch (e) { console.warn('Failed to save state:', e); }
  }

  function fmt(d) { return d.toISOString().split('T')[0]; }
  function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

  function seedData() {
    const today = new Date();
    STATE.projects = [
      { id: 1, name: 'Cloud Migration Program', description: 'Migrate legacy on-prem workloads to Azure', status: 'In Progress', startDate: fmt(addDays(today, -60)), endDate: fmt(addDays(today, 60)), progress: 45, teamSize: 8 },
      { id: 2, name: 'Customer Portal v2', description: 'Re-platform customer-facing portal', status: 'Planning', startDate: fmt(addDays(today, -10)), endDate: fmt(addDays(today, 120)), progress: 15, teamSize: 5 },
      { id: 3, name: 'Data Lake Initiative', description: 'Build data lake for analytics and ML', status: 'In Progress', startDate: fmt(addDays(today, -90)), endDate: fmt(addDays(today, 30)), progress: 70, teamSize: 6 },
      { id: 4, name: 'Security Hardening', description: 'Implement zero-trust security', status: 'On Hold', startDate: fmt(addDays(today, -30)), endDate: fmt(addDays(today, 90)), progress: 25, teamSize: 4 }
    ];
    STATE.raidItems = [
      { id: 1, type: 'RISK', title: 'Azure cost overrun risk', description: 'Cloud migration may exceed budget', status: 'Open', priority: 'High', projectId: 1, owner: 'Sarah Chen', dueDate: fmt(addDays(today, 7)), createdAt: today.toISOString() },
      { id: 2, type: 'RISK', title: 'Vendor delivery delay', description: 'Key vendor may miss timeline', status: 'Open', priority: 'Medium', projectId: 1, owner: 'Mike Johnson', dueDate: fmt(addDays(today, 14)), createdAt: today.toISOString() },
      { id: 3, type: 'ISSUE', title: 'Staging env outage', description: 'Staging environment unavailable', status: 'In Progress', priority: 'High', projectId: 2, owner: 'Alex Kumar', dueDate: fmt(addDays(today, 3)), createdAt: today.toISOString() },
      { id: 4, type: 'ASSUMPTION', title: 'Customer adoption of new portal', description: 'Assuming 60% adoption within 6 months', status: 'Open', priority: 'Medium', projectId: 2, owner: 'Lisa Park', dueDate: fmt(addDays(today, 30)), createdAt: today.toISOString() },
      { id: 5, type: 'DEPENDENCY', title: 'Security review approval', description: 'Portal v2 launch depends on security review', status: 'Open', priority: 'High', projectId: 2, owner: 'Tom Brown', dueDate: fmt(addDays(today, 10)), createdAt: today.toISOString() },
      { id: 6, type: 'RISK', title: 'Data quality issues', description: 'Source data quality may affect analytics', status: 'Open', priority: 'Medium', projectId: 3, owner: 'Emma Davis', dueDate: fmt(addDays(today, 21)), createdAt: today.toISOString() },
      { id: 7, type: 'ISSUE', title: 'Identity provider integration', description: 'SSO integration failing', status: 'Open', priority: 'High', projectId: 4, owner: 'David Lee', dueDate: fmt(addDays(today, 5)), createdAt: today.toISOString() }
    ];
    STATE.actionItems = [
      { id: 1, title: 'Prepare cost forecast for cloud migration', status: 'In Progress', priority: 'High', projectId: 1, assignee: 'Sarah Chen', dueDate: fmt(addDays(today, 2)), createdAt: today.toISOString() },
      { id: 2, title: 'Schedule vendor review meeting', status: 'Pending', priority: 'Medium', projectId: 1, assignee: 'Mike Johnson', dueDate: fmt(addDays(today, 5)), createdAt: today.toISOString() },
      { id: 3, title: 'Investigate staging env failures', status: 'In Progress', priority: 'High', projectId: 2, assignee: 'Alex Kumar', dueDate: fmt(addDays(today, 1)), createdAt: today.toISOString() },
      { id: 4, title: 'Document new portal architecture', status: 'Completed', priority: 'Medium', projectId: 2, assignee: 'Lisa Park', dueDate: fmt(addDays(today, -3)), createdAt: today.toISOString() },
      { id: 5, title: 'Get security review sign-off', status: 'Blocked', priority: 'High', projectId: 2, assignee: 'Tom Brown', dueDate: fmt(addDays(today, 7)), createdAt: today.toISOString() },
      { id: 6, title: 'Build data quality dashboard', status: 'Pending', priority: 'Medium', projectId: 3, assignee: 'Emma Davis', dueDate: fmt(addDays(today, 14)), createdAt: today.toISOString() },
      { id: 7, title: 'Fix SSO integration test failures', status: 'In Progress', priority: 'High', projectId: 4, assignee: 'David Lee', dueDate: fmt(addDays(today, 3)), createdAt: today.toISOString() },
      { id: 8, title: 'Update project plan with new dates', status: 'Pending', priority: 'Low', projectId: 1, assignee: 'PM User', dueDate: fmt(addDays(today, 10)), createdAt: today.toISOString() }
    ];
    STATE.handbookArticles = [
      { id: 1, title: 'RAID Log Best Practices', summary: 'How to maintain an effective RAID log', category: 'process', tags: ['raid', 'process'], content: 'A RAID log captures Risks, Assumptions, Issues, and Dependencies. Update it weekly.' },
      { id: 2, title: 'Action Item Tracking', summary: 'Effective action item management', category: 'process', tags: ['actions', 'tracking'], content: 'Action items should be specific, assigned, and have due dates. Review weekly.' },
      { id: 3, title: 'Stakeholder Communication Plan', summary: 'Template for stakeholder communication', category: 'template', tags: ['stakeholder', 'communication'], content: 'Define audience, frequency, channels, and content for stakeholder updates.' },
      { id: 4, title: 'Project Charter Guide', summary: 'How to write a compelling project charter', category: 'guide', tags: ['charter', 'initiation'], content: 'A project charter defines scope, objectives, stakeholders, and success criteria.' },
      { id: 5, title: 'Risk Assessment Matrix', summary: '5x5 matrix for assessing project risks', category: 'reference', tags: ['risk', 'matrix'], content: 'Use probability and impact to score risks from 1-25.' },
      { id: 6, title: 'Sprint Retrospective Guide', summary: 'Run effective sprint retrospectives', category: 'guide', tags: ['agile', 'retrospective'], content: 'Cover what went well, what to improve, and action items.' }
    ];
    STATE.meetings = [
      { id: 1, date: fmt(addDays(today, -2)), title: 'Cloud Migration Weekly Sync', summary: 'Discussed migration progress and budget', attendees: 8, projectId: 1, decisions: 3, actionItems: 5 },
      { id: 2, date: fmt(addDays(today, -1)), title: 'Portal v2 Design Review', summary: 'Reviewed new portal UX designs', attendees: 6, projectId: 2, decisions: 2, actionItems: 4 },
      { id: 3, date: fmt(addDays(today, -5)), title: 'Data Lake Architecture Workshop', summary: 'Aligned on data lake architecture', attendees: 5, projectId: 3, decisions: 4, actionItems: 3 },
      { id: 4, date: fmt(addDays(today, -7)), title: 'Security Steering Committee', summary: 'Reviewed security posture', attendees: 10, projectId: 4, decisions: 5, actionItems: 6 }
    ];
    STATE.templates = [
      { id: 1, name: 'PRD Brief', description: 'Product Requirements Document', icon: '📋', content: '# PRD Brief\n\n## Overview\n\n## Problem Statement\n\n## Goals & Metrics\n\n## Requirements\n\n## Out of Scope' },
      { id: 2, name: 'Discovery Plan', description: 'Plan your discovery phase', icon: '🔍', content: '# Discovery Plan\n\n## Objectives\n\n## Activities\n\n## Timeline\n\n## Deliverables' },
      { id: 3, name: 'Launch Checklist', description: 'Pre-launch checklist', icon: '🚀', content: '# Launch Checklist\n\n## Pre-Launch\n- [ ] Documentation\n- [ ] Training\n- [ ] Support\n\n## Launch Day\n- [ ] Deploy\n- [ ] Monitor' },
      { id: 4, name: 'Decision Log', description: 'Track key project decisions', icon: '⚖️', content: '# Decision Log\n\n## Decision\n\n## Date\n\n## Decided By\n\n## Context\n\n## Options\n\n## Rationale' }
    ];
    STATE.activities = [
      { icon: '📌', text: 'New RAID item "Staging env outage" was created', time: '2 hours ago' },
      { icon: '✅', text: 'Action item completed: "Document new portal architecture"', time: '5 hours ago' },
      { icon: '📊', text: 'Project "Cloud Migration Program" updated to 45% complete', time: '1 day ago' },
      { icon: '🎯', text: 'Meeting "Portal v2 Design Review" added with 2 decisions', time: '1 day ago' }
    ];
  }

  // ============== HELPERS ==============
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'className') e.className = attrs[k];
        else if (k === 'onClick') e.addEventListener('click', attrs[k]);
        else if (k === 'onChange') e.addEventListener('change', attrs[k]);
        else if (k === 'onInput') e.addEventListener('input', attrs[k]);
        else if (k === 'onSubmit') e.addEventListener('submit', attrs[k]);
        else if (k === 'html') e.innerHTML = attrs[k];
        else e.setAttribute(k, attrs[k]);
      }
    }
    children.forEach(c => { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function nextId(items) { return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1; }
  function projectName(id) { const p = STATE.projects.find(x => x.id === id); return p ? p.name : 'Unknown'; }
  function statusBadgeClass(status) {
    const s = (status || '').toLowerCase();
    if (['completed', 'closed', 'resolved', 'done'].includes(s)) return 'success';
    if (['blocked', 'overdue', 'high'].includes(s)) return 'danger';
    if (['in progress', 'pending', 'medium'].includes(s)) return 'warning';
    if (['open', 'low', 'planned'].includes(s)) return 'info';
    return 'muted';
  }
  function priorityBadgeClass(p) {
    const v = (p || '').toLowerCase();
    if (v === 'high') return 'danger';
    if (v === 'medium') return 'warning';
    if (v === 'low') return 'info';
    return 'muted';
  }
  function isOverdue(due) { return new Date(due) < new Date() && due; }

  function toast(title, message, type) {
    type = type || 'info';
    const icons = { success: '✅', warning: '⚠️', danger: '❌', info: 'ℹ️' };
    const t = el('div', { className: 'toast ' + type },
      el('div', { className: 'toast-icon' }, icons[type] || icons.info),
      el('div', { className: 'toast-content' },
        el('div', { className: 'toast-title' }, title),
        message ? el('div', { className: 'toast-message' }, message) : null
      )
    );
    $('toastContainer').appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3500);
  }

  function showModal(title, bodyHtml, onSave) {
    $('modalTitle').textContent = title;
    $('modalBody').innerHTML = bodyHtml;
    $('modalOverlay').classList.add('active');
    $('modalSave').onclick = () => {
      if (onSave) {
        const result = onSave();
        if (result !== false) $('modalOverlay').classList.remove('active');
      } else {
        $('modalOverlay').classList.remove('active');
      }
    };
  }
  function hideModal() { $('modalOverlay').classList.remove('active'); }

  // ============== NAVIGATION ==============
  function navigate(view) {
    STATE.currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const v = $('view-' + view);
    if (v) v.classList.add('active');
    const n = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (n) n.classList.add('active');
    render();
    if (window.innerWidth < 768) $('sidebar').classList.remove('open');
  }

  // ============== RENDER: DASHBOARD ==============
  function renderDashboard() {
    const openRisks = STATE.raidItems.filter(r => r.type === 'RISK' && r.status !== 'Closed').length;
    const openIssues = STATE.raidItems.filter(r => r.type === 'ISSUE' && r.status !== 'Closed').length;
    const highPriority = STATE.raidItems.filter(r => r.priority === 'High' && r.status !== 'Closed').length;
    const overdueActions = STATE.actionItems.filter(a => a.status !== 'Completed' && isOverdue(a.dueDate)).length;
    const completedActions = STATE.actionItems.filter(a => a.status === 'Completed').length;
    const totalActions = STATE.actionItems.length;
    const completedPct = totalActions ? Math.round((completedActions / totalActions) * 100) : 0;

    $('kpiProjects').textContent = STATE.projects.filter(p => p.status === 'In Progress').length;
    $('kpiProjectsTrend').textContent = `${STATE.projects.length} total`;
    $('kpiRisks').textContent = openRisks;
    $('kpiRisksTrend').textContent = `${highPriority} high priority`;
    $('kpiIssues').textContent = openIssues;
    $('kpiIssuesTrend').textContent = `${STATE.raidItems.filter(r => r.type === 'ISSUE' && r.priority === 'High' && r.status !== 'Closed').length} critical`;
    $('kpiActions').textContent = totalActions;
    $('kpiActionsTrend').textContent = `${completedPct}% complete · ${overdueActions} overdue`;

    const max = Math.max(1, ...['RISK', 'ASSUMPTION', 'ISSUE', 'DEPENDENCY'].map(t => STATE.raidItems.filter(r => r.type === t && r.status !== 'Closed').length));
    ['RISK', 'ASSUMPTION', 'ISSUE', 'DEPENDENCY'].forEach(t => {
      const count = STATE.raidItems.filter(r => r.type === t && r.status !== 'Closed').length;
      const bar = document.querySelector(`.raid-bar[data-type="${t}"] .raid-bar-fill`);
      const val = document.querySelector(`.raid-bar[data-type="${t}"] .raid-bar-value`);
      if (bar) bar.style.width = Math.max(8, (count / max) * 100) + '%';
      if (val) val.textContent = count;
    });

    const activityList = $('activityList');
    activityList.innerHTML = '';
    STATE.activities.slice(0, 8).forEach(a => {
      activityList.appendChild(el('div', { className: 'activity-item' },
        el('div', { className: 'activity-icon' }, a.icon),
        el('div', { className: 'activity-content' },
          el('div', { className: 'activity-text' }, a.text),
          el('div', { className: 'activity-time' }, a.time)
        )
      ));
    });

    const tbl = $('dashboardActionsTable').querySelector('tbody');
    tbl.innerHTML = '';
    const upcoming = STATE.actionItems
      .filter(a => a.status !== 'Completed')
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
    if (!upcoming.length) {
      tbl.appendChild(el('tr', null, el('td', { colspan: 6, className: 'table-empty' }, 'No upcoming action items')));
    } else {
      upcoming.forEach(a => {
        tbl.appendChild(el('tr', null,
          el('td', null, a.title),
          el('td', null, projectName(a.projectId)),
          el('td', null, a.assignee),
          el('td', null, a.dueDate + (isOverdue(a.dueDate) ? ' ⚠️' : '')),
          el('td', null, el('span', { className: 'badge-pill ' + statusBadgeClass(a.status) }, a.status)),
          el('td', null, el('span', { className: 'badge-pill ' + priorityBadgeClass(a.priority) }, a.priority))
        ));
      });
    }
  }

  // ============== RENDER: PROJECTS ==============
  function renderProjects() {
    const grid = $('projectGrid');
    grid.innerHTML = '';
    if (!STATE.projects.length) {
      grid.appendChild(el('div', { className: 'empty-state' },
        el('div', { className: 'empty-state-icon' }, '📁'),
        el('div', { className: 'empty-state-title' }, 'No projects yet'),
        el('div', { className: 'empty-state-text' }, 'Create your first project to get started'),
        el('button', { className: 'btn btn-primary', onClick: openNewProjectModal }, '+ New Project')
      ));
      return;
    }
    STATE.projects.forEach(p => {
      const raidCount = STATE.raidItems.filter(r => r.projectId === p.id && r.status !== 'Closed').length;
      const actionCount = STATE.actionItems.filter(a => a.projectId === p.id && a.status !== 'Completed').length;
      const statusCls = statusBadgeClass(p.status);
      grid.appendChild(el('div', { className: 'project-card' },
        el('div', { className: 'project-card-header' },
          el('div', null,
            el('div', { className: 'project-name' }, p.name),
            el('span', { className: 'badge-pill ' + statusCls }, p.status)
          ),
          el('div', { className: 'project-stats' },
            el('span', null, '👥 ' + p.teamSize)
          )
        ),
        el('div', { className: 'project-description' }, p.description),
        el('div', { className: 'project-meta' },
          el('span', null, 'Start: ' + p.startDate),
          el('span', null, 'End: ' + p.endDate)
        ),
        el('div', { className: 'project-progress' },
          el('div', { className: 'progress-bar' },
            el('div', { className: 'progress-bar-fill', style: 'width: ' + p.progress + '%' })
          ),
          el('div', { className: 'project-stats' },
            el('span', null, p.progress + '% complete'),
            el('span', null, '⚠️ ' + raidCount + ' RAID'),
            el('span', null, '✅ ' + actionCount + ' actions')
          )
        )
      ));
    });
  }

  function openNewProjectModal() {
    showModal('New Project', `
      <div class="form-group"><label class="form-label">Project Name</label><input type="text" class="input" id="np_name" /></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="np_desc"></textarea></div>
      <div class="form-group"><label class="form-label">Status</label><select class="select" id="np_status">
        <option>Planning</option><option>In Progress</option><option>On Hold</option><option>Completed</option>
      </select></div>
      <div class="form-group"><label class="form-label">Team Size</label><input type="number" class="input" id="np_team" value="3" min="1" /></div>
    `, () => {
      const name = $('np_name').value.trim();
      if (!name) { toast('Name required', '', 'warning'); return false; }
      STATE.projects.push({
        id: nextId(STATE.projects), name, description: $('np_desc').value,
        status: $('np_status').value, startDate: fmt(new Date()),
        endDate: fmt(addDays(new Date(), 90)), progress: 0,
        teamSize: parseInt($('np_team').value) || 3
      });
      addActivity('📁', 'New project "' + name + '" created');
      saveState(); render(); toast('Project created', name, 'success');
    });
  }

  // RAID_PLACEHOLDER

  // ============== RENDER: RAID ==============
  function renderRaid() {
    const typeFilter = $('raidTypeFilter').value;
    const statusFilter = $('raidStatusFilter').value;
    const priorityFilter = $('raidPriorityFilter').value;
    const search = $('raidSearch').value.toLowerCase();

    $('raidCountAll').textContent = STATE.raidItems.length;
    $('raidCountRisk').textContent = STATE.raidItems.filter(r => r.type === 'RISK').length;
    $('raidCountAssumption').textContent = STATE.raidItems.filter(r => r.type === 'ASSUMPTION').length;
    $('raidCountIssue').textContent = STATE.raidItems.filter(r => r.type === 'ISSUE').length;
    $('raidCountDependency').textContent = STATE.raidItems.filter(r => r.type === 'DEPENDENCY').length;

    const items = STATE.raidItems.filter(r => {
      if (STATE.currentRaidType && r.type !== STATE.currentRaidType) return false;
      if (typeFilter && r.type !== typeFilter) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (priorityFilter && r.priority !== priorityFilter) return false;
      if (search && !r.title.toLowerCase().includes(search) && !r.description.toLowerCase().includes(search)) return false;
      return true;
    });

    const tbl = $('raidTable').querySelector('tbody');
    tbl.innerHTML = '';
    if (!items.length) {
      tbl.appendChild(el('tr', null, el('td', { colspan: 7, className: 'table-empty' }, 'No RAID items match your filters')));
      return;
    }
    const icons = { RISK: '🔴', ASSUMPTION: '🟡', ISSUE: '🔵', DEPENDENCY: '🟣' };
    items.forEach(r => {
      tbl.appendChild(el('tr', null,
        el('td', null, (icons[r.type] || '⚪') + ' ' + r.type.charAt(0) + r.type.slice(1).toLowerCase()),
        el('td', null, r.title),
        el('td', null, projectName(r.projectId)),
        el('td', null, el('span', { className: 'badge-pill ' + statusBadgeClass(r.status) }, r.status)),
        el('td', null, el('span', { className: 'badge-pill ' + priorityBadgeClass(r.priority) }, r.priority)),
        el('td', null, r.owner || '—'),
        el('td', { className: 'table-actions' },
          el('button', { className: 'btn-icon', onClick: () => editRaid(r.id) }, '✏️'),
          el('button', { className: 'btn-icon danger', onClick: () => deleteRaid(r.id) }, '🗑️')
        )
      ));
    });
  }

  function openNewRaidModal() {
    const projOpts = STATE.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    showModal('New RAID Item', `
      <div class="form-group"><label class="form-label">Type</label><select class="select" id="nr_type">
        <option value="RISK">Risk</option><option value="ASSUMPTION">Assumption</option>
        <option value="ISSUE">Issue</option><option value="DEPENDENCY">Dependency</option>
      </select></div>
      <div class="form-group"><label class="form-label">Title</label><input type="text" class="input" id="nr_title" /></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="nr_desc"></textarea></div>
      <div class="form-group"><label class="form-label">Project</label><select class="select" id="nr_proj">${projOpts}</select></div>
      <div class="form-group"><label class="form-label">Priority</label><select class="select" id="nr_pri">
        <option>High</option><option selected>Medium</option><option>Low</option>
      </select></div>
      <div class="form-group"><label class="form-label">Owner</label><input type="text" class="input" id="nr_owner" value="PM User" /></div>
    `, () => {
      const title = $('nr_title').value.trim();
      if (!title) { toast('Title required', '', 'warning'); return false; }
      STATE.raidItems.push({
        id: nextId(STATE.raidItems), type: $('nr_type').value, title,
        description: $('nr_desc').value, projectId: parseInt($('nr_proj').value),
        status: 'Open', priority: $('nr_pri').value, owner: $('nr_owner').value,
        dueDate: fmt(addDays(new Date(), 7)), createdAt: new Date().toISOString()
      });
      addActivity('📌', 'New RAID item "' + title + '" created');
      saveState(); render(); toast('RAID item created', title, 'success');
    });
  }

  function editRaid(id) {
    const r = STATE.raidItems.find(x => x.id === id);
    if (!r) return;
    showModal('Edit RAID Item', `
      <div class="form-group"><label class="form-label">Title</label><input type="text" class="input" id="er_title" value="${r.title}" /></div>
      <div class="form-group"><label class="form-label">Description</label><textarea id="er_desc">${r.description || ''}</textarea></div>
      <div class="form-group"><label class="form-label">Status</label><select class="select" id="er_status">
        <option ${r.status === 'Open' ? 'selected' : ''}>Open</option>
        <option ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option ${r.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
        <option ${r.status === 'Closed' ? 'selected' : ''}>Closed</option>
      </select></div>
      <div class="form-group"><label class="form-label">Priority</label><select class="select" id="er_pri">
        <option ${r.priority === 'High' ? 'selected' : ''}>High</option>
        <option ${r.priority === 'Medium' ? 'selected' : ''}>Medium</option>
        <option ${r.priority === 'Low' ? 'selected' : ''}>Low</option>
      </select></div>
      <div class="form-group"><label class="form-label">Owner</label><input type="text" class="input" id="er_owner" value="${r.owner || ''}" /></div>
    `, () => {
      r.title = $('er_title').value.trim();
      r.description = $('er_desc').value;
      r.status = $('er_status').value;
      r.priority = $('er_pri').value;
      r.owner = $('er_owner').value;
      saveState(); render(); toast('RAID item updated', r.title, 'success');
    });
  }

  function deleteRaid(id) {
    const r = STATE.raidItems.find(x => x.id === id);
    if (!r) return;
    if (!confirm('Delete "' + r.title + '"?')) return;
    STATE.raidItems = STATE.raidItems.filter(x => x.id !== id);
    saveState(); render(); toast('RAID item deleted', r.title, 'success');
  }

  // ============== RENDER: ACTIONS ==============
  function renderActions() {
    const statusFilter = $('actionStatusFilter').value;
    const projectFilter = $('actionProjectFilter').value;
    const search = $('actionSearch').value.toLowerCase();

    $('actionKpiTotal').textContent = STATE.actionItems.length;
    $('actionKpiOpen').textContent = STATE.actionItems.filter(a => a.status === 'Pending').length;
    $('actionKpiInProgress').textContent = STATE.actionItems.filter(a => a.status === 'In Progress').length;
    $('actionKpiCompleted').textContent = STATE.actionItems.filter(a => a.status === 'Completed').length;
    $('actionKpiOverdue').textContent = STATE.actionItems.filter(a => a.status !== 'Completed' && isOverdue(a.dueDate)).length;

    const items = STATE.actionItems.filter(a => {
      if (statusFilter && a.status !== statusFilter) return false;
      if (projectFilter && a.projectId !== parseInt(projectFilter)) return false;
      if (search && !a.title.toLowerCase().includes(search)) return false;
      return true;
    });

    const tbl = $('actionTable').querySelector('tbody');
    tbl.innerHTML = '';
    if (!items.length) {
      tbl.appendChild(el('tr', null, el('td', { colspan: 7, className: 'table-empty' }, 'No action items match your filters')));
      return;
    }
    items.forEach(a => {
      const due = isOverdue(a.dueDate) && a.status !== 'Completed';
      tbl.appendChild(el('tr', null,
        el('td', null, el('span', { className: 'badge-pill ' + statusBadgeClass(a.status) }, a.status)),
        el('td', null, a.title),
        el('td', null, projectName(a.projectId)),
        el('td', null, a.assignee),
        el('td', null, a.dueDate + (due ? ' ⚠️' : '')),
        el('td', null, el('span', { className: 'badge-pill ' + priorityBadgeClass(a.priority) }, a.priority)),
        el('td', { className: 'table-actions' },
          el('button', { className: 'btn-icon', onClick: () => editAction(a.id) }, '✏️'),
          el('button', { className: 'btn-icon danger', onClick: () => deleteAction(a.id) }, '🗑️')
        )
      ));
    });
  }

  function openNewActionModal() {
    const projOpts = STATE.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    showModal('New Action Item', `
      <div class="form-group"><label class="form-label">Title</label><input type="text" class="input" id="na_title" /></div>
      <div class="form-group"><label class="form-label">Project</label><select class="select" id="na_proj">${projOpts}</select></div>
      <div class="form-group"><label class="form-label">Assignee</label><input type="text" class="input" id="na_assignee" value="PM User" /></div>
      <div class="form-group"><label class="form-label">Priority</label><select class="select" id="na_pri">
        <option>High</option><option selected>Medium</option><option>Low</option>
      </select></div>
      <div class="form-group"><label class="form-label">Due Date</label><input type="date" class="input" id="na_due" value="${fmt(addDays(new Date(), 7))}" /></div>
    `, () => {
      const title = $('na_title').value.trim();
      if (!title) { toast('Title required', '', 'warning'); return false; }
      STATE.actionItems.push({
        id: nextId(STATE.actionItems), title, projectId: parseInt($('na_proj').value),
        assignee: $('na_assignee').value, status: 'Pending', priority: $('na_pri').value,
        dueDate: $('na_due').value, createdAt: new Date().toISOString()
      });
      addActivity('…', 'New action item "' + title + '" created');
      saveState(); render(); toast('Action item created', title, 'success');
    });
  }

  function editAction(id) {
    const a = STATE.actionItems.find(x => x.id === id);
    if (!a) return;
    const projOpts = STATE.projects.map(p => `<option value="${p.id}" ${p.id === a.projectId ? 'selected' : ''}>${p.name}</option>`).join('');
    showModal('Edit Action Item', `
      <div class="form-group"><label class="form-label">Title</label><input type="text" class="input" id="ea_title" value="${a.title}" /></div>
      <div class="form-group"><label class="form-label">Project</label><select class="select" id="ea_proj">${projOpts}</select></div>
      <div class="form-group"><label class="form-label">Assignee</label><input type="text" class="input" id="ea_assignee" value="${a.assignee || ''}" /></div>
      <div class="form-group"><label class="form-label">Status</label><select class="select" id="ea_status">
        <option ${a.status === 'Pending' ? 'selected' : ''}>Pending</option>
        <option ${a.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option ${a.status === 'Completed' ? 'selected' : ''}>Completed</option>
        <option ${a.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
      </select></div>
      <div class="form-group"><label class="form-label">Priority</label><select class="select" id="ea_pri">
        <option ${a.priority === 'High' ? 'selected' : ''}>High</option>
        <option ${a.priority === 'Medium' ? 'selected' : ''}>Medium</option>
        <option ${a.priority === 'Low' ? 'selected' : ''}>Low</option>
      </select></div>
      <div class="form-group"><label class="form-label">Due Date</label><input type="date" class="input" id="ea_due" value="${a.dueDate || ''}" /></div>
    `, () => {
      a.title = $('ea_title').value.trim();
      a.projectId = parseInt($('ea_proj').value);
      a.assignee = $('ea_assignee').value;
      a.status = $('ea_status').value;
      a.priority = $('ea_pri').value;
      a.dueDate = $('ea_due').value;
      addActivity('✏️', 'Action item "' + a.title + '" updated');
      saveState(); render(); toast('Action item updated', a.title, 'success');
    });
  }

  function deleteAction(id) {
    const a = STATE.actionItems.find(x => x.id === id);
    if (!a) return;
    if (!confirm('Delete "' + a.title + '"?')) return;
    STATE.actionItems = STATE.actionItems.filter(x => x.id !== id);
    saveState(); render(); toast('Action item deleted', a.title, 'success');
  }

  // ============== RENDER: HANDBOOK ==============
  function renderHandbook() {
    const cat = STATE.currentHandbookCat || '';
    const search = ($('handbookSearch') || {}).value || '';
    const filtered = STATE.handbookArticles.filter(a => {
      if (cat && a.category !== cat) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    const list = $('handbookList');
    list.innerHTML = '';
    if (!filtered.length) {
      list.appendChild(el('div', { className: 'empty-state' },
        el('div', { className: 'empty-state-icon' }, '📜'),
        el('div', { className: 'empty-state-title' }, 'No articles found'),
        el('div', { className: 'empty-state-text' }, 'Try a different search or category')
      ));
      return;
    }
    filtered.forEach(a => {
      const tags = (a.tags || []).map(t => el('span', { className: 'badge-pill muted' }, t));
      list.appendChild(el('div', { className: 'handbook-item', onClick: () => openArticle(a) },
        el('div', { className: 'handbook-item-title' }, a.title),
        el('div', { className: 'handbook-item-summary' }, a.summary),
        el('div', { className: 'handbook-item-tags' }, ...tags)
      ));
    });
  }

  function openArticle(a) {
    showModal(a.title, `<div style="white-space:pre-wrap;line-height:1.6">${a.content || a.summary}</div>`, null);
    $('modalSave').style.display = 'none';
    setTimeout(() => { $('modalSave').style.display = ''; }, 100);
  }

  function openNewArticleModal() {
    showModal('New Handbook Article', `
      <div class="form-group"><label class="form-label">Title</label><input type="text" class="input" id="ar_title" /></div>
      <div class="form-group"><label class="form-label">Summary</label><input type="text" class="input" id="ar_summary" /></div>
      <div class="form-group"><label class="form-label">Category</label><select class="select" id="ar_cat">
        <option value="process">Process</option><option value="template">Template</option>
        <option value="guide">Guide</option><option value="policy">Policy</option><option value="reference">Reference</option>
      </select></div>
      <div class="form-group"><label class="form-label">Content</label><textarea id="ar_content" rows="6"></textarea></div>
    `, () => {
      const title = $('ar_title').value.trim();
      if (!title) { toast('Title required', '', 'warning'); return false; }
      STATE.handbookArticles.push({
        id: nextId(STATE.handbookArticles), title, summary: $('ar_summary').value,
        category: $('ar_cat').value, content: $('ar_content').value, tags: []
      });
      addActivity('📜', 'New handbook article "' + title + '" added');
      saveState(); render(); toast('Article added', title, 'success');
    });
  }

  // ============== RENDER: MEETINGS ==============
  function renderMeetings() {
    const grid = $('meetingGrid');
    grid.innerHTML = '';
    if (!STATE.meetings.length) {
      grid.appendChild(el('div', { className: 'empty-state' },
        el('div', { className: 'empty-state-icon' }, '🟢'),
        el('div', { className: 'empty-state-title' }, 'No meetings yet'),
        el('div', { className: 'empty-state-text' }, 'Schedule a meeting to capture decisions and action items')
      ));
      return;
    }
    STATE.meetings.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(m => {
      grid.appendChild(el('div', { className: 'meeting-card' },
        el('div', { className: 'meeting-date' }, new Date(m.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })),
        el('div', { className: 'meeting-title' }, m.title),
        el('div', { className: 'meeting-summary' }, m.summary),
        el('div', { className: 'meeting-meta' },
          el('span', null, '👥 ' + m.attendees + ' attendees'),
          el('span', null, '📊 ' + projectName(m.projectId))
        ),
        el('div', { className: 'project-stats' },
          el('span', null, '… ' + m.decisions + ' decisions'),
          el('span', null, '📂 ' + m.actionItems + ' action items')
        )
      ));
    });
  }

  // ============== RENDER: TEMPLATES ==============
  function renderTemplates() {
    const grid = $('templateGrid');
    grid.innerHTML = '';
    STATE.templates.forEach(t => {
      grid.appendChild(el('div', { className: 'template-card' },
        el('div', { className: 'template-icon' }, t.icon),
        el('div', { className: 'template-title' }, t.name),
        el('div', { className: 'template-description' }, t.description),
        el('div', { className: 'template-preview' }, t.content),
        el('div', { style: 'margin-top:1rem;display:flex;gap:0.5rem' },
          el('button', { className: 'btn btn-secondary btn-sm', onClick: () => copyTemplate(t) }, '📂 Copy'),
          el('button', { className: 'btn btn-primary btn-sm', onClick: () => useTemplate(t) }, 'Use')
        )
      ));
    });
  }

  function copyTemplate(t) {
    navigator.clipboard.writeText(t.content).then(() => toast('Copied', t.name + ' template copied', 'success'));
  }
  function useTemplate(t) {
    showModal(t.name, `<textarea style="width:100%;min-height:300px;font-family:monospace;font-size:0.85rem" id="tpl_editor">${t.content}</textarea>`, () => {
      toast('Template ready', 'You can copy the content for your project', 'success');
    });
  }

  // ============== AI COPILOT ==============
  const AI_RESPONSES = {
    'discovery-coach': [
      'Great start! For discovery, focus on understanding the user\'s pain points through interviews, observation, and data analysis. Try the "5 Whys" technique to dig deeper.',
      'Remember to define your success metrics upfront. What does "done" look like for this discovery?',
      'Consider mapping the current state journey before jumping to solutions. Where are the friction points?'
    ],
    'prd-reviewer': [
      'Your PRD should clearly articulate: the problem, the target user, success metrics, and out-of-scope items. Make sure each requirement is testable.',
      'Consider adding: assumptions, dependencies, risks, and a clear timeline with milestones.',
      'A strong PRD includes user stories with acceptance criteria, technical considerations, and rollback plans.'
    ],
    'stakeholder-briefing': [
      'Start with the "so what" - why does this matter to the stakeholder? Lead with impact, then context.',
      'Use the BLUF method: Bottom Line Up Front. Stakeholders want the key message first, details second.',
      'Tailor your message: executives want ROI and risk, technical teams want details and tradeoffs.'
    ],
    'status-summary': [
      'A good status summary includes: overall health (RAG), key wins, current issues, upcoming milestones, and asks/needs.',
      'Use the "Start, Stop, Continue" framework for retrospective insights.',
      'Highlight deviations from plan early. Don\'t bury risks in the details.'
    ]
  };
  function renderAiChat() {
    const messages = $('aiChatMessages');
    messages.innerHTML = '';
    const agent = STATE.currentAiAgent || 'discovery-coach';
    const names = { 'discovery-coach': 'Discovery Coach', 'prd-reviewer': 'PRD Reviewer', 'stakeholder-briefing': 'Stakeholder Briefing', 'status-summary': 'Status Summary' };
    $('aiAgentName').textContent = names[agent] || 'AI Assistant';
    STATE.aiChat.filter(m => m.agent === agent).forEach(m => {
      messages.appendChild(el('div', { className: 'ai-message ai-message-' + m.role },
        el('div', { className: 'ai-message-avatar' }, m.role === 'user' ? '💤' : '📤'),
        el('div', { className: 'ai-message-content' }, m.text)
      ));
    });
    messages.scrollTop = messages.scrollHeight;
  }
  function aiSend() {
    const input = $('aiInput');
    const text = input.value.trim();
    if (!text) return;
    const agent = STATE.currentAiAgent || 'discovery-coach';
    STATE.aiChat.push({ agent, role: 'user', text });
    input.value = '';
    renderAiChat();
    setTimeout(() => {
      const responses = AI_RESPONSES[agent] || ['I can help with that. Could you provide more context?'];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      STATE.aiChat.push({ agent, role: 'bot', text: reply });
      renderAiChat();
    }, 600);
  }

  // ============== SETTINGS ==============
  function renderSettings() {
    $('settingsUsername').value = STATE.user.username;
    $('settingsEmail').value = STATE.user.email;
    $('settingsDisplayName').value = STATE.user.displayName;
  }

  // ============== COMMON ==============
  function addActivity(icon, text) {
    STATE.activities.unshift({ icon, text, time: 'Just now' });
    if (STATE.activities.length > 50) STATE.activities = STATE.activities.slice(0, 50);
  }

  function populateProjectFilters() {
    ['projectFilter', 'actionProjectFilter'].forEach(id => {
      const sel = $(id);
      if (!sel) return;
      const cur = sel.value;
      sel.innerHTML = '<option value="">All Projects</option>';
      STATE.projects.forEach(p => {
        const o = document.createElement('option');
        o.value = p.id;
        o.textContent = p.name;
        sel.appendChild(o);
      });
      if (cur) sel.value = cur;
    });
  }

  function render() {
    populateProjectFilters();
    if (STATE.currentView === 'dashboard') renderDashboard();
    else if (STATE.currentView === 'projects') renderProjects();
    else if (STATE.currentView === 'raid') renderRaid();
    else if (STATE.currentView === 'actions') renderActions();
    else if (STATE.currentView === 'handbook') renderHandbook();
    else if (STATE.currentView === 'meetings') renderMeetings();
    else if (STATE.currentView === 'templates') renderTemplates();
    else if (STATE.currentView === 'ai') renderAiChat();
    else if (STATE.currentView === 'settings') renderSettings();
  }

  // ============== STORAGE ==============
  function saveState() {
    try { localStorage.setItem('pmcentral_state', JSON.stringify(STATE)); }
    catch (e) { console.error('Save failed', e); }
  }
  function loadState() {
    try {
      const s = localStorage.getItem('pmcentral_state');
      if (s) { Object.assign(STATE, JSON.parse(s)); return true; }
    } catch (e) { console.error('Load failed', e); }
    return false;
  }

  // ============== INIT ==============
  function init() {
    if (!loadState() || !STATE.projects || !STATE.projects.length) {
      seedData();
      saveState();
    }
    STATE.currentView = STATE.currentView || 'dashboard';
    STATE.currentRaidType = STATE.currentRaidType || '';
    STATE.currentHandbookCat = STATE.currentHandbookCat || '';
    STATE.currentAiAgent = STATE.currentAiAgent || 'discovery-coach';
    STATE.aiChat = STATE.aiChat || [];
    STATE.user = STATE.user || { username: 'admin', email: 'admin@summitize.in', displayName: 'PM User' };

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', e => { e.preventDefault(); navigate(item.dataset.view); });
    });

    $('newProjectBtn').onclick = openNewProjectModal;
    $('newRaidBtn').onclick = openNewRaidModal;
    $('newActionBtn').onclick = openNewActionModal;
    $('newArticleBtn').onclick = openNewArticleModal;
    $('refreshDashboard').onclick = () => { render(); toast('Dashboard refreshed', '', 'success'); };

    $('raidTypeFilter').onchange = renderRaid;
    $('raidStatusFilter').onchange = renderRaid;
    $('raidPriorityFilter').onchange = renderRaid;
    $('raidSearch').oninput = renderRaid;
    $('actionStatusFilter').onchange = renderActions;
    $('actionProjectFilter').onchange = renderActions;
    $('actionSearch').oninput = renderActions;
    $('handbookSearch').oninput = renderHandbook;

    document.querySelectorAll('.raid-tab').forEach(tab => {
      tab.onclick = () => {
        STATE.currentRaidType = tab.dataset.type;
        document.querySelectorAll('.raid-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderRaid();
      };
    });

    document.querySelectorAll('#handbookCategories li').forEach(li => {
      li.onclick = () => {
        STATE.currentHandbookCat = li.dataset.category;
        document.querySelectorAll('#handbookCategories li').forEach(l => l.classList.remove('active'));
        li.classList.add('active');
        renderHandbook();
      };
    });

    document.querySelectorAll('#aiAgentsList li').forEach(li => {
      li.onclick = () => {
        STATE.currentAiAgent = li.dataset.agent;
        document.querySelectorAll('#aiAgentsList li').forEach(l => l.classList.remove('active'));
        li.classList.add('active');
        renderAiChat();
      };
    });

    $('aiSendBtn').onclick = aiSend;
    $('aiInput').onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); aiSend(); } };

    $('modalClose').onclick = hideModal;
    $('modalCancel').onclick = hideModal;
    $('modalOverlay').onclick = e => { if (e.target === $('modalOverlay')) hideModal(); };

    $('themeToggle').onclick = () => {
      document.body.classList.toggle('light');
      $('themeToggle').textContent = document.body.classList.contains('light') ? '✏️' : '™';
    };

    $('mobileMenu').onclick = () => $('sidebar').classList.toggle('open');

    $('userName').textContent = STATE.user.displayName || STATE.user.username;
    $('userRole').textContent = 'Project Manager';
    $('userAvatar').textContent = (STATE.user.displayName || STATE.user.username).charAt(0).toUpperCase();

    $('globalSearch').onkeydown = e => {
      if (e.key === 'Enter') {
        const term = e.target.value.toLowerCase().trim();
        if (!term) return;
        const matches = [];
        STATE.raidItems.filter(r => r.title.toLowerCase().includes(term)).forEach(r => matches.push('RAID: ' + r.title));
        STATE.actionItems.filter(a => a.title.toLowerCase().includes(term)).forEach(a => matches.push('Action: ' + a.title));
        STATE.projects.filter(p => p.name.toLowerCase().includes(term)).forEach(p => matches.push('Project: ' + p.name));
        if (matches.length) {
          showModal('Search Results', '<ul style="list-style:none;padding:0">' + matches.map(m => '<li style="padding:0.5rem;border-bottom:1px solid var(--color-border)">' + m + '</li>').join('') + '</ul>', null);
        } else {
          toast('No results', 'No items found for "' + term + '"', 'warning');
        }
      }
    };

    $('quickAddBtn').onclick = () => {
      showModal('Quick Add', `
        <p class="text-muted" style="margin-bottom:1rem">What would you like to add?</p>
        <div style="display:grid;gap:0.5rem">
          <button class="btn btn-secondary" onclick="hideModal();navigate('projects');setTimeout(openNewProjectModal,100)">✅ New Project</button>
          <button class="btn btn-secondary" onclick="hideModal();navigate('raid');setTimeout(openNewRaidModal,100)">⚠️ New RAID Item</button>
          <button class="btn btn-secondary" onclick="hideModal();navigate('actions');setTimeout(openNewActionModal,100)">… New Action Item</button>
          <button class="btn btn-secondary" onclick="hideModal();navigate('handbook');setTimeout(openNewArticleModal,100)">📜 New Article</button>
        </div>
      `, null);
      $('modalSave').style.display = 'none';
      setTimeout(() => { $('modalSave').style.display = ''; }, 100);
    };

    $('notificationBtn').onclick = () => {
      const items = STATE.actionItems.filter(a => a.status !== 'Completed' && isOverdue(a.dueDate));
      const msg = items.length ?
        '<p>You have <strong>' + items.length + '</strong> overdue action item(s):</p><ul style="list-style:none;padding:0">' +
        items.map(a => '<li style="padding:0.5rem;border-bottom:1px solid var(--color-border)">⚠️ ' + a.title + ' (due ' + a.dueDate + ')</li>').join('') + '</ul>' :
        '<p>No notifications. All caught up! 🟡</p>';
      showModal('Notifications', msg, null);
    };

    $('exportDataBtn').onclick = () => {
      const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'pmcentral_export_' + fmt(new Date()) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      toast('Exported', 'Data exported successfully', 'success');
    };
    $('importDataBtn').onclick = () => $('importFileInput').click();
    $('importFileInput').onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          Object.assign(STATE, data);
          saveState(); render();
          toast('Imported', 'Data imported successfully', 'success');
        } catch (err) { toast('Import failed', err.message, 'danger'); }
      };
      reader.readAsText(file);
    };
    $('resetDataBtn').onclick = () => {
      if (!confirm('Reset all data? This cannot be undone.')) return;
      localStorage.removeItem('pmcentral_state');
      seedData();
      saveState();
      render();
      toast('Reset', 'All data reset to defaults', 'success');
    };

    $('profileForm').onsubmit = e => {
      e.preventDefault();
      STATE.user.username = $('settingsUsername').value;
      STATE.user.email = $('settingsEmail').value;
      STATE.user.displayName = $('settingsDisplayName').value;
      $('userName').textContent = STATE.user.displayName || STATE.user.username;
      $('userAvatar').textContent = (STATE.user.displayName || STATE.user.username).charAt(0).toUpperCase();
      saveState();
      toast('Profile updated', '', 'success');
    };

    navigate(STATE.currentView);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
