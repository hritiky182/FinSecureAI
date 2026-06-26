# Project Documentation: Fin Secure (Financial Risk, Fraud & Audit Intelligence)

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [System Overview & Navigation](#3-system-overview--navigation)
4. [User Roles & Access Control](#4-user-roles--access-control)
5. [Module-by-Module Documentation](#5-module-by-module-documentation)
6. [Dashboard & Visualizations Explanation](#6-dashboard--visualizations-explanation)
7. [Reports & Analytics Library](#7-reports--analytics-library)
8. [Alerts & Notification Center](#8-alerts--notification-center)
9. [Authentication & System Security](#9-authentication-and-system-security)
10. [Settings & User Preferences](#10-settings--user-preferences)
11. [User Journeys](#11-user-journeys)
12. [Technology Overview](#12-technology-overview)
13. [Business Benefits & Value Proposition](#13-business-benefits--value-proposition)
14. [Conclusion](#14-conclusion)
15. [Appendices (Inventory Lists & Future Opportunities)](#15-appendices)

---

## 1. Executive Summary

**Fin Secure** is a production-ready, client-side React + Vite web application built to serve as an independent financial risk, fraud, and compliance intelligence command center. The platform acts as a unified aggregation layer, ingesting data streams from banking channels, payment gateways, mobile integrations (such as M-Pesa), database transaction logs, and cybersecurity telemetry. By correlating these streams, Fin Secure presents real-time risk scores, behavioral fraud indicators, privilege escalation tracking, and compliance scoring. 

This document details the actual implemented state of the platform, including its single-page client routing, user roles, interactive charts, and natural-language AI assistant.

---

## 2. Project Overview

### What the Platform Does
Fin Secure aggregates, analyzes, and visualizes system-wide risk. It connects to multiple banking systems and databases to trace transactions, identify security breaches, flag fraudulent customer behavior, and ensure adherence to national and international compliance guidelines.

### Main Purpose
To provide executive teams (e.g., C-level officers) and operational risk analysts with a single, real-time source of truth concerning the financial, operational, and digital health of their institution.

### Problems It Solves
- **Data Silos**: Consolidates separate security, transaction, database, and reconciliation logs into one dashboard.
- **Delayed Fraud Detection**: Uses live behavioral filters and anomaly alerts to expose transaction patterns before they cause financial loss.
- **Complex Compliance Reporting**: Computes and tracks readiness levels for audits (AML, KYC, SASRA, Data Protection).
- **Vague Metrics**: Measures threat indices numerically (0-100 scale) to support quick, data-driven decisions.

### Target Users
- Executive Leaders (CEO, CFO, CISO)
- Audit & Compliance Teams (Auditors, Compliance Officers)
- Operational Security Teams (IT Managers, Risk Analysts, Operations Managers)

---

## 3. System Overview & Navigation

### Navigation Structure
The platform utilizes a modern, permanent left-hand navigation sidebar for desktop viewports, paired with an interactive top navigation header.
- **Left Sidebar**: Offers immediate access to 17 main routes, covering core modules, operations centers, utility configurations, and AI services.
- **Top Navigation Bar**: Houses global search, a live notification bell shortcut, a theme toggle (Dark/Light mode), and the **Role Switcher Dropdown**.
- **Responsive Layout**: Renders using a fluid grid system that dynamically scales from mobile viewports up to large desktop screens, maintaining clarity and alignment.

### Overall Workflow
1. User authenticates via the **Login Page**.
2. User lands on the **Executive Dashboard**, showing high-level institution metrics.
3. User navigates through individual specialized modules (e.g., Transaction Intelligence, Cybersecurity) to drill down into anomalies.
4. User queries the **AI Assistant** using natural language to extract immediate statistics.
5. User reviews active alerts, creates audit logs, or switches role-based perspectives to adjust operations.

---

## 4. User Roles & Access Control

Fin Secure implements eight user roles. Each represents a target profile for the platform. The application allows real-time role-switching through the top navigation bar to let stakeholders inspect what each department sees.

| User Role | Main Focus | Dashboard Focus | Key Permissions & Actionable Context |
| :--- | :--- | :--- | :--- |
| **CEO** | Overall Institutional Risk | Executive Dashboard | Monitors aggregated risk score, compliance posture, and high-level trends. |
| **CFO** | Reconciliation & Balances | Executive Briefing | Audits variance flags on M-Pesa, card networks, and settlement posting delays. |
| **CISO** | Cyber Threats & SOC Logs | Security Operations Center | Views brute-force attempts, DDoS origins, malware tags, and incident response times. |
| **IT Manager** | API Health & Latency | Universal Data Intelligence | Tracks sync status, network throughput, and degraded endpoint gateways. |
| **Auditor** | Privileged Logs & DB changes | Database Integrity / Users | Examines row modifications, ALTER/DELETE commands, and system change history. |
| **Compliance Officer** | Audit Findings & Policies | Compliance Monitoring | Reviews AML watchlists, KYC files, SASRA audits, and Data Protection. |
| **Risk Analyst** | Transaction Anomaly Scores | Transaction Intelligence | Filters risk indices, reviews transaction velocities, and flags accounts. |
| **Operations Manager** | Incident Workflow / Assignees | Incident Management | Assigns open incident cases, modifies severities, and posts timeline comments. |

---

## 5. Module-by-Module Documentation

### Module 1: Universal Data Intelligence Engine
- **Purpose**: Tracks connected upstream and downstream systems feeding telemetry into the platform.
- **Screens**: `/data-intelligence`
- **Features**: 
  - Dynamic status badges (Operational, Degraded, Critical).
  - Telemetry grid tracking Sync Health %, Throughput, Last Sync time, and Threat level.
  - Interactive health indicator bars.
- **User Actions**: View health stats, inspect pipeline latency details (currently reported at 412 ms).
- **Benefits**: Ensures data ingestion networks are active, avoiding blind spots in risk calculation.

### Module 2: Transaction Intelligence Engine
- **Purpose**: Advanced transaction inspection tool showing all logs with dynamic filters.
- **Screens**: `/transactions`
- **Features**:
  - Live search bar (by ID or Customer).
  - Status filter dropdown (All, Approved, Pending, Flagged, Declined).
  - Branch filter dropdown and Risk Level filter dropdown (High, Medium, Low).
  - Detailed Transaction Slider (Sheet) exposing device details, beneficiary account dates, and velocity.
- **User Actions**: Search transactions, filter parameters, open detail drawer, trigger CSV exports, mark as reviewed, or initiate investigation cases.
- **Benefits**: Gives analysts immediate granularity on suspicious transfers.

### Module 3: AI Fraud Detection Engine
- **Purpose**: Exposes behavioral signals indicating fraud patterns across channels and accounts.
- **Screens**: `/fraud`
- **Features**:
  - Six statistical indicator cards (Split Txns, Rapid Cash Movement, Dormant Account Activity, Account Takeover, Velocity Spikes, Device anomalies).
  - Fraud trend area chart (Detected vs Blocked) over a 12-month period.
  - Activity Heatmap showing events distributed by hour and weekday.
  - Active investigations case list (e.g., CASE-4000).
- **User Actions**: Track hourly frequency clusters, review case risk levels, and inspect active investigation lists.
- **Benefits**: Visualizes when and where fraudulent transactions peak to optimize defense measures.

### Module 4: Integration Security Monitor
- **Purpose**: Continuously inspects external API channels, mobile networks (M-Pesa), and card processors.
- **Screens**: `/integrations`
- **Features**:
  - Individual cards detailing threat ratings (Low, Medium, High).
  - Key statistics: Security Score, API Health %, and Failed Call count.
  - Real-time API Activity table logging Call ID, Endpoint, Latency, Status code, and timestamp.
- **User Actions**: Inspect endpoint failures, monitor API latencies, and flag external gateways.
- **Benefits**: Prevents data leaks or service disruptions originating from external partner connections.

### Module 5: Privileged User Monitoring
- **Purpose**: Audits the actions of employees and system users holding elevated administrative permissions.
- **Screens**: `/users`
- **Features**:
  - Admin login directory showing names, roles, last login timestamps, locations, and device profiles.
  - Chronological activity timeline (24 hours) logging sensitive operations (e.g., schema changes, admin grants).
  - Privilege Escalation alert panel highlighting out-of-schedule admin elevation.
- **User Actions**: Review active admin sessions, verify timeline actions, and track unauthorized privileges.
- **Benefits**: Mitigates insider threats and helps verify that all configuration changes are authorized.

### Module 6: Database Integrity Monitoring
- **Purpose**: Audits schema modifications, configuration drifts, and low-level database operations.
- **Screens**: `/database`
- **Features**:
  - Key metrics: Total Queries, Errors, Table alterations, Schema drift, and Integrity Score (98.6%).
  - 24-hour Query Volume line chart comparing execution volume against error spikes.
  - Database Change History grid highlighting `ALTER`, `DELETE`, and `INSERT` query logs.
- **User Actions**: Monitor execution errors, inspect deleted record counts, and audit modified tables.
- **Benefits**: Assures the storage layer has not been compromised or tampered with.

### Module 7: Cybersecurity Monitoring
- **Purpose**: Integrates the Security Operations Center (SOC) live stream and threat telemetry.
- **Screens**: `/cybersecurity`
- **Features**:
  - Core metrics: Blocked IPs, Attack rate, Open ports, Firewall blocks, DDoS indicators.
  - Interactive SVG Threat Origin Map visualizing geo-distributed attack vectors with pulsing signals.
  - SOC live incident stream showing recent threat entries.
  - 14-day Attack Trend line chart.
- **User Actions**: Trace active attack source counts and monitor firewall blockage ratios.
- **Benefits**: Protects the platform from server attacks, access attempts, and system breaches.

### Module 8: Reconciliation Intelligence
- **Purpose**: Monitors funds movement variances, posting failures, and settlement delays.
- **Screens**: `/reconciliation`
- **Features**:
  - Discrepancy stats cards (e.g., Unreconciled amount, Processing delays).
  - Settlement Table comparing Expected vs Actual deposits across M-Pesa, card networks, and local clearing.
  - Variance highlighting (green for zero diff, red for negative variance).
- **User Actions**: Identify reconciliation failures and locate posting delays.
- **Benefits**: Stops financial leakage and ensures bank ledger balances match gateway cash.

### Module 9: Compliance Monitoring
- **Purpose**: Evaluates readiness against international and national policies (AML, KYC, SASRA, etc.).
- **Screens**: `/compliance`
- **Features**:
  - Compliance Score cards showing readiness percentages (e.g., SASRA 94%, AML 91%).
  - Trailing 12-month compliance score progress chart.
  - Audit findings feed showing specific policy breaches (e.g., missing KYC files).
- **User Actions**: Track remediation progress and monitor historical regulatory trends.
- **Benefits**: Avoids costly regulatory penalties and audits.

### Module 10: AI Risk Rating Framework
- **Purpose**: Summarizes institution severity distribution according to Basel, COBIT, ISO 27001, and PCI-DSS standards.
- **Screens**: `/risk-rating`
- **Features**:
  - SLA configuration summary cards (Critical, High, Medium, Low response times).
  - Dynamic 5x5 Risk Matrix mapping Likelihood against Impact.
- **User Actions**: Inspect open incident counts by severity class and analyze matrix risk zones.
- **Benefits**: Provides structured standards for prioritizing system patches and audit corrections.

### Module 11: Real-Time Alerts
- **Purpose**: Configures and manages active notification triggers across channels (SMS, Email, Push).
- **Screens**: `/alerts`
- **Features**:
  - Filter system by severity and source module.
  - Multi-action alert cards with quick inline options (Mark read, Assign, Investigate).
- **User Actions**: Filter notifications, assign unresolved alerts, and open investigations.
- **Benefits**: Ensures critical operational failures are immediately assigned to the correct staff member.

### Module 12: Incident Management
- **Purpose**: Incident ticketing and forensic timeline logging.
- **Screens**: `/incidents`
- **Features**:
  - Live incident directory table detailing ticket severities, assigned engineers, and durations.
  - Incident slider sheet exposing historical investigation timelines, evidence files (.pcap, auth logs), and comments.
- **User Actions**: Open case sheets, add comments, assign owners, and inspect forensics.
- **Benefits**: Streamlines issue resolution and provides a clean history for post-incident reviews.

### Module 13: Reports Library
- **Purpose**: Archive of board-ready briefings and automated logs.
- **Screens**: `/reports`
- **Features**:
  - Six pre-built template download selectors (Executive, Fraud, Security, Compliance, Audit, Reconciliation).
  - Detection throughput preview charts.
- **User Actions**: Download CSV data tables (Excel) or initiate document print layouts (PDF).
- **Benefits**: Reduces manual reporting time for audits and board meetings.

### Module 14: AI Assistant (Copilot)
- **Purpose**: Natural-language query interface returning structured, real-time analytics.
- **Screens**: `/ai-assistant`
- **Features**:
  - Interactive chat panel.
  - Four pre-configured click-to-query suggestion tags.
  - Custom text input bar with prompt processing.
- **User Actions**: Submit questions about suspicious transactions, vendor audits, API vulnerabilities, or branch risks.
- **Benefits**: Offers non-technical users immediate, conversational access to database statistics.

---

## 6. Dashboard & Visualizations Explanation

Fin Secure features visual reporting components built on top of Recharts:
1. **Overall Risk Posture Gauge**: A circular gauge showing the institutional threat level (out of 100), broken down into Low (0-29), Moderate (30-59), Elevated (60-79), and Critical (80-100) ranges.
2. **Institution Risk Breakdown Radar**: A modern, multi-dimensional radar chart mapping risk indexes across six key factors: Financial, Operational, Cyber, Compliance, Fraud, and Vendor.
3. **Transaction Volume Area Chart**: A 14-day dual-area graph comparing total transaction volume against flagged transactions to highlight sudden risk spikes.
4. **Fraud Detected vs Blocked Bar Chart**: A monthly double-bar graph comparing total discovered fraud value against successfully blocked amounts.
5. **Risk Score Trend Line**: A rolling 30-day index showing institutional risk direction over time.

---

## 7. Reports & Analytics Library

The platform includes a dedicated reports page with access to the following reports:
- **Executive Risk Report**: Board-ready monthly briefing on institutional risk posture.
- **Fraud Investigation Report**: Open cases, blocked transactions, and pattern analysis.
- **Security Operations Report**: SOC activity, threat trends, and incident throughput.
- **Compliance Findings Report**: AML, KYC, and data-protection findings.
- **Audit Trail Export**: Privileged user activity and configuration changes.
- **Reconciliation Report**: Settlement variances and posting discrepancies.

### Export Options
- **Excel Export**: Converts the underlying data array into a standard, downloadable CSV spreadsheet file with appropriate headers and quotes.
- **PDF & Print**: Opens the browser's native print layout window, allowing the user to print the page or save it as a PDF document.

---

## 8. Alerts & Notification Center

Alerts are categorized by severity levels (Critical, High, Medium, Low) and cover five main operational areas:
- **Cybersecurity**: Threat detection and unauthorized access attempts.
- **Database**: Schema shifts and unexpected file deletions.
- **Fraud**: Unusual transaction frequencies and dormant account movements.
- **Integrations**: Failed partner API calls and connection timeouts.
- **Users**: Privilege escalations and out-of-schedule administrative log-ins.

Users can mark alerts as read, assign ownership, or transition directly into the investigation workspace.

---

## 9. Authentication and Security

### Access Protection
- **Session Protection**: All routes other than `/login` are wrapped inside a state-controlled `ProtectedRoute` component. Unauthenticated users are redirected to the Login page.
- **Direct Login Flow**: Authenticates immediately upon submission of the credentials form, bypassing 2FA steps for direct entry to `/dashboard`.
- **Role-Based Simulation**: The Top Navigation dropdown lets users swap active roles dynamically. This updates the local store to filter permissions and show appropriate information.

---

## 10. Settings & User Preferences

The `/settings` workspace provides user configurations:
1. **Profile Card**: Edit display name, work email address, and professional title.
2. **Appearance Card**: 
   - **Dark Mode Switch**: Toggles the dark theme class on the document element (synced with Zustand).
   - **Compact Density Switch**: Controls interface padding density.
3. **Notification Preferences**: Toggles for Critical fraud alerts, Security incidents, Compliance findings, and Weekly digests.
4. **Security Preferences**: Single Sign-On (SSO) switch and API key rotation trigger button.

---

## 11. User Journeys

### User Journey A: Executive Fraud Review (CFO / CEO)
```
[Login] 
   │
   ▼
[Dashboard] ──► (Notices a spike in the Risk Breakdown radar for "Fraud")
   │
   ▼
[Fraud Detection] ──► (Reviews "Rapid Cash Movement" statistics and the Heatmap)
   │
   ▼
[Transactions] ──► (Filters by "Flagged" status and "High" risk to inspect beneficiary details)
   │
   ▼
[AI Assistant] ──► (Queries: "Show all suspicious transactions above KES 500,000")
   │
   ▼
[Reports] ──► (Downloads the Fraud Investigation Report as Excel/CSV)
```

### User Journey B: IT Security Incident Triage (CISO / SOC Analyst)
```
[Login]
   │
   ▼
[Dashboard] ──► (Notices the "Cyber" risk index is elevated)
   │
   ▼
[Cybersecurity] ──► (Audits the pulsing attack sources on the Geo Map)
   │
   ▼
[Incidents] ──► (Opens the active incident ticket, e.g., DDoS alert)
   │
   ▼
[Forensic Audit] ──► (Reviews timeline actions, inspects packet captures, and comments)
   │
   ▼
[Alerts] ──► (Marks the related alerts as read and assigns ownership)
```

---

## 12. Technology Overview

To keep this simple:
- **Core Engine**: Built using **React**, a popular user interface library, and **Vite**, a modern development server that makes the application load quickly.
- **Styling**: Uses **Tailwind CSS v4**, which styles the platform using utility classes.
- **Single Page Routing**: Managed by **React Router DOM**. This allows page transitions to happen instantly in the browser without reloading the webpage.
- **State Management**: Managed using **Zustand**, which securely stores the logged-in user state, dark mode preferences, and active role.
- **Charts & Graphs**: Powered by **Recharts**, which renders responsive SVG graphs.
- **Icons**: Provided by **Lucide React**.

---

## 13. Business Value & Benefits

1. **Reduced Response Time**: Aggregated dashboards allow operations teams to identify and assign security and financial events immediately.
2. **Regulatory Protection**: Regular monitoring of compliance scores ensures the institution maintains audit compliance, protecting it from regulatory penalties.
3. **Loss Prevention**: Identifying anomalous transactions and reconciliation discrepancies helps stop financial leaks.
4. **Simplified Reporting**: The AI assistant and pre-built reports allow non-technical board members to get answers without waiting for database query reports.

---

## 14. Conclusion

Fin Secure is a functional risk and audit dashboard. By migrating away from SSR infrastructure and refining the client-side single-page routing, it provides a stable interface ready to be deployed on static cloud platforms like Vercel. 

---

## 15. Appendices

### A. Complete Feature Inventory
- Single sign-on authentication simulator.
- Global site theme switcher (Dark / Light mode).
- Interactive, multi-dimensional risk radar chart.
- Dial-based risk score posture gauge.
- Searchable transaction browser with detail sheets.
- Time-based heatmaps for security event analysis.
- Live attack origin map using SVG markers.
- Multi-channel export utilities supporting PDF print layouts and CSV spreadsheet file creation.
- Natural-language AI assistant with preset templates.

### B. List of All Routes/Pages
- `/login` — Login Screen
- `/dashboard` — Executive Risk Dashboard
- `/executive` — Executive briefing summary
- `/data-intelligence` — Telemetry stats
- `/transactions` — Transaction grid & filter sheet
- `/fraud` — Anomaly cards & heatmaps
- `/integrations` — API monitor table
- `/users` — Privileged user timeline & directory
- `/database` — Query errors & change history table
- `/cybersecurity` — SOC map & incident list
- `/reconciliation` — Balance comparisons
- `/compliance` — Policy readiness tracker
- `/risk-rating` — Matrix risk zone mapper
- `/incidents` — Case ticketing & forensic sheet
- `/alerts` — Active notification triggers
- `/reports` — Briefing templates download grid
- `/ai-assistant` — Conversational AI panel
- `/settings` — Profile, UI, and SSO toggle controls
- `/notifications` — Categorized category feeds

### C. List of Implemented User Roles
- `CEO` (Chief Executive Officer)
- `CFO` (Chief Financial Officer)
- `CISO` (Chief Information Security Officer)
- `IT Manager`
- `Auditor`
- `Compliance Officer`
- `Risk Analyst`
- `Operations Manager`

### D. Future Enhancement Opportunities
- **Active Backend API**: Replace the current client-side state store (`src/mock/data.ts`) with a live backend database and API server.
- **Advanced Export Customization**: Add server-side PDF generation to export formatted PDF documents.
- **Real-Time WebSockets**: Connect alerts to a live WebSocket server to update indicators in real-time.
- **Advanced AI NLP**: Integrate a real Large Language Model (LLM) API endpoint to support complex custom queries.
