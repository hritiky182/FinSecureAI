// Centralized mock data for the prototype. No real institutions referenced.

export type Severity = "critical" | "high" | "medium" | "low";
export type Role =
  | "CEO"
  | "CFO"
  | "CISO"
  | "IT Manager"
  | "Auditor"
  | "Compliance Officer"
  | "Risk Analyst"
  | "Operations Manager";

export const ROLES: Role[] = [
  "CEO", "CFO", "CISO", "IT Manager", "Auditor",
  "Compliance Officer", "Risk Analyst", "Operations Manager",
];

const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const kpis = [
  { id: "risk", label: "Overall Risk Score", value: 72, suffix: "/100", change: -3.2, trend: "down", tone: "warning" },
  { id: "fraud", label: "Fraud Score", value: 18, suffix: "/100", change: -1.4, trend: "down", tone: "success" },
  { id: "cyber", label: "Cyber Health", value: 86, suffix: "/100", change: 2.1, trend: "up", tone: "success" },
  { id: "compliance", label: "Compliance Score", value: 94, suffix: "/100", change: 0.6, trend: "up", tone: "success" },
  { id: "vendor", label: "Vendor Trust", value: 78, suffix: "/100", change: -0.8, trend: "down", tone: "info" },
  { id: "uptime", label: "System Availability", value: 99.97, suffix: "%", change: 0.02, trend: "up", tone: "success" },
  { id: "txn", label: "Transaction Success", value: 99.4, suffix: "%", change: -0.1, trend: "down", tone: "info" },
  { id: "suspicious", label: "Suspicious Activities", value: 142, suffix: "", change: 12.3, trend: "up", tone: "destructive" },
] as const;

export const sparkData = (seed: number, n = 24) => {
  const r = rand(seed);
  return Array.from({ length: n }, (_, i) => ({ x: i, y: Math.round(40 + r() * 60) }));
};

export const txnVolume = Array.from({ length: 14 }, (_, i) => {
  const r = rand(100 + i);
  return {
    day: `D${i + 1}`,
    volume: Math.round(120000 + r() * 80000),
    flagged: Math.round(500 + r() * 2500),
  };
});

export const fraudTrend = Array.from({ length: 12 }, (_, i) => {
  const r = rand(200 + i);
  return {
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    detected: Math.round(20 + r() * 80),
    blocked: Math.round(15 + r() * 70),
  };
});

export const riskTrend = Array.from({ length: 30 }, (_, i) => {
  const r = rand(300 + i);
  return { day: i + 1, score: Math.round(55 + r() * 30) };
});

export const riskBreakdown = [
  { name: "Financial", value: 68, fill: "var(--chart-1)" },
  { name: "Operational", value: 52, fill: "var(--chart-2)" },
  { name: "Cyber", value: 74, fill: "var(--chart-3)" },
  { name: "Compliance", value: 31, fill: "var(--chart-4)" },
  { name: "Fraud", value: 45, fill: "var(--chart-5)" },
  { name: "Vendor", value: 38, fill: "var(--chart-1)" },
];

export const integrations = [
  { name: "Core Banking Platform", status: "Operational", lastSync: "2 min ago", health: 98, throughput: "12.4k tps", threat: "low" },
  { name: "Payment Gateway", status: "Operational", lastSync: "12 sec ago", health: 95, throughput: "8.7k tps", threat: "low" },
  { name: "Primary Database Cluster", status: "Operational", lastSync: "1 min ago", health: 99, throughput: "21.3k qps", threat: "low" },
  { name: "API Gateway", status: "Degraded", lastSync: "30 sec ago", health: 81, throughput: "5.1k rps", threat: "medium" },
  { name: "Mobile Wallet Service", status: "Operational", lastSync: "5 min ago", health: 92, throughput: "3.6k tps", threat: "low" },
  { name: "National Financial Switch", status: "Operational", lastSync: "1 min ago", health: 96, throughput: "9.2k tps", threat: "low" },
  { name: "Enterprise Message Queue", status: "Operational", lastSync: "20 sec ago", health: 97, throughput: "44k mps", threat: "low" },
  { name: "ATM Network Gateway", status: "Operational", lastSync: "3 min ago", health: 90, throughput: "1.8k tps", threat: "medium" },
];

