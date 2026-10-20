---
title: What the Hackers Left Open
date: '2026-10-20T09:01:50.640799-05:00'
slug: what-the-hackers-left-open
author: Gordon Shumway
categories:
- AI & Models
tags:
- AI agents
- Cybersecurity
- Cairn
- Privacy
description: Exposed Cairn dashboards reveal agent-driven intrusions, uncertain costs
  and a familiar security problem on both sides of the attack.
feature: true
draft: false
cover: /og/what-the-hackers-left-open.png
image: /og/what-the-hackers-left-open.png
og_image: /og/what-the-hackers-left-open.png
og_image_width: 1600
og_image_height: 900
image_credit: Original symbolic pixel-art editorial illustration, composed locally;
  not a depiction of an actual Cairn dashboard.
---

A new Cairn investigation offers a rare look at agent-driven intrusions—and the security failures on both sides of the dashboard.

The attackers had software that could spend hours looking for a way into someone else's website. Some apparently forgot to lock the web interface controlling it.

That contradiction runs through [NorForge's investigation into exposed Cairn dashboards](https://norforge.com/blog/inside_cairn). The security firm identified more than 20 panels it assessed as likely connected to malicious operations. Those interfaces revealed targets, instructions, findings and secrets. Apparently legitimate security-testing operations had exposed client information the same way.

The case deserves attention without being inflated into proof that AI can hack anything. It shows something more specific: humans directing agents through sustained intrusion attempts, with enough successes to matter—and enough operational carelessness to let researchers watch.

## A goal, a shared notebook, and a lot of attempts

Cairn is better understood as coordination software than as one all-powerful hacking model.

In NorForge's description, each project has a starting point and a goal. Workers record discoveries and proposed next actions on a shared project blackboard. Other workers can use that information; a human can add hints. The system keeps progressing through possible routes rather than depending on one prompt producing a complete solution.

In an intrusion campaign, that can mean inspecting a website, finding associated infrastructure, testing a weakness and trying another route when the first fails. The important capability is carrying observations forward into further work.

This is autonomy within a human-directed operation, not software independently deciding to become criminal. People supplied targets and malicious objectives. Agents performed substantial parts of the intervening work.

NorForge also checked some claimed outcomes against live sites, including finding an attacker-installed upload interface at a reported location. Its evidence goes beyond agents congratulating themselves in a log. That does not make every dashboard's success label independently verified.

## The counts need their labels attached

[Reuters reported on October 19](https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/) that one campaign attempted intrusions against more than 1,200 sites and broke into websites belonging to more than 100 companies. Reuters independently reviewed attacker activity to identify victims.

NorForge's primary report describes more than 1,100 attack projects across 14 dashboards in its largest activity cluster. Projects, sites and companies are different units; those figures should not be blended into a supposedly precise success rate.

The company names also need their context:

- Deere told Reuters it had taken remediation actions and had no indication that sensitive information was accessed.
- SharkNinja said the affected site was a standalone product-support site and the threat had been contained.
- Cummins said it was investigating a potential attack on a website operated by a third-party vendor.

Reuters could not establish the extent of unauthorized data extraction. A compromised associated website is serious. It is not automatically a compromise of an entire corporate network, much less proof that every named company's customer database was stolen.

## Cheap persistence is the consequential part

The tempting headline is the price tag. Reuters reported researcher Snorre Fagerland's estimate of roughly $5,000 in token costs for the prolific campaign, or about $50 per successful intrusion.

Those are estimates, not invoices.

NorForge explicitly says it lacks actual token-usage totals. Its report estimates around $5 per task when unsuccessful, early-ending projects are included, with some longer projects potentially costing more than $100. It stresses considerable uncertainty. A task and a successful intrusion are not the same denominator, and token spending is not the full cost of running a criminal operation.

The useful inference is narrower: inexpensive repeated attempts can make partial success worthwhile. An attacker does not need a system that wins every time if it can keep exploring targets without continuous human attention.

NorForge estimates roughly 10% success across the observed campaigns, while warning that targets and definitions of success differ. That is an observation about selected exposed operations, not a universal benchmark for AI hacking.

For defenders, the concern is not perfection. It is how much persistent probing one operator can set in motion.

## A worker name is not a model audit

There is another distinction worth keeping intact. NorForge observed a worker named `claudecode_deepseek-v4.1-flash`, which it cautiously interpreted as potentially indicating a Claude Code harness using a DeepSeek model.

A harness supplies the surrounding workflow and tools. A model supplies the underlying inference. A label containing “Claude Code” does not establish that an Anthropic model carried out the attacks.

Likewise, Chinese-language instructions establish language, not nationality or state sponsorship. NorForge assessed the visible activity as apparently financially motivated and reported no obvious state-sponsored operation.

The story is consequential without assigning it a national flag or a model vendor the evidence cannot establish.

## The dashboard becomes part of the breach

The most uncomfortable finding is that the agents' accumulated knowledge became another exposed asset.

According to NorForge, dashboards disclosed target weaknesses and credentials, including secrets supplied by operators. That creates an additional risk even when a particular intrusion attempt fails: sensitive information gathered during the attempt may already be sitting somewhere else, unprotected.

The same problem applies to legitimate testers. Authorization to assess a client's systems does not make an unsecured repository of their secrets acceptable.

Our practical takeaway is deliberately unglamorous: inventory public-facing and vendor-hosted services, patch exposed applications, and monitor anomalous activity. Treat agent dashboards as sensitive infrastructure. Restrict access, retain fewer secrets, and rotate credentials found exposed. These are defensive priorities, not a claim that one checklist defeats every technique in this investigation.

The agents may change how much work an attacker can attempt. They do not retire the need to secure the systems doing that work.

In this case, the attackers' own dashboards made that point for them.

## Sources

- [NorForge: Inside Cairn — primary technical investigation by Snorre Fagerland](https://norforge.com/blog/inside_cairn)
- [Reuters: How one hacker used AI agents and a few thousand dollars to break into scores of sites — reporting by Raphael Satter, October 19, 2026](https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/)
