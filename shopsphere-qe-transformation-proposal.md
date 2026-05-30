# QE Transformation Proposal
## ShopSphere Retail — Omnichannel Quality Engineering Uplift

> **Note on commitments:** All timelines, durations, milestones and quantitative targets in this document are intentionally left as placeholders (TBD). They will be finalised after stakeholder alignment, baseline measurement and pilot outcomes. The proposal commits to direction and approach, not to dates at this stage. It is assumed that ShopSphere is willing to consider the best-in-class solution even as it increases infrastructure and delivery cost for short duration.

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Transformation Vision](#2-transformation-vision)
3. [Phased Transformation Roadmap](#3-phased-transformation-roadmap)
   - [Phase 1: Environment Foundation](#phase-1-environment-foundation)
   - [Phase 2: Functional Testing Transformation](#phase-2-functional-testing-transformation)
   - [Phase 3: Non-Functional Testing](#phase-3-non-functional-testing)
4. [Organisational Model](#4-organisational-model)
5. [RAID Log](#5-raid-log)
6. [Investment Required](#6-investment-required)
7. [Appendix](#7-appendix)

---

## 1. Executive Summary

### 1.1 The Cost of Today's Quality Gaps

ShopSphere's current quality engineering state is creating compounding business risk across three dimensions:

**Delivery Velocity**
- Manual regression cycles consume 8–9 days per release, directly blocking feature delivery
- Environment contention across 15 squads sharing 2 staging environments causes chronic delays
- Inconsistent automation framework standards mean automated tests carry a future maintenance cost

**Product Stability**
- Less than 30% unit test coverage means defects surface late — in staging or production
- Frequent integration failures across payment, delivery and CRM logic erode customer trust
- No performance or resilience validation means flash sales are high-risk, high-stakes gambles

**Business Risk**
- Absence of load or spike testing exposes ShopSphere to severe disruption during peak revenue events
- No structured security testing leaves the platform vulnerable to exploits across all regions
- No failover validation across SEA, US and EU regions means a single data centre incident can take large portions of the platform offline

### 1.2 The Cost of Inaction — Amplified by New Expansion

ShopSphere is actively expanding into the Philippines and other SEA markets. Every pain point described above does not stay constant — it **compounds with scale.**

| Pain Point Today | Impact at SEA Scale |
|---|---|
| 8–9 day manual regression for 15 squads | Regression overhead grows as squad and surface area expand |
| 2 environments for 15 teams | Paralysis intensifies as team count grows |
| No load testing for flash sales | Flash sale disruption in a new market |
| No mobile NFR testing | Poor experience on budget mobile devices common in SEA |
| No multi-region failover validation | Significant SEA-region service disruption during an incident |

**The cost of inaction is not staying still — it is accelerating backwards while competitors move forward.**

### 1.3 The Transformation Imperative

This proposal outlines a three-phase QE transformation that addresses the root causes — not just the symptoms — of ShopSphere's quality challenges. The transformation is:

- **Strategic:** Changing ways of working, ownership and culture — not just adding tools
- **Sequenced:** Each phase unlocks the next, delivering value incrementally
- **Measurable:** Clear leading and lagging indicators at every phase (numeric targets to be set post-baselining)
- **Sustainable:** Enabled by a Centre of Excellence

---

## 2. Transformation Vision

### 2.1 Target State

By the end of this transformation, ShopSphere will operate as follows:

- Every squad has **on-demand, isolated, ephemeral integration environments** provisioned by pipeline — not by humans
- **Test Ownership** clearly defined — Developers own unit and contract tests; QEs own E2E automation; Integration ownership is clearly defined per squad structure
- A **standardised CI/CD quality gate pipeline** enforces: static analysis → unit tests → contract tests → integration tests → E2E tests → NFR validation
- **Performance, spike and soak tests** run before major releases and flash sales, with defined pass/fail thresholds (thresholds TBD)
- **Chaos engineering** validates multi-region failover, database resilience and service degradation behaviour
- A **Quality Centre of Excellence** enables all squads through shared standards, tooling, coaching and metrics

### 2.2 Success Metrics

#### Lagging Indicators — The Ultimate Proof
| Metric | Current | Target |
|---|---|---|
| Production defect rate | Untracked baseline | TBD post-baselining |
| Flash sale incident rate | Unvalidated | TBD |
| Customer-reported quality issues | Untracked | TBD |

#### Leading Indicators by Phase

| Phase | Leading Indicator | Current | Target |
|---|---|---|---|
| Phase 1 | Environment provisioning wait time | Hours to days | Automated; latency target TBD |
| Phase 1 | Environment-related QE delays | Frequent | Materially reduced (target TBD) |
| Phase 2 | Unit test coverage on new code | < 30% | Threshold TBD by CoE / code review DoD |
| Phase 2 | Regression cycle duration | 8–9 days | Materially reduced (target TBD) |
| Phase 2 | Automated E2E coverage of critical journeys | Low | TBD |
| Phase 3 | Performance bottlenecks caught pre-production | None | Major releases load tested (coverage target TBD) |
| Phase 3 | Security vulnerabilities caught in pipeline | None | SAST + DAST integrated in CI/CD |

### 2.3 Scope of Quality Coverage (Omnichannel)

This transformation explicitly addresses ShopSphere's omnichannel platform footprint.

**In scope:**
- **Web channel** (React)
- **Mobile channel** (React Native — iOS and Android)
- **In-store pickup (BOPIS)** flows that share backend services with web/mobile (order orchestration, inventory check, fulfilment status)
- **Flash sale and loyalty/rewards** workflows
- **3PL and warehouse automation** integration touchpoints — testing the ShopSphere side of the integration boundary
- **Payment gateway** integration
- **ERP and CRM** integration

**Approach for external systems** — Payment gateway, CRM, ERP, and 3PL/warehouse automation systems will be **virtualised** in pre-production environments (via service virtualisation tooling). Real-call validation is reserved for pre-release integration validation only. See the Mocking vs Real Calls framework in the Appendix.

**Explicitly out of scope (this transformation):**
- In-store POS hardware and firmware testing
- ERP and CRM internal logic and configuration testing — owned by the respective platform/vendor teams
- 3PL and warehouse provider internal systems — provider-owned
- The ShopSphere-side integration with all of the above remains in scope (see "In scope" above)

---

## 3. Phased Transformation Roadmap

The three phases are deliberately sequenced. **Phase 1 is the foundation** — without stable, on-demand environments, automation investments in Phase 2 and 3 cannot deliver their full value. Each phase builds on the previous.

```
Phase 1: Environment Foundation       [Duration TBD]
         ↓ unlocks
Phase 2: Functional Testing           [Duration TBD]
         ↓ unlocks
Phase 3: Non-Functional Testing       [Duration TBD]
```

Phase start dates, durations and overlap windows are intentionally not committed in this document. See Appendix 7.5.

---

### Phase 1: Environment Foundation

#### Goal
Eliminate environment contention, state pollution and manual provisioning as blockers to quality engineering across all squads.

#### Problem Being Solved
With 15 squads sharing 2 staging environments, ShopSphere experiences:
- Deployment collisions and overlapping test data
- Unavailability of environment and Polluted environment state causing unreproducible bugs
- QE delays due to environment locking and downtime

#### Key Initiatives

**1.1 Integration Environment Setup**
- Each squad has an integrated dev environment to test their code changes. This is further discussed in 1.2.
- An always available QA environment is set up where artifacts are automatically promoted to after a successful verification in integration environment
- A staging/ UAT environment is available where artifacts are promoted to one-click manual/ automated approach post QA verification. The environment is configured to call real 3rd party integration.
- A performance test environment is available to run performance tests on demand. This environment must have configuration to route requests to 3rd party real or mock integration.

**1.2 Ephemeral Environment Provisioning**
- Each squad gets on-demand, isolated environments provisioned automatically by the CI/CD pipeline
- Environments are created afresh post unit and contract test passage and can be destroyed as needed
- Built on AWS EKS with Kubernetes namespace isolation per squad/branch
- Environment provisioning triggered by GitLab CI pipeline — zero human intervention required
- If provisioning environment for each team is not possible, then no. of environments need to be increased to improve the ratio of environment per team

**1.3 Service Virtualisation for External Dependencies**
- External systems — **payment gateways, CRM, ERP, and 3PL/warehouse automation APIs** — cannot be spun up per ephemeral environment
- Implement service virtualisation (e.g. mountebank) to mock external dependency responses
- Mocking strategy:
  - **Mock when:** Logic under test is internal; test is in early pipeline stages; external system charges per call; vendor sandbox is unavailable or unreliable
  - **Use real calls when:** Validating response variation from external system; pre-production integration validation
- Maintain and version-control mock definitions alongside service code

**1.4 Consumer Driven Contract Testing**
- ShopSphere defines contracts as the **consumer** — external providers must not break required response fields
- Contract tests run after unit tests, before integration tests
- Covers: internal microservice-to-microservice contracts AND external system interfaces (payment, CRM, ERP, 3PL where vendor cooperation is feasible)
- Tooling recommendation: TBD
- Any contract drift triggers pipeline failure and provider team notification

**1.5 Test Data Management**
- Introduce test data seeding scripts per environment, version-controlled and automated
- Environment cleanup automated on demand
- Sensitive production data never used in test environments — synthetic data generation tooling introduced
- Test data ownership assigned per squad with CoE-provided templates

**1.6 Environment Observability**
- Monitoring dashboards for environment health, and uptime per squad namespace
- Automated alerts for environment failures during active pipeline runs

#### Success Metrics
| Metric | Target |
|---|---|
| Environment provisioning time | Fully automated; latency target TBD |
| Environment-related sprint delays | Materially reduced (target TBD) |
| Production bugs reproducible in ephemeral env | Materially improved reproducibility (target TBD) |
| Contract test coverage of external interfaces | Critical interfaces covered (target TBD) |

#### RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Ephemeral env pipeline setup | Platform Engineering Squad | Platform Squad Lead | QE Architect, Tech Architect | All Squad Leads |
| Service virtualisation setup | QE Engineers per squad | QE Architect | Tech Architect | Squad Leads |
| Contract test implementation | Developers + QE | Squad Lead | QE Architect | CoE |
| Test data management framework | CoE QA Leads | QE Architect | Platform Squad | All Squads |
| Environment observability dashboards | Platform Engineering | Platform Squad Lead | QE Architect | All Squad Leads |

---

### Phase 2: Functional Testing Transformation

#### Goal
Materially reduce the regression cycle and shift quality ownership left through automation, standardised frameworks per layer, clear test ownership and CI/CD quality gates. Quantitative reduction targets TBD post-baselining.

#### Problem Being Solved
- 70% of testing is manual E2E, causing slow regression and late defect detection
- Automation frameworks exist but are inconsistent across squads
- Developers rely on QE for test ownership — creating a quality bottleneck
- No enforcement of test standards in code review or CI/CD pipelines

#### Key Initiatives

**2.1 Test Ownership Model — Shift Left**

Quality ownership is redefined and enforced:

| Test Type | Owner | When Written | Pipeline Stage |
|---|---|---|---|
| Unit Tests | Developers | During feature development | Stage 2 |
| Contract Tests | Developers | During API design | Stage 3 |
| Integration Tests | Developers or QE (per squad structure) | During service integration | Stage 4 |
| E2E Automated Tests | QE Engineers | During sprint, alongside feature | Stage 5 |
| Exploratory Testing | QE Engineers | Pre-release | Ad hoc |

> For existing legacy code where unit tests are missing: integration tests covering regression scenarios are an acceptable medium-term substitute. Squads are expected to backfill unit tests progressively. Backfill cadence and milestones TBD per squad.

**2.2 Test Pyramid Implementation**

ShopSphere's test distribution target:

```
         /\
        /  \       E2E Tests — critical journeys only (smoke + regression)
       /----\      (slow, high confidence, high maintenance)
      /      \
     /--------\    Integration Tests — service + DB + queue interactions
    /          \   (medium speed, medium confidence)
   /------------\
  /              \  Unit Tests — majority of tests
 /________________\ (fast, isolated, business logic focused)
```

- **Unit tests:** Business logic in isolation. Fast. Majority of test suite. Run on every commit.
- **Integration tests:** Service-to-database, service-to-Kafka, service-to-Redis interactions. Run post unit tests.
- **E2E tests:** Critical customer journeys only (checkout, flash sale purchase, loyalty redemption, BOPIS order-to-pickup). Run post integration tests against ephemeral environment. Categorised into smoke and regression scenarios.

**2.3 Standardised Automation Frameworks per Layer**

The CoE defines and publishes a standardised automation framework **per testing layer**. Different layers and channels require different tools — one universal framework is not viable across the ShopSphere stack.
The following table shows few options available for each layer for demonstration purpose and the final selection to be done based on consultation and investment plan.

| Layer | Example Framework |
|---|---|
| Unit (Java services) | JUnit + Mockito |
| Unit (Node.js services) | Jest |
| Unit (React Web / React Native) | Jest + Testing Library |
| Contract | Pact |
| API / Integration (Java) | REST Assured + Testcontainers |
| API / Integration (Node) | Supertest + Testcontainers |
| GraphQL contract & schema | GraphQL Inspector + schema-based testing |
| E2E — Web | Playwright/ Cypress/ Selenium (prefer a tool familiar to team) |
| E2E — Mobile (React Native) | Appium/ Detox (prefer a tool familiar to team) |
| Service Virtualisation | WireMock, Mountebank|
| Reporting | Out of box or Popular reporting solutions |

Framework guidelines per layer include: folder structure, naming conventions, assertion patterns, fixture management, reporting format.

Code review **Definition of Done** updated to include:
- Unit test coverage threshold met (threshold TBD by CoE in alignment with squad leads)
- No failing tests in the pipeline
- Tests follow framework guidelines for the relevant layer
- No skipped tests without documented justification

**2.4 CI/CD Quality Gate Pipeline**

Every code push triggers the following sequential pipeline. **Failure at any stage blocks progression:**

```
Code Push
    │
    ▼
Stage 1: Static Checks
    ├── Linting (code style enforcement)
    ├── SAST (static security analysis)
    └── Code consistency checks
    │
    ▼
Stage 2: Unit Tests
    ├── All unit tests pass
    └── Coverage threshold met (threshold TBD)
    │
    ▼
Stage 3: Contract Tests
    ├── Consumer contracts validated against providers
    └── No contract drift detected
    │
    ▼
[Ephemeral Environment Provisioned]
    │
    ▼
Stage 4: Integration Tests
    ├── Service-to-database interactions
    ├── Service-to-Kafka/SQS interactions
    └── Service-to-Redis interactions
    │
    ▼
Stage 5: A targeted subset of E2E Automated Tests for smoke testing
    ├── Critical customer journey coverage (web + mobile)
    ├── Payment / CRM / ERP / 3PL flow validation (via service virtualisation)
    └── Cross-service integration validation
    │
    ▼
Pipeline Green ✓ — Eligible for Promotion to QA environment
    │
    ▼
Stage 6: E2E tests in QA Environment
    ├── All E2E tests (mobile + web)
    ├── All api tests
    ├── Any necessary manual checks
    │
    ▼
Pipeline Green ✓ — Eligible for Release Promotion
```

**2.5 Legacy Regression Coverage**
- Identify the highest-priority regression scenarios currently executed manually
- Convert to automated integration and E2E tests as a one-time CoE-led effort
- Residual manual effort focuses on exploratory and edge-case validation only
- Quantitative reduction target for the regression cycle: TBD post-baselining

#### Success Metrics
| Metric | Target |
|---|---|
| Regression cycle duration | Materially reduced (target TBD) |
| Unit test coverage on new code | Threshold TBD by CoE |
| Automated E2E coverage of P0 journeys | TBD |
| Manual-to-automated test ratio | Materially inverted (target TBD) |
| Pipeline quality gate adoption | All squads (rollout timeline TBD) |

#### RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Framework standardisation per layer | CoE QA Leads | QE Architect | Tech Architect | All Squads |
| Unit test implementation | Developers | Squad Lead | QE Engineers | CoE |
| E2E automation implementation (web + mobile) | QE Engineers | QE Architect | Squad Lead | CoE |
| CI/CD pipeline quality gates | Platform + QE | QE Architect | Tech Architect | All Squad Leads |
| Definition of Done enforcement | Squad Lead | Squad Lead | QE Architect | CoE |
| Legacy regression automation | CoE QA Leads | QE Architect | Squad QE Engineers | Squad Leads |

---

### Phase 3: Non-Functional Testing

#### Goal
Validate ShopSphere's performance, security, resilience and mobile experience before major releases — substantially reducing NFR-related production risk, particularly during flash sales and market launches.

#### Problem Being Solved
- No performance or load testing suite for flash sales or API spike traffic
- No structured security testing or DAST integration
- No failover or resilience testing in multi-region setups
- Mobile app performance untested under low-bandwidth conditions and budget devices
- No benchmark testing before high-scale launches

#### Key Initiatives

**3.1 Performance Testing Strategy**

Four distinct performance test types are implemented, each serving a unique validation purpose:

| Test Type | Question It Answers | Trigger | Environment |
|---|---|---|---|
| **Load Testing** | Can the system sustain expected concurrent users steadily? | Pre-release, pre-market launch | Dedicated perf env |
| **Spike Testing** | Can the system handle sudden traffic surges (flash sale start)? | Pre-flash sale (lead time TBD) | Dedicated perf env |
| **Soak/Endurance Testing** | Does the system degrade over sustained load? (memory leaks, connection pool exhaustion) | Pre-major release | Dedicated perf env |
| **Stress Testing** | At what point does the system break? Where are the limits? | Pre-major release | Dedicated perf env |

**Performance Test Baselines**

Baselines are derived from two sources:
- **Business requirements:** Product and business owners define acceptable thresholds (concrete thresholds TBD)
- **Production observation:** DataDog and Prometheus production traffic data establishes realistic load profiles

Key metrics monitored at **each service, infrastructure component and database level:**

| Metric | Why It Matters |
|---|---|
| P90, P95, P99 response times | Reveals tail latency hidden by averages — impacts a meaningful share of real users |
| Error rate | Percentage of requests failing under load |
| Throughput (requests/sec) | System's capacity ceiling |
| CPU and memory utilisation | Infrastructure headroom |
| Database query time | Common bottleneck under concurrent load |
| Connection pool exhaustion | Silent killer under sustained load |
| Kafka consumer lag | Queue backup under event-heavy flash sales |

> **Why percentiles over averages:** Under flash sale load, P99 latency surfaces the worst-affected slice of users that average metrics conceal.

**Trigger Model:** Performance tests are decoupled from code push pipelines. They are triggered manually by QEs in coordination with the squad leads, based on:
- Upcoming flash sale schedule
- New market launch timeline
- Periodic stress testing cadence (TBD)
- Significant architectural change to critical services

**3.2 Security Testing**

Security is validated at two distinct pipeline stages:

| Test Type | What It Catches | Pipeline Stage |
|---|---|---|
| **SAST** (Static Application Security Testing) | Security flaws in source code (injection vulnerabilities, insecure dependencies, hardcoded secrets) | Stage 1 — Static Checks (before any test runs) |
| **DAST** (Dynamic Application Security Testing) | Runtime vulnerabilities visible only when the application is running (auth bypass, XSS, API exposure) | Post E2E — during NFR validation stage |

- SAST integrated into GitLab CI via GitLab's native SAST or SonarQube
- DAST run against ephemeral or dedicated security environment post functional pipeline
- Security findings categorised by severity; severity-based blocking policy defined by Security and QE Architect (specific policy TBD)

**3.3 Chaos Engineering — Resilience Validation**

ShopSphere's multi-region architecture (SEA, US, EU) requires deliberate failure injection to validate resilience before failures find production.

**Steady State Hypothesis:** Before each chaos experiment, define:
- What metrics represent normal healthy behaviour (P95 latency, error rate, throughput)
- What is acceptable degradation during the failure window
- What constitutes experiment failure

**Chaos Scenarios to Validate:**

| Scenario | Hypothesis | Key Metrics |
|---|---|---|
| Service instance goes down | Requests are automatically rerouted to healthy instances without user-visible errors | Error rate, P95 latency, successful request rate |
| Master database failure | Replica is promoted to leader; reads/writes continue; no data loss | Write success rate, failover duration, connection pool recovery |
| Kafka/SQS queue failure | Events are durably stored and replayed on recovery; no data loss | Consumer lag, event replay success rate, downstream service consistency |
| Inter-region network failure | Traffic reroutes to healthy region; latency increases but service remains available | Cross-region latency, regional error rate, DNS failover time |

- Chaos experiments run in dedicated environments — never directly in production initially
- As maturity grows, GameDays scheduled (cadence TBD) to run controlled chaos in production with full team readiness
- Tooling recommendation: TBD

**3.4 Mobile Performance Testing**

ShopSphere's React Native app serves customers across SEA markets with diverse device and network conditions.

**Device Strategy:**
- Analyse market data to identify the dominant devices by usage share in Philippines and target SEA markets
- Prioritise budget Android devices (dominant in SEA)
- Use **cloud device farms** for scalable, maintainable device coverage
- Cloud device farms integrate with GitLab CI for automated mobile test execution

**Network Simulation:**
- Test under simulated network conditions: 4G, 3G and high-latency connections
- Wi-Fi-only testing is explicitly insufficient
- Tools: TBD

**Key Mobile Metrics:**
- App launch time under each network condition
- Screen render time on low-end devices
- API timeout behaviour under poor connectivity
- Crash rate on target device set

#### RACI

| Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Performance test suite development | QE Engineers | QE Architect | Tech Architect | Squad Leads |
| Performance baseline definition | QE Architect + Squad Leads | QE Architect | Business Stakeholders | CTO |
| Performance test execution scheduling | Squad Leads | QE Architect | Squad Leads | CoE |
| SAST/DAST pipeline integration | Platform + QE | QE Architect | Tech Architect | All Squads |
| Chaos engineering design | QE Architect + Tech Architect | Tech Architect | Platform Squad | Squad Leads |
| Chaos experiment execution | Platform + QE | QE Architect | Squad Leads | Tech Stakeholders |
| Mobile test suite development | QE Engineers | QE Architect | Mobile Squad Lead | CoE |

---

## 4. Organisational Model

### 4.1 The Root Cause — A Culture Problem, Not a Tools Problem

ShopSphere already has automation frameworks. The problem is inconsistency, lack of ownership and no enforcement. **Tools without governance and culture produce chaos at scale.**

This transformation requires two parallel tracks:
- **Technical track:** New tools, pipelines and environments (Phases 1–3)
- **Cultural track:** New ownership model, accountability structures and enablement (continuous)

### 4.2 Test Ownership Model

| Test Layer | Owner | Enforced By |
|---|---|---|
| Unit Tests | Developers | Code review Definition of Done, pipeline gate |
| Contract Tests | Developers | Pipeline gate, CoE contract registry |
| Integration Tests | Developers or QE (squad-defined) | Pipeline gate |
| E2E Automated Tests (Web + Mobile) | QE Engineers | CoE framework standard, pipeline gate |
| Performance Tests | QE Engineers (CoE-led) | QE Architect sign-off pre-release |
| Security Tests | QE Engineers + Platform | Pipeline gate (SAST), QE Architect (DAST) |
| Chaos Experiments | QE Architect + Tech Architect | GameDay schedule (cadence TBD) |

### 4.3 Quality Centre of Excellence (CoE)

The CoE is ShopSphere's **quality enablement function** — not a watchdog. Its mandate is to make it easy for every squad to do quality right.

**Core Members:**
- QE Architect (lead)
- Tech Architect
- Senior QA Leads (sizing TBD based on squad-to-Lead ratio target)

**Associated Members:**
- Squad Leads (quality representative per squad)
- Delivery Managers

**CoE Responsibilities:**

| Responsibility | Output |
|---|---|
| Define and maintain testing standards per layer | Framework guidelines, Definition of Done templates |
| Enable squad onboarding to new standards | Workshops, runbooks, pairing sessions |
| Coach developers on unit and contract testing | Knowledge artefacts, inner-sourced examples |
| Monitor transformation health | Leading and lagging indicator dashboards |
| Resolve cross-squad framework drift | Governance reviews, framework update communications |
| Escalate blockers to Tech Stakeholders | Transformation progress report (cadence TBD) |
| Onboard new squads | Onboarding kit, CoE buddy system |

**What the CoE Does NOT Do:**
- Own test execution for squads
- Write tests on behalf of squads
- Act as approval bottleneck for squad releases

### 4.4 Stakeholder Commitment Model

| Stakeholder | Primary Concern | How Transformation Serves Them |
|---|---|---|
| CTO/ Tech stakeholders | Business risk, SEA expansion readiness | Reduced production incidents, flash sale confidence, faster delivery |
| Squad Leads | Feature delivery speed | Materially reduced regression cycle unlocks more sprint capacity |
| Squad Leads | Team productivity | Ephemeral environments eliminate waiting; automation reduces repetitive manual work |
| Developers | Delivery pressure | Shift-left catches bugs early — cheaper and faster to fix than post-QE |
| QE Engineers | Role relevance | QEs elevated from manual testers to automation engineers and quality coaches |

---

## 5. RAID Log

This RAID log captures the **Risks, Assumptions, Issues and Dependencies** known at proposal time. It is a living artefact owned by the QE Architect, reviewed at every CoE governance forum and updated as the transformation progresses. All entries are open for refinement once stakeholder alignment is complete.

### 5.1 Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Developers lack capacity or skill to own unit and contract tests at scale | High | High | CoE-led developer coaching programme; pairing with QE engineers; tiered DoD ramp-up; pilot with one squad before scaling |
| R2 | Platform Engineering Squad has insufficient bandwidth for ephemeral environment tooling | Medium | High | Confirm Platform team capacity at proposal acceptance; dedicate an infra-DevEx pod if needed; phase initiatives if capacity-constrained |
| R3 | External vendors (payment, CRM, ERP, 3PL) do not cooperate with contract testing | Medium | Medium | Use schema-based contract validation where provider Pact cooperation is unavailable; fall back to recorded-response virtualisation |
| R4 | Infrastructure cost from ephemeral environments at full squad scale exceeds budget | Medium | High | Auto-destroy policies, resource quotas; cloud cost monitoring; cost-of-quality reporting to CTO |
| R5 | Existing automation cannot be cleanly migrated to standardised frameworks | Medium | Medium | Migration triage by CoE; grandfather stable suites; rewrite only where ROI is positive |
| R6 | Cultural resistance to shift-left ownership ("that's QE's job") | High | High | Executive sponsorship; clear DoD enforcement; recognition for early adopters; CoE coaching, not policing |
| R7 | Production data parity for test environments is harder than anticipated, limiting bug reproducibility | High | Medium | Invest in synthetic data tooling; treat reproducibility as a probabilistic, not absolute, target |
| R8 | Tooling subscription costs exceed budget | Medium | Low | Procurement evaluation upfront; open-source alternatives considered per layer |
| R9 | CoE & Platform team staffing | Medium | Medium | Begin hiring before Phase 1; consider internal mobility; engage QE consulting partner as a bridge |
| R10 | Mobile release cycle constraints (app store review) impact pipeline cadence | Low | Medium | Decouple mobile pipeline from monolithic release train; adopt feature flags for in-app rollout |
| R11 | Compliance constraints (PCI-DSS for payment, GDPR for EU operations, regional data residency) impose unanticipated controls on test data and environments | Medium | High | Compliance review at start of Phase 1; data classification and masking strategy as Phase 1 deliverable |

### 5.2 Assumptions

| ID | Assumption | Validation Approach |
|---|---|---|
| A1 | A Platform Engineering function exists with capacity to lead ephemeral env work | Confirm at proposal acceptance |
| A2 | Sufficient Infrastructure(AWS) quota and budget are available for ephemeral environments at scale | Pre-Phase 1 capacity and cost modelling |
| A3 | Production observability (DataDog, Prometheus) is sufficiently mature to derive performance baselines | Telemetry audit during Phase 1 |
| A4 | Code review culture and tooling already exist; the DoD can be extended, not introduced | Squad-level audit |
| A5 | Developer base has, or can acquire, skill to write unit and contract tests | Skill survey + coaching programme design |
| A6 | Executive sponsorship for the cultural shift is committed | Confirmed via CTO/sponsor at proposal sign-off |
| A7 | CoE staffing can be sourced via hiring, internal mobility, or partner | Recruitment plan submitted with proposal acceptance |
| A8 | External vendors can be engaged on contract-test cooperation where applicable | Per-vendor engagement plan |
| A9 | Existing GitLab CI/CD infrastructure can scale to ephemeral env volume | GitLab runner capacity review |
| A10 | Tooling spend (subscriptions, licenses) is part of the transformation budget | Confirmed in Investment section |
| A11 | In-store POS hardware/firmware testing remains a separate programme | Scope confirmed with In-Store engineering lead |
| A12 | ERP and CRM internal logic testing remains owned by the respective vendor/platform teams; ShopSphere only owns the integration-side testing | Confirmed with ERP/CRM platform leads |

### 5.3 Issues (known at proposal time)

| ID | Issue | Owner | Resolution Path |
|---|---|---|---|
| I1 | Investment section lacks committed budget figures | QE Architect | Joint budget exercise with CFO/CTO |
| I2 | Phase durations and milestones not yet defined | QE Architect | Stakeholder alignment session post-acceptance |
| I3 | No baseline measurement of current production defect rate, regression test inventory, or coverage by squad | QE Architect + CoE | Baseline measurement sprint pre-Phase 1 |
| I4 | Pilot squad not yet selected | QE Architect + Squad Leads | Pilot selection workshop |
| I5 | CoE sizing not finalised (Senior QA Lead headcount and squad-to-Lead ratio) | QE Architect | CoE sizing exercise based on squad count and complexity |

### 5.4 Dependencies

| ID | Dependency | On | Required By |
|---|---|---|---|
| D1 | Ephemeral environment infrastructure | Platform Engineering Squad | Phase 1 start |
| D2 | AWS budget and quota uplift | CTO + Finance | Phase 1 start |
| D3 | CoE hiring approval and budget | CTO + HR | Phase 1 start |
| D4 | Tooling procurement | Procurement + Finance | Per-phase ramp |
| D5 | Vendor engagement for contract-testing cooperation | Vendor Management + QE Architect | Phase 1 mid |
| D6 | Production telemetry maturity for performance baselines | Platform + SRE | Phase 3 start |
| D7 | Compliance review (PCI-DSS, GDPR, data residency) | Security + Legal | Phase 1 start |
| D8 | Executive sponsorship and change management mandate | CTO | Proposal acceptance |
| D9 | Pilot squad commitment | Squad Lead of pilot squad | Phase 1 start |
| D10 | Scope agreement with In-Store engineering programme | In-Store Engineering Lead | Phase 1 start |

---

## 6. Investment Required

### 6.1 Infrastructure

| Item | Justification | Estimated Effort |
|---|---|---|
| AWS EKS resource for ephemeral environments | Core Phase 1 foundation | TBD |
| Dedicated performance testing environment | Isolated, production-like environment for load/spike/soak/stress tests | TBD |
| Cloud device farm subscription | Scalable mobile test coverage for device fragmentation | TBD |
| Chaos engineering tooling | Resilience validation infrastructure | TBD |

### 6.2 Tooling
The following tools are just indicative. The final tool list will be defined post final consultation.

| Tool | Purpose | Phase |
|---|---|---|
| WireMock / Mountebank | Service virtualisation for external dependencies (Payment, CRM, ERP, 3PL) | Phase 1 |
| Pact | Consumer driven contract testing | Phase 1 |
| Standardised frameworks per layer | Unified automation across unit, contract, API, integration, E2E web, E2E mobile | Phase 2 |
| Existing tool used in team or new tooling | Mobile E2E (React Native) | Phase 2 |
| Existing tool used in team or new tooling | Web E2E | Phase 2 |
| GitLab SAST | Static security analysis in pipeline | Phase 2–3 |
| OWASP ZAP / Burp Suite | DAST runtime security | Phase 3 |
| Performance testing tools (k6, gatling) | Performance and load testing | Phase 3 |
| Chaos engineering tool | Chaos engineering | Phase 3 |
| Device Farm | Mobile device coverage | Phase 3 |

### 6.3 People Effort

| Activity | Effort | Who |
|---|---|---|
| CoE establishment and governance setup | TBD | QE Architect + Tech Architect |
| Framework standardisation and documentation (per layer) | TBD | CoE QA Leads |
| Squad training and onboarding workshops | TBD (ongoing) | CoE |
| Legacy regression automation (one-time) | TBD | CoE QA Leads + Squad QEs |
| Performance test suite development | TBD | QE Engineers (CoE-led) |
| Chaos experiment design and execution | TBD (initial + periodic) | QE Architect + Tech Architect |

### 6.4 Cost of Inaction (Reference)

Every sprint without this transformation continues to expose ShopSphere to:
- A regression cycle that materially blocks release cadence
- Environment delays affecting all squads simultaneously
- Unvalidated flash sales, where a single production failure represents direct revenue loss, customer churn and reputational damage in markets where trust is still being established

---

## 7. Appendix

### 7.1 Proposed CI/CD Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CODE PUSH                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: STATIC CHECKS                                     │
│  • Linting              • SAST              • Consistency   │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: UNIT TESTS                                        │
│  • All unit tests pass  • Coverage threshold met (TBD)      │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 3: CONTRACT TESTS                                    │
│  • Consumer contracts validated  • No drift detected        │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  [EPHEMERAL ENVIRONMENT PROVISIONED]                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 4: INTEGRATION TESTS                                 │
│  • Service ↔ DB   • Service ↔ Kafka   • Service ↔ Redis     │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 5: E2E AUTOMATED TESTS FOR SMOKE (Web + Mobile)      │
│  • Critical customer journeys  • Cross-service integration  │
│  • External systems virtualised (Payment, CRM, ERP, 3PL)    │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  ✓ PIPELINE GREEN — ELIGIBLE FOR PROMOTION TO QA ENV        │
└─────────────────────────────────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 6: E2E AUTOMATED TESTS ON QA ENV (Web + Mobile)      │
│  • Regression scenarios not covered in lower layer          │
│  • External systems (may be)virtualised (CRM, ERP, 3PL)     │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 7: DAST (Post-deployment security scan)              │
│  • Runtime vulnerability detection against running app      │
└─────────────────────────┬───────────────────────────────────┘
                          │ PASS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  ✓ PIPELINE GREEN — RELEASE CANDIDATE TO STAGING & PERF     │
└─────────────────────────────────────────────────────────────┘

NFR Tests (Performance, Chaos, Mobile) — Manual trigger,
dedicated environment, pre-release gate managed by QE Architect
```

### 7.2 Test Type Quick Reference

| Test Type | What It Validates | Speed | Owned By |
|---|---|---|---|
| Unit Test | Business logic in isolation | Milliseconds | Developer |
| Contract Test | API contracts between services | Seconds | Developer |
| Integration Test | Service + infrastructure interactions | Minutes | Developer / QE |
| E2E Test (Web + Mobile) | Critical customer journeys end-to-end | Minutes–Hours | QE Engineer |
| Load Test | Sustained concurrent user capacity | Hours | QE Engineer (CoE) |
| Spike Test | Sudden traffic surge handling | Hours | QE Engineer (CoE) |
| Soak Test | System endurance over time | Multiple hours | QE Engineer (CoE) |
| Stress Test | System breaking point | Hours | QE Engineer (CoE) |
| SAST | Code-level security vulnerabilities | Seconds | Platform / QE |
| DAST | Runtime security vulnerabilities | Minutes | QE Engineer |
| Chaos Experiment | Resilience under failure conditions | Hours | QE Architect + Tech Architect |
| Mobile Performance | App behaviour on real device conditions | Hours | QE Engineer |


### 7.3 Mocking vs Real Calls Decision Framework

| Condition | Use Mock | Use Real Call |
|---|---|---|
| Logic under test is internal to the service | ✓ | |
| Test is in early pipeline stages (unit/integration) | ✓ | |
| External system charges per API call | ✓ | |
| External system has availability constraints | ✓ | |
| External system (ERP, CRM, Payment, 3PL/Warehouse) is in pre-prod test loop | ✓ (virtualised) | |
| Validating response variation from external system | | ✓ |
| Pre-production end-to-end release validation | | ✓ |

### 7.4 Transformation Timeline (Placeholder)

Phase start dates, durations, and milestone dates are intentionally not committed in this document.

They will be finalised following:
- Stakeholder alignment workshop
- Baseline measurement of current state (defect rate, regression inventory, coverage, environment usage)
- Pilot squad selection and pilot outcomes
- Confirmation of dependencies D1–D10 in the RAID log

A milestone calendar, and quantitative target sheet will be appended at that point and reviewed at every CoE governance forum.

---

*This document is a living artefact owned by the QE Architect and updated at a cadence defined by the Centre of Excellence.*
