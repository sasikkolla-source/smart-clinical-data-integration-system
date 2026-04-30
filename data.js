/* =============================================
   SCDIS — Data Layer (Mock Clinical Data)
   ============================================= */

const DATA = {

  // ---- STATS ----
  stats: {
    recordsToday:    { val: 12847, delta: '+8.3%', dir: 'up' },
    integrationRate: { val: '98.6%', delta: '+0.4% this week', dir: 'up' },
    pendingReview:   { val: 143,  delta: '22 flagged', dir: 'down' },
    failedRecords:   { val: 31,   delta: '12 new today', dir: 'down' },
  },

  // ---- SOURCES ----
  sources: [
    { id:'SRC-001', name:'City General Hospital',  type:'HL7',  version:'v2.8', proto:'MLLP',  endpoint:'mllp://10.0.1.14:2575', throughput:'4,820/day', latency:'42ms',  status:'online',   icon:'HL7', formats:['ADT','ORM','ORU'], uptime:'99.9%' },
    { id:'SRC-002', name:'Apollo Clinics Network', type:'FHIR', version:'R4',   proto:'HTTPS', endpoint:'https://fhir.apollo.in/R4', throughput:'3,210/day', latency:'118ms', status:'online',   icon:'FHR', formats:['Patient','Observation','MedicationRequest'], uptime:'99.7%' },
    { id:'SRC-003', name:'NovaCare Pharmacy',      type:'EDI',  version:'X12',  proto:'SFTP',  endpoint:'sftp://novacare.in/edi', throughput:'1,892/day', latency:'—',     status:'degraded', icon:'EDI', formats:['837P','835','270','271'], uptime:'94.2%' },
    { id:'SRC-004', name:'Medlabs Diagnostics',    type:'HL7',  version:'v2.5', proto:'MLLP',  endpoint:'mllp://10.0.2.8:2575',  throughput:'2,405/day', latency:'28ms',  status:'online',   icon:'HL7', formats:['ORM','ORU','MDM'], uptime:'99.8%' },
    { id:'SRC-005', name:'SunPath Laboratories',   type:'FHIR', version:'R4',   proto:'HTTPS', endpoint:'https://api.sunpath.io/fhir', throughput:'520/day', latency:'204ms', status:'online',   icon:'FHR', formats:['DiagnosticReport','Specimen'], uptime:'98.1%' },
    { id:'SRC-006', name:'Genome Institute HYD',   type:'HL7',  version:'v3',   proto:'MLLP',  endpoint:'mllp://10.0.3.2:2575',  throughput:'—',        latency:'—',     status:'offline',  icon:'HL7', formats:['CDA','CCR'], uptime:'96.3%' },
    { id:'SRC-007', name:'Sunshine Insurance',     type:'EDI',  version:'X12',  proto:'AS2',   endpoint:'as2://sunshine.in/edi', throughput:'980/day',  latency:'350ms', status:'online',   icon:'EDI', formats:['837I','835','278'], uptime:'97.5%' },
    { id:'SRC-008', name:'CarePoint Clinics',      type:'REST', version:'v2',   proto:'HTTPS', endpoint:'https://api.carepoint.in/v2', throughput:'620/day', latency:'145ms', status:'online', icon:'API', formats:['JSON/HL7','SMART'], uptime:'99.2%' },
  ],

  // ---- PATIENTS ----
  patients: [
    { id:'PT-00841', name:'Arjun Sharma',    dob:'14 Mar 1982', gender:'M', blood:'B+',  src:'City General Hospital', fmt:'HL7',  time:'0:42s ago', status:'synced',   mrn:'MRN-8812', phone:'+91 98400 11234', diag:'Hypertension, T2DM', ward:'OPD-2' },
    { id:'PT-00839', name:'Priya Menon',     dob:'02 Jul 1995', gender:'F', blood:'O+',  src:'Medlabs Diagnostics',  fmt:'FHIR', time:'1:18s ago', status:'synced',   mrn:'MRN-9244', phone:'+91 99000 55678', diag:'Routine lab panel',  ward:'Pathology' },
    { id:'PT-00837', name:'Rahul Verma',     dob:'29 Nov 1970', gender:'M', blood:'A-',  src:'Apollo Clinics',       fmt:'EDI',  time:'2:05s ago', status:'review',   mrn:'MRN-7701', phone:'+91 98766 22345', diag:'Chest pain (pending)', ward:'Cardiology' },
    { id:'PT-00836', name:'Sunita Rao',      dob:'11 Apr 1988', gender:'F', blood:'AB+', src:'NovaCare Pharmacy',    fmt:'HL7',  time:'2:44s ago', status:'failed',   mrn:'MRN-6543', phone:'+91 97000 88901', diag:'Prescription refill', ward:'Pharmacy' },
    { id:'PT-00835', name:'Kiran Patel',     dob:'07 Jan 2001', gender:'M', blood:'B-',  src:'SunPath Labs',         fmt:'FHIR', time:'3:10s ago', status:'synced',   mrn:'MRN-5590', phone:'+91 96000 33456', diag:'CBC, LFT, KFT',      ward:'Lab' },
    { id:'PT-00834', name:'Lakshmi Iyer',    dob:'23 Sep 1964', gender:'F', blood:'O-',  src:'Genome Institute',     fmt:'HL7',  time:'3:59s ago', status:'synced',   mrn:'MRN-4402', phone:'+91 95432 77890', diag:'Genomic sequencing',  ward:'Research' },
    { id:'PT-00833', name:'Deepak Nair',     dob:'18 Jun 1978', gender:'M', blood:'A+',  src:'City General Hospital', fmt:'HL7', time:'5:12s ago', status:'synced',   mrn:'MRN-3391', phone:'+91 94500 66123', diag:'Post-op monitoring',  ward:'Surgery' },
    { id:'PT-00831', name:'Meena Krishnan',  dob:'30 Dec 1955', gender:'F', blood:'B+',  src:'Apollo Clinics',       fmt:'FHIR', time:'6:40s ago', status:'review',   mrn:'MRN-2201', phone:'+91 93400 55789', diag:'Diabetes management', ward:'Endocrine' },
    { id:'PT-00829', name:'Vijay Reddy',     dob:'05 Aug 1992', gender:'M', blood:'O+',  src:'Medlabs Diagnostics',  fmt:'HL7',  time:'8:02s ago', status:'synced',   mrn:'MRN-1188', phone:'+91 92300 44567', diag:'MRI brain (NAD)',     ward:'Radiology' },
    { id:'PT-00821', name:'Anita Joshi',     dob:'12 Feb 1980', gender:'F', blood:'A+',  src:'SunPath Labs',         fmt:'FHIR', time:'19min ago', status:'review',   mrn:'MRN-0955', phone:'+91 91200 33456', diag:'Thyroid function',    ward:'Endocrine' },
    { id:'PT-00819', name:'Suresh Kumar',    dob:'20 May 1967', gender:'M', blood:'AB-', src:'City General Hospital', fmt:'HL7', time:'22min ago', status:'synced',   mrn:'MRN-0822', phone:'+91 90100 22345', diag:'Orthopedic consult',  ward:'Ortho' },
    { id:'PT-00816', name:'Divya Singh',     dob:'03 Oct 1999', gender:'F', blood:'O+',  src:'CarePoint Clinics',    fmt:'REST', time:'28min ago', status:'synced',   mrn:'MRN-0741', phone:'+91 89000 11234', diag:'Dermatology OPD',    ward:'OPD-5' },
    { id:'PT-00812', name:'Mohan Das',       dob:'14 Jul 1948', gender:'M', blood:'B+',  src:'Apollo Clinics',       fmt:'FHIR', time:'35min ago', status:'failed',   mrn:'MRN-0630', phone:'+91 88765 00123', diag:'Cardiac catheter',   ward:'ICU-2' },
    { id:'PT-00809', name:'Rekha Pillai',    dob:'25 Mar 1973', gender:'F', blood:'A-',  src:'Sunshine Insurance',   fmt:'EDI',  time:'41min ago', status:'synced',   mrn:'MRN-0550', phone:'+91 87654 99012', diag:'Claims submission',  ward:'Billing' },
    { id:'PT-00805', name:'Anil Gupta',      dob:'09 Dec 1985', gender:'M', blood:'O-',  src:'Medlabs Diagnostics',  fmt:'HL7',  time:'48min ago', status:'synced',   mrn:'MRN-0411', phone:'+91 86543 88901', diag:'Allergy panel',      ward:'Lab' },
  ],

  // ---- PIPELINES ----
  pipelines: [
    {
      id:'PIP-001', name:'HL7 v2 → Normalized JSON', status:'running',
      src:'City General Hospital', dst:'SCDIS Data Lake',
      format:'HL7 v2.8', throughput:'4,820 msg/day',
      progress: 67,
      steps:[
        {label:'Receive MLLP message',   done:true },
        {label:'Parse HL7 segments',     done:true },
        {label:'Validate PID/OBR/OBX',  done:true },
        {label:'Transform to JSON',      active:true },
        {label:'Deduplicate check',      done:false },
        {label:'Write to data lake',     done:false },
      ],
      metrics:{ processed:'8,412', errors:'12', latency:'42ms' }
    },
    {
      id:'PIP-002', name:'FHIR R4 Batch Ingest', status:'running',
      src:'Apollo Clinics Network', dst:'SCDIS Repository',
      format:'FHIR R4', throughput:'3,210 resources/day',
      progress: 82,
      steps:[
        {label:'Fetch FHIR bundle',      done:true },
        {label:'Validate resources',     done:true },
        {label:'Map to internal schema', done:true },
        {label:'Link patient records',   done:true },
        {label:'Index observations',     active:true },
        {label:'Notify downstream',      done:false },
      ],
      metrics:{ processed:'5,890', errors:'3', latency:'118ms' }
    },
    {
      id:'PIP-003', name:'EDI X12 Claims Parse', status:'error',
      src:'NovaCare Pharmacy', dst:'Claims Adjudicator',
      format:'EDI 837P', throughput:'—',
      progress: 33,
      steps:[
        {label:'Receive SFTP file',       done:true },
        {label:'Detect ISA envelope',     done:true },
        {label:'Parse GS/ST segments',    error:true },
        {label:'Map to FHIR Claim',       done:false },
        {label:'Adjudication lookup',     done:false },
        {label:'Store & acknowledge',     done:false },
      ],
      error: 'ParseError: NM1*85 loop — invalid qualifier code "ZZ" in segment 14, line 312. Expected qualifier from set {85, PR, IL}.',
      metrics:{ processed:'1,580', errors:'312', latency:'—' }
    },
    {
      id:'PIP-004', name:'HL7 → FHIR R4 Translation', status:'running',
      src:'Medlabs Diagnostics', dst:'FHIR Repository',
      format:'HL7 v2.5 → FHIR', throughput:'2,405 msg/day',
      progress: 91,
      steps:[
        {label:'Ingest HL7 message',     done:true },
        {label:'Terminology mapping',    done:true },
        {label:'Build FHIR resources',   done:true },
        {label:'Validate FHIR output',   done:true },
        {label:'POST to FHIR server',    active:true },
        {label:'Confirm receipt',        done:false },
      ],
      metrics:{ processed:'2,394', errors:'11', latency:'28ms' }
    },
    {
      id:'PIP-005', name:'EDI 835 Remittance Parse', status:'idle',
      src:'Sunshine Insurance', dst:'Revenue Cycle',
      format:'EDI 835', throughput:'980/day',
      progress: 0,
      steps:[
        {label:'Receive AS2 transaction', done:false },
        {label:'Decode ISA/GS headers',  done:false },
        {label:'Parse CLP/SVC loops',    done:false },
        {label:'Post payments',          done:false },
        {label:'Generate EOB',           done:false },
        {label:'Reconcile accounts',     done:false },
      ],
      metrics:{ processed:'0', errors:'0', latency:'—' }
    },
    {
      id:'PIP-006', name:'SMART on FHIR Auth Flow', status:'running',
      src:'CarePoint Clinics', dst:'Patient Portal',
      format:'FHIR R4 + OAuth2', throughput:'620/day',
      progress: 55,
      steps:[
        {label:'OAuth2 authorization',   done:true },
        {label:'Token exchange',         done:true },
        {label:'Fetch patient context',  done:true },
        {label:'Load clinical data',     active:true },
        {label:'Render portal view',     done:false },
        {label:'Audit access log',       done:false },
      ],
      metrics:{ processed:'610', errors:'5', latency:'145ms' }
    },
  ],

  // ---- ALERTS ----
  alerts: [
    { id:'ALT-001', sev:'critical', title:'Pipeline Failure — EDI 837P NovaCare', msg:'Segment parse error halted claims ingestion. 312 records are pending in the queue. Manual intervention required to correct segment 14 qualifier.', time:'11 minutes ago', assigned:'Integration Team', status:'active' },
    { id:'ALT-002', sev:'warn',     title:'Source Degraded — NovaCare SFTP',      msg:'Connection latency exceeds configured threshold (8,200ms vs 500ms limit). Automatic retry queued — attempt 2 of 5. Next retry in 4 minutes.', time:'18 minutes ago', assigned:'—', status:'active' },
    { id:'ALT-003', sev:'warn',     title:'Duplicate Record Cluster Detected',     msg:'PT-00821 (Anita Joshi) and PT-00791 (Anita B. Joshi) share 95% field overlap across DOB, surname, and MRN prefix. Merge review pending.', time:'34 minutes ago', assigned:'Dr. Kavya Reddy', status:'active' },
    { id:'ALT-004', sev:'info',     title:'Genome Institute Pipeline Restored',    msg:'MLLP connection re-established after scheduled maintenance window (09:00–09:15 IST). All queued messages processed successfully.', time:'1h 22min ago', assigned:'—', status:'resolved' },
    { id:'ALT-005', sev:'info',     title:'SunPath Labs FHIR Timeout Resolved',    msg:'R4 endpoint response time normalized to 204ms (down from 8,400ms). Root cause: memory pressure on remote FHIR server — vendor notified.', time:'3h 10min ago', assigned:'—', status:'resolved' },
    { id:'ALT-006', sev:'info',     title:'Scheduled Maintenance Completed',       msg:'Certificate rotation completed for all 8 source system connections. No downtime incurred. Next rotation: 2026-10-30.', time:'5h 44min ago', assigned:'—', status:'resolved' },
  ],

  // ---- AUDIT LOG ----
  auditLog: [
    { ts:'09:44:12', event:'Record ingested',          actor:'HL7 Pipeline',      resource:'PT-00841',        outcome:'success', detail:'ADT^A08 patient update — 14 segments' },
    { ts:'09:43:46', event:'Schema validation',         actor:'FHIR Pipeline',     resource:'Observation/8842',outcome:'success', detail:'FHIR R4 resource validated against profile' },
    { ts:'09:42:51', event:'Parse error',               actor:'HL7 Pipeline',      resource:'PT-00836',        outcome:'error',   detail:'Missing PID-3 segment in ADT^A08 message' },
    { ts:'09:41:30', event:'Source health check',       actor:'System Monitor',    resource:'NovaCare SFTP',   outcome:'warn',    detail:'Latency 8200ms — threshold 500ms' },
    { ts:'09:39:05', event:'Duplicate flagged',         actor:'Dedup Engine',      resource:'PT-00821',        outcome:'warn',    detail:'95% match with PT-00791 — linked records' },
    { ts:'09:37:22', event:'Record merged',             actor:'Dr. Kavya Reddy',   resource:'PT-00809',        outcome:'success', detail:'Manual merge approved — superseded PT-00791' },
    { ts:'09:35:00', event:'Batch import',              actor:'FHIR Pipeline',     resource:'312 Observations',outcome:'success', detail:'Apollo Clinics FHIR bundle — all validated' },
    { ts:'09:30:14', event:'Token refresh',             actor:'OAuth2 Module',     resource:'CarePoint Clinics',outcome:'success',detail:'SMART on FHIR access token renewed' },
    { ts:'09:22:14', event:'Pipeline restart',          actor:'System',            resource:'Genome HL7',      outcome:'success', detail:'Auto-recovery after maintenance window' },
    { ts:'09:15:08', event:'Certificate rotation',      actor:'Admin: System',     resource:'All sources',     outcome:'success', detail:'TLS 1.3 certificates rotated — 8 sources' },
    { ts:'09:10:45', event:'Configuration change',      actor:'Dr. Kavya Reddy',   resource:'PIP-004',         outcome:'success', detail:'Updated HL7→FHIR terminology mapping v3.2' },
    { ts:'09:05:22', event:'Bulk export initiated',     actor:'Analytics Module',  resource:'12,400 records',  outcome:'success', detail:'Daily aggregate export to data warehouse' },
    { ts:'08:58:30', event:'Login',                     actor:'Dr. Kavya Reddy',   resource:'System',          outcome:'success', detail:'Session started from 192.168.1.45' },
  ],

  // ---- FIELD MAPPINGS ----
  mappings: [
    { src:'PID-3',       dst:'Patient.identifier',      type:'Direct',     status:'active' },
    { src:'PID-5',       dst:'Patient.name',            type:'Transform',  status:'active' },
    { src:'PID-7',       dst:'Patient.birthDate',       type:'Format',     status:'active' },
    { src:'PID-8',       dst:'Patient.gender',          type:'Lookup',     status:'active' },
    { src:'PID-11',      dst:'Patient.address',         type:'Transform',  status:'active' },
    { src:'OBR-4',       dst:'ServiceRequest.code',     type:'Lookup',     status:'active' },
    { src:'OBX-3',       dst:'Observation.code',        type:'Lookup',     status:'active' },
    { src:'OBX-5',       dst:'Observation.value',       type:'Transform',  status:'active' },
    { src:'OBX-6',       dst:'Observation.valueQuantity.unit', type:'Direct', status:'active' },
    { src:'OBX-14',      dst:'Observation.effectiveDateTime', type:'Format', status:'active' },
    { src:'NM1*85-2',    dst:'Practitioner.name',       type:'Transform',  status:'error' },
    { src:'NM1*85-9',    dst:'Practitioner.identifier', type:'Direct',     status:'error' },
  ],

  // ---- ANALYTICS ---- (7-day trend)
  analytics: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    hl7:    [3820, 4100, 3950, 4400, 4820, 3200, 2800],
    fhir:   [2800, 3050, 2950, 3100, 3210, 2400, 1900],
    edi:    [1500, 1700, 1600, 1800, 1892, 1200,  900],
    errors: [24,   18,   31,   15,   43,   12,    8  ],
  },
};
