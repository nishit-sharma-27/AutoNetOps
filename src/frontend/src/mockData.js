export const summaryMetrics = {
  health: 'Nominal',
  uptime: '99.98%',
  activeAlerts: 4,
  predictionRisk: 'High',
  meanTimeToRepair: '12 min',
};

export const incidentSamples = [
  {
    incidentId: 'INC-2026-001',
    deviceId: 'BTS-47-NE',
    severity: 'Critical',
    rootCause: 'Packet drop spike on eNodeB link',
    status: 'Investigating',
    lastUpdated: '1 min ago',
  },
  {
    incidentId: 'INC-2026-002',
    deviceId: 'CORE-12',
    severity: 'Major',
    rootCause: 'CPU saturation from routing storm',
    status: 'Mitigating',
    lastUpdated: '5 min ago',
  },
  {
    incidentId: 'INC-2026-003',
    deviceId: 'ROUTE-09',
    severity: 'Minor',
    rootCause: 'SNMP polling timeout',
    status: 'Resolved',
    lastUpdated: '11 min ago',
  },
];

export const workflowMessages = [
  { role: 'system', text: 'AutoNetOps monitoring initialized.' },
  { role: 'assistant', text: 'Telemetry pipeline stable, predictive agent active.' },
  { role: 'user', text: 'Show current incident summary.' },
];