const channels = ["Mobile", "Web", "ATM", "Branch", "USSD", "POS"];
const types = ["Transfer", "Withdrawal", "Deposit", "Bill Payment", "Card Purchase"];
const statuses = ["Approved", "Pending", "Flagged", "Declined"];
const branches = ["Central HQ", "North Plaza", "East Bay", "West Hills", "Southgate", "Harbor Point"];
const firstNames = ["Amara","Liam","Noah","Sofia","Aiden","Zara","Kenji","Priya","Mateo","Ada","Yara","Idris","Lina","Tariq","Sade","Mei"];
const lastNames = ["Okafor","Bennett","Vasquez","Chen","Adeyemi","Patel","Ibrahim","Nakamura","Silva","Mansour","Lindgren","Diallo","Park"];

export const transactions = Array.from({ length: 60 }, (_, i) => {
  const r = rand(500 + i);
  const amount = Math.round((50 + r() * 25000) * 100) / 100;
  const risk = Math.round(r() * 100);
  return {
    id: `TXN-${(1000000 + i).toString()}`,
    customer: `${firstNames[Math.floor(r() * firstNames.length)]} ${lastNames[Math.floor(r() * lastNames.length)]}`,
    type: types[Math.floor(r() * types.length)],
    channel: channels[Math.floor(r() * channels.length)],
    branch: branches[Math.floor(r() * branches.length)],
    amount,
    risk,
    status: risk > 80 ? "Flagged" : risk > 60 ? "Pending" : statuses[Math.floor(r() * 3)],
    time: `2026-06-${String(10 + (i % 16)).padStart(2, "0")} ${String((i * 7) % 24).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
  };
});

export const fraudIndicators = [
  { name: "Ghost Accounts", count: 14, score: 82, trend: "up" },
  { name: "Duplicate Accounts", count: 38, score: 64, trend: "down" },
  { name: "Dormant Account Activity", count: 7, score: 71, trend: "up" },
  { name: "Split Transactions", count: 22, score: 58, trend: "up" },
  { name: "Insider Activity", count: 3, score: 91, trend: "up" },
  { name: "Rapid Cash Movement", count: 11, score: 76, trend: "down" },
];

export const fraudHeatmap = Array.from({ length: 7 * 24 }, (_, i) => {
  const r = rand(600 + i);
  return { day: Math.floor(i / 24), hour: i % 24, value: Math.round(r() * 100) };
});

export const privilegedUsers = Array.from({ length: 18 }, (_, i) => {
  const r = rand(700 + i);
  const roles = ["DB Admin", "System Admin", "Security Engineer", "Auditor", "Branch Manager"];
  const risk = Math.round(r() * 100);
  return {
    id: `USR-${2000 + i}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`,
    role: roles[i % roles.length],
    lastLogin: `${Math.floor(r() * 24)}h ago`,
    location: ["HQ Datacenter","Remote VPN","North Plaza","East Bay","Cloud Console"][i % 5],
    device: ["MacBook Pro","Windows Workstation","Linux Terminal","iPad"][i % 4],
    risk,
    riskLevel: risk > 75 ? "high" : risk > 50 ? "medium" : "low",
  };
});

export const databaseStats = [
  { label: "Tables Monitored", value: 1284, change: "+12" },
  { label: "Schema Alterations (24h)", value: 7, change: "-3" },
  { label: "Deleted Records (24h)", value: 218, change: "+44" },
  { label: "Config Changes (24h)", value: 4, change: "0" },
  { label: "Integrity Score", value: "98.6%", change: "+0.2%" },
];

export const dbChanges = Array.from({ length: 10 }, (_, i) => ({
  id: `CHG-${300 + i}`,
  table: ["customers","accounts","transactions","audit_log","loans","cards"][i % 6],
  action: ["UPDATE","DELETE","ALTER","INSERT"][i % 4],
  user: privilegedUsers[i % privilegedUsers.length].name,
  time: `${Math.floor((i + 1) * 1.7)}h ago`,
  rows: Math.floor((i + 1) * 13),
}));

export const securityWidgets = [
  { name: "Brute Force Attempts", value: 142, severity: "high" as Severity },
  { name: "Malware Detections", value: 6, severity: "medium" as Severity },
  { name: "Suspicious IPs", value: 87, severity: "high" as Severity },
  { name: "Unauthorized Devices", value: 4, severity: "medium" as Severity },
  { name: "Data Exfiltration Alerts", value: 2, severity: "critical" as Severity },
];

export const incidents = Array.from({ length: 14 }, (_, i) => {
  const r = rand(800 + i);
  const sev: Severity = (["critical","high","medium","low"] as Severity[])[i % 4];
  return {
    id: `INC-${5000 + i}`,
    title: [
      "Unauthorized admin access attempt",
      "Anomalous database query volume",
      "Privileged escalation on payment gateway",
      "Suspicious outbound traffic to unknown IP",
      "Multiple failed MFA challenges",
      "Configuration drift on core node",
      "API abuse from unverified client",
    ][i % 7],
    module: ["Cybersecurity","Database","Fraud","Integrations","Users"][i % 5],
    severity: sev,
    status: ["Open","Investigating","Contained","Resolved"][i % 4],
    assignee: privilegedUsers[i % privilegedUsers.length].name,
    opened: `${Math.floor(r() * 48)}h ago`,
  };
});

export const alerts = incidents.slice(0, 10).map((inc, i) => ({
  ...inc,
  read: i > 5,
}));

export const reconciliation = [
  { source: "Operating Accounts", expected: 12_450_320, actual: 12_448_180, diff: -2140, status: "warning" },
  { source: "Mobile Wallet Settlements", expected: 3_201_500, actual: 3_201_500, diff: 0, status: "ok" },
  { source: "Card Settlements", expected: 8_904_220, actual: 8_905_010, diff: 790, status: "warning" },
  { source: "Payment Switch", expected: 5_730_910, actual: 5_730_910, diff: 0, status: "ok" },
  { source: "Interbank Transfers", expected: 18_220_000, actual: 18_215_400, diff: -4600, status: "warning" },
];

export const reconMetrics = [
  { label: "Missing Funds", value: "$6,950", tone: "destructive" },
  { label: "Duplicate Transactions", value: 23, tone: "warning" },
  { label: "Settlement Delays", value: 7, tone: "warning" },
  { label: "Posting Failures", value: 12, tone: "destructive" },
];

export const complianceModules = [
  { name: "AML", score: 92, findings: 4, trend: "up" },
  { name: "KYC", score: 88, findings: 7, trend: "down" },
  { name: "Data Protection", score: 95, findings: 2, trend: "up" },
  { name: "Internal Policies", score: 81, findings: 12, trend: "down" },
];

export const complianceTimeline = Array.from({ length: 12 }, (_, i) => {
  const r = rand(900 + i);
  return {
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    score: Math.round(80 + r() * 18),
  };
});

export const notifications = [
  { id: 1, category: "Fraud", title: "Possible ghost account detected", time: "2m ago", severity: "high" as Severity },
  { id: 2, category: "Security", title: "Brute force attempt on admin portal", time: "8m ago", severity: "critical" as Severity },
  { id: 3, category: "Compliance", title: "KYC document missing for 4 accounts", time: "32m ago", severity: "medium" as Severity },
  { id: 4, category: "System Alerts", title: "API Gateway latency above threshold", time: "1h ago", severity: "medium" as Severity },
  { id: 5, category: "Fraud", title: "Rapid cash movement flagged", time: "2h ago", severity: "high" as Severity },
  { id: 6, category: "Security", title: "New unauthorized device on network", time: "3h ago", severity: "medium" as Severity },
];

export const aiSuggestions = [
  "Show all suspicious transactions above KES 500,000.",
  "Show transactions performed by vendor accounts.",
  "Which branch has highest fraud risk?",
  "Which API integrations are most vulnerable?",
];

export const aiReplies: Record<string, string> = {
  default:
    "Based on current monitoring data, I've identified 142 suspicious activities in the last 24 hours. The highest-risk pattern is rapid cash movement across 11 dormant accounts (risk score 76). I recommend prioritizing investigation INC-5003.",
  branch:
    "Central HQ shows the highest fraud risk score this quarter at 74/100, driven primarily by insider activity indicators and split transactions. North Plaza follows at 61/100.",
  integrations:
    "The API Gateway is currently degraded with a security score of 81/100 and elevated failed-call volume. Mobile Wallet Service and ATM Network Gateway are also exhibiting high volume of token misuse warnings. I recommend auditing the API gateway policies.",
  privileged:
    "In the last 24 hours, 18 privileged users performed 412 sensitive operations. 3 actions are flagged for review: DB schema alteration by USR-2004, after-hours admin login from a vendor account, and a configuration change on the core node.",
  suspicious:
    "Retrieved 12 suspicious transactions above KES 500,000 today. The highest-valued transaction was a KES 850,000 transfer from a dormant account at East Bay branch.",
  vendor:
    "Found 5 active vendor accounts. Vendor user 'vendor-support-dev' performed 4 schema updates on the 'transactions' table after hours (02:14 AM). Log integrity monitoring flagged this action as high risk.",
};
