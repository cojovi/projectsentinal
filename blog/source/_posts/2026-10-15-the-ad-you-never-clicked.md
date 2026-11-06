---
title: "The Ad You Never Clicked"
date: "2026-10-15 16:00:00"
updated: "2026-11-05T19:09:52.588710Z"
author: "Protocol Sentinel desk"
categories: ["Privacy & Power"]
article_type: "analysis"
evidence_status: "documented"
editorial_notices: false
reporting_cutoff: "2026-10-15T23:59:59-05:00"
slug: "the-ad-you-never-clicked"
cover: "/og/the-ad-you-never-clicked.png"
image: "/og/the-ad-you-never-clicked.png"
og_image: "/og/the-ad-you-never-clicked.png"
image_credit: "Original locally drawn pixel-art editorial illustration; not documentary evidence."
description: "The Ad You Never Clicked — a historical, source-bounded analysis."
---

“Don't click suspicious links” is useful advice. It is not a security architecture.

On October 15, Citizen Lab published a technical investigation into **AdFection**: targeted advertising used to deliver zero-click mercenary spyware. Researchers linked Discover-Tech, an Israeli advertising company, to a pipeline connecting ordinary ad inventory with surveillance vendors. Their evidence includes attacks on devices at Al Jazeera in 2024 and 2025. The publication is new; those attacks are not happening for the first time this week.

The important story isn't that an evil banner can magically hack every phone. It's that the advertising system already supplies two things an attacker wants: a way to locate particular devices and a way to deliver code to them. Add a working exploit, and “I never clicked it” stops being the defense people assume it is.

## Three stages, not one magic trick

Start with targeting. When an app or website offers an advertising slot, intermediaries can circulate information about the audience and device through a real-time auction. Depending on the implementation, that information can include advertising identifiers, IP addresses and location signals. Buyers decide which impressions to purchase.

Next comes delivery. An ad is not necessarily a flat picture. Its rendering can involve scripts, additional network requests and code from multiple companies. A recognizable publisher does not personally write every component that arrives through its advertising supply chain.

Then comes exploitation. **Running advertising JavaScript is not the same thing as compromising the operating system.** Installing spyware requires an additional attack against the target's software. That distinction matters: it separates a demonstrated infection from fingerprinting, reconnaissance or an ad impression.

[Citizen Lab's investigation](https://citizenlab.ca/research/how-discover-tech-turned-targeted-ads-into-a-pipeline-for-spyware/) describes Discover-Tech ads that contacted an intermediate server. That server could decide, using identifiers and the source IP address, whether to return further code. Non-targets could receive nothing. Selected devices could be sent onward into the spyware delivery process.

That selectivity is the nasty part. An ad can look harmless to most visitors while behaving differently for the person the operator actually wants.

## What the evidence actually establishes

Citizen Lab says network logs supplied by Al Jazeera allowed it to connect advertising infrastructure, a Candiru validation stage and subsequent spyware communications. It reports at least 45 devices targeted within the organization.

Separately, researchers analyzed almost four billion bidding records showing Discover-Tech ads reaching almost 200,000 websites and mobile apps over four months. That is evidence of distribution reach, **not evidence of four billion attacks or 200,000 infected services**.

[Confiant's concurrent investigation](https://blog.confiant.com/p/adint-weaponized-ad-tech-for-zero-click-spyware-and-mass-identity-vacuuming) describes suspicious ad behavior, device fingerprinting and a handoff to infrastructure attributed to Candiru by Citizen Lab. These are collaborating investigations, not two completely independent discoveries of the same victims.

The responsible boundary is simple: researchers documented spyware delivery through targeted ads. They did not establish that every device receiving a Discover-Tech ad was infected, nor identify every government customer behind the activity.

## The trust badge wasn't the security boundary

Citizen Lab reports that Discover-Tech appeared on approved or certified vendor lists maintained by Google and IAB Europe. Following disclosures, both removed it from their registries; other advertising companies also disconnected or restricted its access. These responses are recorded in Citizen Lab’s report and correspondence section.

That response matters. So does its limitation. Removing one supplier does not remove the combination of granular targeting and third-party code delivery that made the supplier useful.

This is not proof that advertising companies knowingly authorized spyware. It is evidence that admission to an advertising ecosystem did not prevent the abuse researchers documented. A consent interface or vendor listing is not a forensic guarantee that subsequent code is safe.

For publishers, the uncomfortable consequence is that advertising is also a software supply chain. The site earns money from an impression; the visitor's browser receives dependencies the visitor did not individually select.

## What to change without buying a fantasy shield

Keep browsers and operating systems updated. Blocking ads and trackers can reduce exposure to this delivery channel; it cannot establish that a previously exposed device is clean or guarantee protection against every spyware route. Disabling advertising identifiers reduces one targeting input, not every possible identifier.

For organizations handling sensitive reporting, legal work or public-interest research, the question should be operational: which third-party advertising and tracking components are allowed on managed devices, and what evidence would reveal an unexpected chain of network connections? People at elevated risk need specialist security support, not just another reminder to inspect links.

For everyone else, the lesson is narrower than panic and bigger than etiquette. A person can follow the usual rules and still encounter a dangerous supply chain. Security advice that puts the entire burden on the final click is missing the machinery that runs before it.

**The browser didn't need your click to load the ad. That's the boundary worth arguing about.**

## Sources

- [Supporting document 1](https://citizenlab.ca/research/how-discover-tech-turned-targeted-ads-into-a-pipeline-for-spyware/)
- [Supporting document 2](https://blog.confiant.com/p/adint-weaponized-ad-tech-for-zero-click-spyware-and-mass-identity-vacuuming)
