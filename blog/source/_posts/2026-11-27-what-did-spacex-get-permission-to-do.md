---
title: "What Did SpaceX Get Permission to Do?"
date: "2026-11-27T10:27:16Z"
updated: "2026-11-27T10:27:16Z"
author: Protocol Sentinel desk
article_type: analysis
evidence_status: documented
reporting_cutoff: "2026-11-27T10:27:16Z"
categories:
  - Privacy & Power
tags:
  - SpaceX
  - Starmind
  - FCC
  - Orbital Computing
  - Infrastructure Governance
description: "The FCC's million-satellite Starmind order has a narrow communications grant, long deployment clocks and a disposal question still waiting for an answer."
cover: /og/what-did-spacex-get-permission-to-do.png
image: /og/what-did-spacex-get-permission-to-do.png
og_image: /og/what-did-spacex-get-permission-to-do.png
image_alt: "Conceptual pixel-art orbital computers above Earth, with an observatory and a checkpoint gate in the foreground."
image_credit: "AI-generated conceptual illustration via Higgsfield Nano Banana Pro; not evidence of Starmind's actual design or deployment."
sources:
  - https://docs.fcc.gov/public/attachments/DA-26-1273A1.txt
  - https://aas.org/press/spacex-data-center-fcc-approval
  - https://www.geekwire.com/2026/fcc-clears-spacex-million-satellites-starmind-data-center
  - https://satellitetoday.com/connectivity/2026/11/25/fcc-approves-spacexs-1-million-satellite-orbital-data-center-constellation
---
A million data centers in orbit is an excellent headline. It is a terrible substitute for reading the license.

On November 25, the FCC authorized SpaceX's proposed Starmind constellation. The scale is real: the [order names one million satellites](https://docs.fcc.gov/public/attachments/DA-26-1273A1.txt), at altitudes between 500 and 1,002 kilometers. But its operative label is less triumphant: **“GRANTED-IN-PART/DEFERRED-IN-PART — With Conditions.”**

The interesting question is not whether Washington likes orbital AI. It plainly does. It is which questions this approval actually answers, and which ones can travel through the checkpoint unanswered.

## The emergency radio is the licensing handle

Starmind is supposed to move data primarily through optical inter-satellite links. The FCC's grant identifies its scope as radiofrequency communications for backup and emergency telemetry, tracking and command—TT&C, the communications used to monitor and control spacecraft.

The authorized Ka-band frequencies are 18.8–19.3 GHz down and 28.6–29.1 GHz up. They are not a newly protected private lane. SpaceX must operate on an **unprotected, non-interference basis**, coordinate with relevant operators and federal systems, and obtain required earth-station authorizations before communicating with gateways. A documented harmful-interference report can require the offending operations to stop.

That does not make this a trivial paperwork approval. It opens a regulatory path for an enormous constellation. But the communications license is not a performance test of an orbital cloud, and it does not demonstrate that a customer can buy useful, competitively priced compute from it.

As [Via Satellite reports](https://satellitetoday.com/connectivity/2026/11/25/fcc-approves-spacexs-1-million-satellite-orbital-data-center-constellation), the technical and economic proposition remains unproven. Permission to build infrastructure and proof that the infrastructure works are separate products.

## The part still deferred is not decorative

SpaceX requested flexibility to dispose of satellites operating above 600 kilometers in Earth disposal or heliocentric orbits rather than through atmospheric reentry. Grant condition 4 defers that waiver because the company has not supplied enough information for the FCC to determine whether the proposed alternatives meet its requirements.

Before deploying and operating Starmind satellites that will not be disposed of through atmospheric reentry, SpaceX must seek a modification and justify the necessary waivers.

Read that carefully. It is **not** a finding that all Starmind satellites are unsafe, nor a ban on the entire constellation. It is a concrete boundary on a specific disposal route. The agency approved a system while leaving this proposed end-of-life option unresolved.

That is a more useful accountability question than whether the project sounds futuristic: when a future spacecraft depends on the deferred option, where is the subsequent authorization?

## The clock runs to 2040, not next quarter

The order sets staged deployment-and-operation deadlines. These are licensing conditions, not promised customer delivery dates.

| Deadline | Required milestone under the grant |
|---|---|
| November 25, 2033 | One authorized satellite in its assigned orbit and operating |
| November 25, 2035 | 10% of the authorized maximum deployed and operating |
| November 25, 2038 | 50% deployed and operating |
| November 25, 2040 | Remaining satellites needed to complete the authorized constellation |

The authorization says it becomes null and void if its milestone conditions are not met. Its 15-year license term begins when SpaceX certifies the first Starmind satellite is in orbit and operating in conformity with the grant—not simply on the announcement date.

[GeekWire's coverage](https://www.geekwire.com/2026/fcc-clears-spacex-million-satellites-starmind-data-center) captures the gulf between the million-satellite headline and that long runway. Neither the ceiling nor the schedule establishes present deployed capacity. Reading a license as an inventory is how speculative infrastructure quietly becomes imaginary infrastructure.

## “Outside our scope” does not mean “solved”

The FCC addresses interference and orbital-debris obligations, but draws a narrower boundary around other objections. Paragraph 18 declines to substitute government judgment for private enterprise on commercial viability. Thermal-management doubts and claims that orbital computing is inefficient are not treated as reasons to deny this radio authorization.

The astronomy dispute is sharper. The FCC says SpaceX's coordination commitments are sufficient and declines additional optical-astronomy conditions. It treats concerns about waste heat affecting infrared observations as outside the scope of the proposed radiofrequency operations.

The [American Astronomical Society's response](https://aas.org/press/spacex-data-center-fcc-approval) argues that the constellation's scale, brightness, emissions and thermal signature threaten research. Those are the organization's stated concerns, not independently measured effects from a completed Starmind network. The FCC's contrary regulatory conclusion is not a measurement of that future network either.

This is the governance gap worth watching: a question can be acknowledged, disputed and then excluded from the decision's controlling scope. None of those steps makes the underlying physical question disappear.

## Follow the obligations, not the render

For readers trying to judge the next orbital-AI announcement, three documents matter more than another satellite illustration: deployment evidence, any authorization resolving the deferred disposal request, and the required semiannual reports.

Condition 6 calls for reports covering conjunction events and maneuvers, removals from operation, reentries, deployment totals and orbital parameters, and use of the backup Ka-band links, subject to superseding reporting rules. Those are observable obligations against which later claims can be checked.

The approval is consequential. So is its incompleteness. The sensible position is neither “a million satellites are already happening” nor “the whole thing is fake.” It is to insist that every claimed achievement carry its own evidence. **A license clears a gate. It does not clear the sky.**

## Sources

- [FCC: DA 26-1273, Starmind order and conditional authorization](https://docs.fcc.gov/public/attachments/DA-26-1273A1.txt), November 25, 2026. Grant conditions 1–6 and 10–11; order paragraphs 14–18.
- [American Astronomical Society: response to the FCC approval](https://aas.org/press/spacex-data-center-fcc-approval), November 25, 2026. An affected scientific organization's position, not a completed impact study.
- [GeekWire: FCC clears SpaceX's Starmind constellation](https://www.geekwire.com/2026/fcc-clears-spacex-million-satellites-starmind-data-center), November 25, 2026.
- [Via Satellite: approval, waivers and deployment milestones](https://satellitetoday.com/connectivity/2026/11/25/fcc-approves-spacexs-1-million-satellite-orbital-data-center-constellation), November 25, 2026.
