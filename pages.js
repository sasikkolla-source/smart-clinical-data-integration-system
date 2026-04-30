/* =============================================
   SCDIS — Page Renderers
   ============================================= */

const Pages = {

  // ============================================================
  // DASHBOARD
  // ============================================================
  dashboard() {
    const s = DATA.stats;
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Dashboard</div>
          <div class="page-sub">Real-time clinical data integration overview</div>
        </div>
        <div class="page-actions">
          <div class="live-pulse"><div class="live-ring"></div>Live feed</div>
        </div>
      </div>

      <div class="grid-stats mb-20">
        ${Pages._statCard('Records Today','12,847','+8.3% vs yesterday','up','stat-c-blue','#dbeafe','#1e40af',`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4h10M3 8h10M3 12h7"/></svg>`)}
        ${Pages._statCard('Integration Rate','98.6%','+0.4% this week','up','stat-c-green','#d1fae5','#065f46',`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 9l4 4 8-8"/></svg>`)}
        ${Pages._statCard('Pending Review','143','22 newly flagged','down','stat-c-amber','#fef3c7','#92400e',`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 11v.5"/></svg>`)}
        ${Pages._statCard('Failed Records','31','12 new today','down','stat-c-red','#fee2e2','#991b1b',`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M6 6l4 4M10 6l-4 4"/></svg>`)}
      </div>

      <div class="grid-2 mb-20">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">Recent Integrations</div><div class="card-sub">Last 15 transactions</div></div>
            <button class="btn btn-sm" onclick="navigate('patients')">View all →</button>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>Patient ID</th><th>Source</th><th>Format</th><th>Status</th><th>Time</th></tr></thead>
              <tbody>
                ${DATA.patients.slice(0,8).map(p => `
                  <tr onclick="showPatientModal('${p.id}')">
                    <td class="table-cell-id">${p.id}</td>
                    <td>${p.src}</td>
                    <td>${Pages._fmtTag(p.fmt)}</td>
                    <td>${Pages._statusCell(p.status)}</td>
                    <td class="table-cell-muted">${p.time}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="gap-col">
          <div class="card">
            <div class="card-head"><div class="card-title">Source Systems</div></div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${DATA.sources.slice(0,4).map(s => Pages._sourceItem(s)).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="grid-2 mb-20">
        <div class="card">
          <div class="card-head"><div class="card-title">Record Volume by Source</div></div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              {n:'City General Hospital', v:4820, max:5000, c:'#3d8ec4'},
              {n:'Apollo Clinics',        v:3210, max:5000, c:'#00d4a1'},
              {n:'Medlabs Diagnostics',   v:2405, max:5000, c:'#5fb3e0'},
              {n:'NovaCare Pharmacy',     v:1892, max:5000, c:'#f59e0b'},
              {n:'SunPath Labs',          v:520,  max:5000, c:'#9ab0c0'},
              {n:'Sunshine Insurance',    v:980,  max:5000, c:'#8b5cf6'},
            ].map(r => `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px">
                  <span>${r.n}</span><span style="font-weight:500;color:var(--text)">${r.v.toLocaleString()}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width:${Math.round(r.v/r.max*100)}%;background:${r.c}"></div></div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div class="card-title">Activity Feed</div></div>
          <div class="activity-list">
            <div class="act-item"><div class="act-dot" style="background:var(--danger)"></div><div><div class="act-text">HL7 ADT^A08 parse error on PT-00836 — missing PID-3 segment</div><div class="act-time">2 min ago</div></div></div>
            <div class="act-item"><div class="act-dot" style="background:var(--acc)"></div><div><div class="act-text">FHIR batch ingestion complete — 312 Observation resources from Apollo</div><div class="act-time">5 min ago</div></div></div>
            <div class="act-item"><div class="act-dot" style="background:var(--warn)"></div><div><div class="act-text">NovaCare EDI connection degraded — retry queued (attempt 2/5)</div><div class="act-time">11 min ago</div></div></div>
            <div class="act-item"><div class="act-dot" style="background:var(--info)"></div><div><div class="act-text">Duplicate detection flagged PT-00821 ↔ PT-00791 (95% match)</div><div class="act-time">19 min ago</div></div></div>
            <div class="act-item"><div class="act-dot" style="background:var(--acc)"></div><div><div class="act-text">Genome Institute HL7 pipeline restarted after maintenance</div><div class="act-time">34 min ago</div></div></div>
            <div class="act-item"><div class="act-dot" style="background:var(--acc)"></div><div><div class="act-text">Daily bulk export to warehouse — 12,400 records</div><div class="act-time">51 min ago</div></div></div>
          </div>
        </div>
      </div>`;
  },

  // ============================================================
  // PATIENTS
  // ============================================================
  patients(filter = '', statusFilter = 'all') {
    let list = DATA.patients;
    if (filter) {
      const q = filter.toLowerCase();
      list = list.filter(p =>
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.src.toLowerCase().includes(q) ||
        p.diag.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') list = list.filter(p => p.status === statusFilter);

    const counts = { all: DATA.patients.length, synced: DATA.patients.filter(p=>p.status==='synced').length, review: DATA.patients.filter(p=>p.status==='review').length, failed: DATA.patients.filter(p=>p.status==='failed').length };

    return `
      <div class="page-header">
        <div>
          <div class="page-title">Patient Records</div>
          <div class="page-sub">${DATA.patients.length.toLocaleString()} integrated records across ${DATA.sources.length} sources</div>
        </div>
        <div class="page-actions">
          <button class="btn"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 2h8v2L7 7v3l-2-1V7L2 4z"/></svg> Filter</button>
          <button class="btn"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 9h8M2 6h5M2 3h8"/></svg> Export</button>
        </div>
      </div>

      <div class="card">
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
          <div class="search-bar" style="flex:1;min-width:220px">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
            <input type="text" id="pt-search" placeholder="Search by ID, name, source, diagnosis..." oninput="App.reRenderPatients()" value="${filter}"/>
          </div>
          <select class="filter-select" id="pt-status-filter" onchange="App.reRenderPatients()">
            <option value="all" ${statusFilter==='all'?'selected':''}>All (${counts.all})</option>
            <option value="synced" ${statusFilter==='synced'?'selected':''}>Synced (${counts.synced})</option>
            <option value="review" ${statusFilter==='review'?'selected':''}>Review (${counts.review})</option>
            <option value="failed" ${statusFilter==='failed'?'selected':''}>Failed (${counts.failed})</option>
          </select>
          <select class="filter-select" id="pt-fmt-filter">
            <option value="">All formats</option>
            <option>HL7</option><option>FHIR</option><option>EDI</option><option>REST</option>
          </select>
        </div>

        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Patient ID</th><th>Name</th><th>DOB</th><th>Gender</th><th>Blood</th><th>Source System</th><th>Format</th><th>Diagnosis</th><th>Last Sync</th><th>Status</th></tr></thead>
            <tbody>
              ${list.length === 0 ? `<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--text-faint)">No records match your search</td></tr>` :
              list.map(p => `
                <tr onclick="showPatientModal('${p.id}')">
                  <td class="table-cell-id">${p.id}</td>
                  <td style="font-weight:500">${p.name}</td>
                  <td class="table-cell-muted">${p.dob}</td>
                  <td class="table-cell-muted">${p.gender}</td>
                  <td><span class="tag tag-gray">${p.blood}</span></td>
                  <td class="table-cell-muted">${p.src}</td>
                  <td>${Pages._fmtTag(p.fmt)}</td>
                  <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text-muted)">${p.diag}</td>
                  <td class="table-cell-muted">${p.time}</td>
                  <td>${Pages._statusCell(p.status)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:12px;font-size:10px;color:var(--text-faint);text-align:right">Showing ${list.length} of ${DATA.patients.length} records</div>
      </div>`;
  },

  // ============================================================
  // SOURCES
  // ============================================================
  sources() {
    const online   = DATA.sources.filter(s=>s.status==='online').length;
    const degraded = DATA.sources.filter(s=>s.status==='degraded').length;
    const offline  = DATA.sources.filter(s=>s.status==='offline').length;

    return `
      <div class="page-header">
        <div>
          <div class="page-title">Data Sources</div>
          <div class="page-sub">Manage and monitor all connected source systems</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v8M2 6h8"/></svg> Add Source</button>
        </div>
      </div>

      <div class="grid-stats mb-20">
        ${Pages._statCard('Active Sources', online.toString(), 'Online & healthy', 'up', 'stat-c-green', '#d1fae5', '#065f46', '')}
        ${Pages._statCard('Degraded', degraded.toString(), 'NovaCare Pharmacy', 'down', 'stat-c-amber', '#fef3c7', '#92400e', '')}
        ${Pages._statCard('Offline', offline.toString(), 'Scheduled maintenance', '', 'stat-c-red', '#fee2e2', '#991b1b', '')}
        ${Pages._statCard('Formats', '4', 'HL7 · FHIR · EDI · REST', '', 'stat-c-blue', '#dbeafe', '#1e40af', '')}
      </div>

      <div class="card">
        <div class="card-head"><div class="card-title">Connected Systems</div></div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>System</th><th>Protocol</th><th>Version</th><th>Endpoint</th><th>Throughput</th><th>Latency</th><th>Uptime</th><th>Status</th></tr></thead>
            <tbody>
              ${DATA.sources.map(s => `
                <tr onclick="">
                  <td><div style="font-weight:500">${s.name}</div><div style="font-size:9px;color:var(--text-faint);margin-top:2px">${s.formats.join(' · ')}</div></td>
                  <td>${Pages._fmtTag(s.type)}</td>
                  <td class="table-cell-muted">${s.version}</td>
                  <td><code style="font-size:9px;color:var(--text-muted);background:var(--bg);padding:2px 6px;border-radius:4px">${s.endpoint}</code></td>
                  <td class="table-cell-muted">${s.throughput}</td>
                  <td class="table-cell-muted">${s.latency}</td>
                  <td>${Pages._uptimeBar(s.uptime)}</td>
                  <td>${Pages._sourceStatusBadge(s.status)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ============================================================
  // PIPELINES
  // ============================================================
  pipelines() {
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Integration Pipelines</div>
          <div class="page-sub">Active data transformation and routing workflows</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v8M2 6h8"/></svg> New Pipeline</button>
        </div>
      </div>
      <div class="grid-3">
        ${DATA.pipelines.map(p => Pages._pipelineCard(p)).join('')}
      </div>`;
  },

  // ============================================================
  // FIELD MAPPING
  // ============================================================
  mapping() {
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Field Mapping</div>
          <div class="page-sub">HL7 segment → FHIR R4 resource mappings</div>
        </div>
        <div class="page-actions">
          <button class="btn">Import Schema</button>
          <button class="btn btn-primary">Save Mappings</button>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">Active Mappings</div><div class="card-sub">HL7 PID / OBR / OBX → FHIR</div></div>
            <select class="filter-select"><option>HL7 v2.8 → FHIR R4</option><option>EDI X12 → FHIR</option></select>
          </div>

          <div style="display:grid;grid-template-columns:1fr 32px 1fr 80px;gap:6px;align-items:center;padding:0 0 8px;border-bottom:0.5px solid var(--border);font-size:9px;letter-spacing:.5px;color:var(--text-faint);text-transform:uppercase">
            <div>Source Field</div><div></div><div>FHIR Target</div><div>Status</div>
          </div>

          ${DATA.mappings.map(m => `
            <div class="mapping-row">
              <div class="map-src">${m.src}</div>
              <div class="map-arrow">→</div>
              <div class="map-dst">${m.dst}</div>
              <span class="tag ${m.status==='active'?'tag-green':'tag-red'}">${m.status}</span>
            </div>`).join('')}
        </div>

        <div class="gap-col">
          <div class="card">
            <div class="card-head"><div class="card-title">Source Schema — HL7 PID</div></div>
            <div class="mapping-schema-box">
              <div class="schema-label">Segment Fields</div>
              ${[
                {f:'PID-1', n:'Set ID', t:'int'}, {f:'PID-3', n:'Patient Identifier', t:'str'}, {f:'PID-5', n:'Patient Name', t:'str'},
                {f:'PID-7', n:'Date of Birth', t:'date'},{f:'PID-8', n:'Administrative Sex', t:'str'},{f:'PID-11', n:'Address', t:'str'},
                {f:'PID-18', n:'Account Number', t:'int'},{f:'PID-29', n:'Patient Death Date', t:'date'}
              ].map(x=>`
                <div class="schema-field">
                  <code style="font-size:10px;color:var(--info-text)">${x.f}</code>
                  <span style="font-size:10px;color:var(--text-muted)">${x.n}</span>
                  <span class="sf-type ${x.t}">${x.t}</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-head"><div class="card-title">Target Schema — FHIR Patient</div></div>
            <div class="mapping-schema-box">
              <div class="schema-label">Resource Elements</div>
              ${[
                {f:'identifier', t:'str'},{f:'name', t:'str'},{f:'birthDate', t:'date'},
                {f:'gender', t:'str'},{f:'address', t:'str'},{f:'telecom', t:'str'}
              ].map(x=>`
                <div class="schema-field">
                  <code style="font-size:10px;color:var(--acc-dark)">Patient.${x.f}</code>
                  <span class="sf-type ${x.t}">${x.t}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  // ============================================================
  // ALERTS
  // ============================================================
  alerts() {
    const active   = DATA.alerts.filter(a=>a.status==='active');
    const resolved = DATA.alerts.filter(a=>a.status==='resolved');
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Alerts</div>
          <div class="page-sub">${active.length} active · ${resolved.length} resolved today</div>
        </div>
        <div class="page-actions">
          <button class="btn">Acknowledge All</button>
          <button class="btn">Alert Rules</button>
        </div>
      </div>

      <div class="section-title">Active Alerts (${active.length})</div>
      ${active.map(a => Pages._alertItem(a)).join('')}

      <div class="section-title" style="margin-top:24px">Resolved Today</div>
      ${resolved.map(a => Pages._alertItem(a)).join('')}`;
  },

  // ============================================================
  // AUDIT LOG
  // ============================================================
  audit() {
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Audit Log</div>
          <div class="page-sub">Complete record of all system events and user actions</div>
        </div>
        <div class="page-actions">
          <button class="btn">Export Log</button>
        </div>
      </div>

      <div class="card">
        <div class="audit-filter-row">
          <div class="search-bar" style="flex:1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
            <input type="text" placeholder="Search events, actors, resources..."/>
          </div>
          <select class="filter-select"><option>All outcomes</option><option>Success</option><option>Error</option><option>Warning</option></select>
          <select class="filter-select"><option>All actors</option><option>System</option><option>Pipeline</option><option>User</option></select>
        </div>

        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Timestamp</th><th>Event</th><th>Actor</th><th>Resource</th><th>Outcome</th><th>Detail</th></tr></thead>
            <tbody>
              ${DATA.auditLog.map(a => `
                <tr>
                  <td><code style="font-size:10px;color:var(--text-faint)">${a.ts}</code></td>
                  <td style="font-weight:500">${a.event}</td>
                  <td class="table-cell-muted">${a.actor}</td>
                  <td><code style="font-size:10px;color:var(--info-text);background:var(--info-bg);padding:1px 6px;border-radius:3px">${a.resource}</code></td>
                  <td>${Pages._outcomeBadge(a.outcome)}</td>
                  <td style="font-size:10px;color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.detail}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  // ============================================================
  // ANALYTICS
  // ============================================================
  analytics() {
    return `
      <div class="page-header">
        <div>
          <div class="page-title">Analytics</div>
          <div class="page-sub">Integration performance and trend analysis</div>
        </div>
        <div class="page-actions">
          <select class="filter-select"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select>
          <button class="btn">Export Report</button>
        </div>
      </div>

      <div class="grid-stats mb-20">
        ${Pages._statCard('Total Records (7d)', '82,421', '+12% vs prev week', 'up', 'stat-c-blue', '#dbeafe', '#1e40af', '')}
        ${Pages._statCard('Avg Throughput', '11,774/day', 'Across all sources', '', 'stat-c-green', '#d1fae5', '#065f46', '')}
        ${Pages._statCard('Error Rate', '0.24%', '-0.08% improvement', 'up', 'stat-c-amber', '#fef3c7', '#92400e', '')}
        ${Pages._statCard('Avg Latency', '83ms', 'End-to-end pipeline', '', 'stat-c-purple', '#ede9fe', '#5b21b6', '')}
      </div>

      <div class="card mb-20">
        <div class="card-head">
          <div class="card-title">Daily Integration Volume by Format</div>
          <div style="display:flex;gap:12px;align-items:center">
            <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text-muted)"><div style="width:10px;height:3px;background:#3d8ec4;border-radius:2px"></div>HL7</div>
            <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text-muted)"><div style="width:10px;height:3px;background:#00d4a1;border-radius:2px"></div>FHIR</div>
            <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text-muted)"><div style="width:10px;height:3px;background:#f59e0b;border-radius:2px"></div>EDI</div>
          </div>
        </div>
        <div style="height:200px;position:relative">
          <canvas id="analytics-chart" style="width:100%;height:100%"></canvas>
        </div>
      </div>

      <div class="grid-3">
        <div class="card">
          <div class="card-head"><div class="card-title">Format Distribution</div></div>
          <div id="donut-formats" style="display:flex;justify-content:center;margin:8px 0 12px"></div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${[{l:'HL7',v:47,c:'#3d8ec4'},{l:'FHIR R4',v:32,c:'#00d4a1'},{l:'EDI X12',v:16,c:'#f59e0b'},{l:'REST',v:5,c:'#8b5cf6'}].map(x=>`
              <div style="display:flex;align-items:center;gap:8px;font-size:10px">
                <div style="width:8px;height:8px;border-radius:50%;background:${x.c};flex-shrink:0"></div>
                <span style="flex:1;color:var(--text-muted)">${x.l}</span>
                <span style="font-weight:500">${x.v}%</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div class="card-title">Error Distribution</div></div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
            ${[
              {l:'Parse errors', v:42, c:'#ef4444'},
              {l:'Validation fails', v:28, c:'#f59e0b'},
              {l:'Timeout', v:18, c:'#3b82f6'},
              {l:'Auth failures', v:8, c:'#8b5cf6'},
              {l:'Other', v:4, c:'#9ab0c0'},
            ].map(x=>`
              <div>
                <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px">
                  <span>${x.l}</span><span style="font-weight:500;color:var(--text)">${x.v}%</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width:${x.v}%;background:${x.c}"></div></div>
              </div>`).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div class="card-title">Top Sources by Volume</div></div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
            ${[
              {n:'City General', v:33600, pct:41},
              {n:'Apollo Clinics', v:22470, pct:27},
              {n:'Medlabs Diag.', v:16835, pct:20},
              {n:'NovaCare Pharmacy', v:9810, pct:12},
            ].map((x,i)=>`
              <div style="display:flex;align-items:center;gap:10px;font-size:10px">
                <div style="width:16px;height:16px;border-radius:4px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-weight:500;color:var(--text-muted)">${i+1}</div>
                <div style="flex:1">
                  <div style="color:var(--text);margin-bottom:3px">${x.n}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${x.pct}%;background:var(--info)"></div></div>
                </div>
                <div style="font-weight:500;color:var(--text)">${x.v.toLocaleString()}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  },

  // ============================================================
  // HELPERS
  // ============================================================
  _statCard(label, val, delta, dir, cls, iconBg, iconColor, iconSvg) {
    return `
      <div class="stat-card ${cls}">
        ${iconSvg ? `<div class="stat-card-icon" style="background:${iconBg};color:${iconColor}">${iconSvg}</div>` : ''}
        <div class="stat-label">${label}</div>
        <div class="stat-val">${val}</div>
        <div class="stat-delta ${dir==='up'?'delta-up':dir==='down'?'delta-down':''}">${dir==='up'?'↑':dir==='down'?'↓':''} ${delta}</div>
      </div>`;
  },

  _fmtTag(fmt) {
    const map = { HL7:'tag-blue', FHIR:'tag-green', EDI:'tag-amber', REST:'tag-gray' };
    return `<span class="tag ${map[fmt]||'tag-gray'}">${fmt}</span>`;
  },

  _statusCell(status) {
    const map = { synced:'dot-green', review:'dot-amber', failed:'dot-red' };
    const labels = { synced:'Synced', review:'Review', failed:'Failed' };
    return `<span class="status-dot ${map[status]}"></span>${labels[status]||status}`;
  },

  _sourceStatusBadge(status) {
    if (status==='online')   return `<span class="tag tag-green">● Online</span>`;
    if (status==='degraded') return `<span class="tag tag-amber">◑ Degraded</span>`;
    return `<span class="tag tag-red">○ Offline</span>`;
  },

  _uptimeBar(pct) {
    const v = parseFloat(pct);
    const c = v >= 99 ? 'var(--success)' : v >= 97 ? 'var(--warn)' : 'var(--danger)';
    return `<div style="display:flex;align-items:center;gap:6px">
      <div class="bar-track" style="width:50px"><div class="bar-fill" style="width:${v}%;background:${c}"></div></div>
      <span style="font-size:10px;color:var(--text-muted)">${pct}</span>
    </div>`;
  },

  _sourceItem(s) {
    const icons = { HL7:'si-hl7', FHIR:'si-fhir', EDI:'si-edi', REST:'si-api', API:'si-api' };
    const sCol  = { online:'var(--success)', degraded:'var(--warn)', offline:'var(--danger)' };
    return `<div class="source-item">
      <div class="source-icon ${icons[s.type]||'si-api'}">${s.icon}</div>
      <div class="source-info">
        <div class="source-name">${s.name}</div>
        <div class="source-sub">${s.formats.slice(0,3).join(', ')}</div>
      </div>
      <span class="source-status-text" style="color:${sCol[s.status]}">● ${s.status.charAt(0).toUpperCase()+s.status.slice(1)}</span>
    </div>`;
  },

  _pipelineCard(p) {
    const statusColors = { running:'tag-green', error:'tag-red', idle:'tag-gray' };
    const fillColors   = { running:'var(--acc)', error:'var(--danger)', idle:'var(--border-md)' };
    return `
      <div class="pipeline-box ${p.status==='error'?'error':''}">
        <div class="pip-head">
          <div class="pip-title">${p.name}</div>
          <span class="tag ${statusColors[p.status]||'tag-gray'}">${p.status.charAt(0).toUpperCase()+p.status.slice(1)}</span>
        </div>
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px">${p.src} → ${p.dst}</div>
        <div class="pip-steps">
          ${p.steps.map(s=>`
            <div class="pip-step ${s.done?'done':s.active?'running':s.error?'error':''}">
              <div class="step-icon ${s.done?'si-done':s.active?'si-run':s.error?'si-err':'si-pend'}">
                ${s.done?'✓':s.active?'↻':s.error?'✕':'·'}
              </div>
              ${s.label}
            </div>`).join('')}
        </div>
        <div class="progress-track" style="margin-top:12px">
          <div class="progress-fill ${p.status==='error'?'error':''}" style="width:${p.progress}%;background:${fillColors[p.status]}"></div>
        </div>
        ${p.error ? `<div class="pip-error-box">${p.error}</div>` : ''}
        <div class="pip-metrics">
          <div class="pip-metric"><div class="pip-metric-val">${p.metrics.processed}</div><div class="pip-metric-lbl">Processed</div></div>
          <div class="pip-metric"><div class="pip-metric-val" style="${p.metrics.errors!=='0'?'color:var(--danger)':''}">${p.metrics.errors}</div><div class="pip-metric-lbl">Errors</div></div>
          <div class="pip-metric"><div class="pip-metric-val">${p.metrics.latency}</div><div class="pip-metric-lbl">Latency</div></div>
        </div>
      </div>`;
  },

  _alertItem(a) {
    const sevMap = {
      critical: { cls:'alert-crit', box:'aib-red',   icon:'<path d="M8 3L14 13H2L8 3z"/><path d="M8 8v2M8 12v.5" stroke="currentColor" stroke-width="1.5"/>' },
      warn:     { cls:'alert-warn', box:'aib-amber',  icon:'<circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 5.5v3M8 10.5v.5" stroke="currentColor" stroke-width="1.5"/>' },
      info:     { cls:'alert-info', box:'aib-blue',   icon:'<circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="currentColor" stroke-width="1.5"/>' },
    };
    const s = sevMap[a.sev] || sevMap.info;
    return `
      <div class="alert-item ${a.status==='resolved'?'alert-resolved':s.cls}">
        <div class="alert-icon-box ${s.box}">
          <svg viewBox="0 0 16 16" fill="none">${s.icon}</svg>
        </div>
        <div class="alert-body">
          <div class="alert-title">${a.title}</div>
          <div class="alert-msg">${a.msg}</div>
          <div class="alert-time">${a.time}${a.assigned && a.assigned!=='—' ? ' · Assigned: '+a.assigned : ''}</div>
          ${a.status==='active' ? `<div class="alert-actions"><button class="btn btn-sm">Acknowledge</button>${a.sev==='critical'?'<button class="btn btn-sm btn-danger">Escalate</button>':''}</div>` : ''}
        </div>
      </div>`;
  },

  _outcomeBadge(outcome) {
    const map = { success:'tag-green', error:'tag-red', warn:'tag-amber', info:'tag-blue' };
    return `<span class="tag ${map[outcome]||'tag-gray'}">${outcome.charAt(0).toUpperCase()+outcome.slice(1)}</span>`;
  },

  // Patient detail modal content
  patientModal(id) {
    const p = DATA.patients.find(pt => pt.id === id);
    if (!p) return '<div style="padding:20px;color:var(--text-muted)">Patient not found</div>';
    const initials = p.name.split(' ').map(n=>n[0]).join('');
    return `
      <div class="patient-detail-header">
        <div class="patient-avatar">${initials}</div>
        <div>
          <div class="patient-name">${p.name}</div>
          <div class="patient-id">${p.id} · MRN: ${p.mrn}</div>
        </div>
        <div style="margin-left:auto">${Pages._statusCell(p.status)}</div>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">Demographics</div>
        <table class="detail-table">
          <tr><td>Date of Birth</td><td>${p.dob}</td></tr>
          <tr><td>Gender</td><td>${p.gender === 'M' ? 'Male' : 'Female'}</td></tr>
          <tr><td>Blood Group</td><td><span class="tag tag-gray">${p.blood}</span></td></tr>
          <tr><td>Phone</td><td>${p.phone}</td></tr>
          <tr><td>Ward / Dept</td><td>${p.ward}</td></tr>
        </table>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">Clinical</div>
        <table class="detail-table">
          <tr><td>Diagnosis</td><td>${p.diag}</td></tr>
          <tr><td>Last Sync</td><td>${p.time}</td></tr>
        </table>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">Integration</div>
        <table class="detail-table">
          <tr><td>Source System</td><td>${p.src}</td></tr>
          <tr><td>Format</td><td>${Pages._fmtTag(p.fmt)}</td></tr>
          <tr><td>Integration Status</td><td>${Pages._statusCell(p.status)}</td></tr>
        </table>
      </div>

      <div style="display:flex;gap:8px;margin-top:16px">
        <button class="btn">View HL7 Raw</button>
        <button class="btn">View FHIR Resource</button>
        <button class="btn btn-primary" style="margin-left:auto">Edit Record</button>
      </div>`;
  }
};
