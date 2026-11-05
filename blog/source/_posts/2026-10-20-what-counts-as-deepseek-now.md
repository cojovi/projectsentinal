---
title: "What Counts as DeepSeek Now?"
date: "2026-10-20 16:00:00"
updated: "2026-11-05T19:09:52.588710Z"
author: "Protocol Sentinel desk"
categories: ["Privacy & Power"]
article_type: "analysis"
evidence_status: "documented"
editorial_notices: false
reporting_cutoff: "2026-10-20T23:59:59-05:00"
slug: "what-counts-as-deepseek-now"
cover: "/og/what-counts-as-deepseek-now.png"
image: "/og/what-counts-as-deepseek-now.png"
og_image: "/og/what-counts-as-deepseek-now.png"
image_credit: "Original locally drawn pixel-art editorial illustration; not documentary evidence."
description: "What Counts as DeepSeek Now? — a historical, source-bounded analysis."
---

*Archival note: Originally scheduled 2026-10-20; first published on recovery date 2026-11-05. Original reporting cutoff: 2026-10-20. This is historical analysis; later developments are included only when explicitly dated.*

Removing a chatbot is straightforward. Finding a model inside somebody else's product is not.

That is the useful distinction in the Department of Homeland Security's October 20 DeepSeek notice. The notice publishes a federal restriction on a Chinese AI company. The operational story is a supply-chain question: **what is your software actually running?**

The [Federal Register notice](https://public-inspection.federalregister.gov/2026-21447.pdf), filed October 19 for publication October 20, describes two actions. It excludes information-technology products and services developed by DeepSeek and its covered affiliates from federal civilian agency procurements. It also orders removal from civilian agency IT of DeepSeek and affiliate products—and third-party products and services developed using DeepSeek implementations.

The October publication date is not evidence that the underlying order was first issued that month. This historical analysis concerns the published scope, not present compliance deadlines or every provision of the signed order.

That last category is where a simple brand ban turns into an inventory problem.

## The logo is not the dependency

A company can sell an assistant under its own name while relying on somebody else's model. A customer-facing interface does not necessarily tell the customer which inference service, model weights or backend arrangement supplies the answers.

The notice's third-party language matters because it looks past the name on the interface. Checking whether an agency has installed the DeepSeek app is not the same exercise as checking whether a vendor's service uses a DeepSeek implementation.

This does not mean every product that has ever interacted with DeepSeek is automatically covered. The notice is not a complete technical taxonomy of model ancestry. It is a statement of the exclusion and removal order's scope. Uncertain cases need an authoritative interpretation, not a confident guess from a sales representative—or a blog.

For a technology buyer, the immediate question becomes less theatrical and more useful: can the supplier identify the underlying implementation and explain where it operates?

## Three questions worth separating

**Who developed it?** The procurement exclusion identifies DeepSeek and covered affiliated entities. Corporate identity is one part of the review.

**What does it use?** The removal language expressly includes third-party products and services developed using DeepSeek implementations. A different vendor name does not settle that question.

**Where is it being used?** This notice concerns federal civilian agency procurements and civilian agency information technology. It is not a notice establishing a general prohibition on private individuals running DeepSeek.

Those are different questions. Collapsing them into “America banned DeepSeek” makes a more portable headline and a worse explanation.

## A restriction is not a forensic finding about every deployment

[GovInfoSecurity's reporting](https://www.govinfosecurity.com/dhs-bans-deepseek-from-federal-civilian-agencies-a-33146) describes DHS concerns about sensitive information, Chinese infrastructure and potential security vulnerabilities. Those are attributed government risk assessments, not proof that every deployment has exfiltrated data or contains malware.

That distinction matters especially when discussing open-weight models. Where a model runs, which software surrounds it and whether a service sends information elsewhere are separate technical properties. A policy can restrict a supplier or implementation without establishing that every possible deployment has identical behavior.

Conversely, a claim that something runs locally does not, by itself, resolve whether a covered agency may use it under this order. Technical architecture and procurement eligibility are related, but they are not interchangeable.

## Ask for evidence, not a reassuring adjective

A sensible review starts with an inventory of AI-enabled products, then asks vendors for the model and service dependencies behind them. Document the answer, the deployment arrangement and any unresolved interpretation. Treat “proprietary AI” as a marketing description until the supplier explains what it means.

That is a practical recommendation, not an additional requirement invented by the notice. The retrieved notice does not justify publishing a universal remediation deadline or declaring every downstream scenario settled.

The broader lesson is not that one national label makes software safe and another makes it unsafe. It is that buying AI through an intermediary can hide the dependency that a policy actually regulates.

The chatbot is visible. The supply chain often is not. This order makes that gap a problem federal buyers can no longer answer with a logo check.

## Sources

- [Supporting document 1](https://public-inspection.federalregister.gov/2026-21447.pdf)
- [Supporting document 2](https://www.govinfo.gov/content/pkg/FR-2026-10-20/html/2026-21447.htm)
- [Supporting document 3](https://www.govinfosecurity.com/dhs-bans-deepseek-from-federal-civilian-agencies-a-33146)
