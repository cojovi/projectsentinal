---
title: "The 303 Churches Israel Geofenced: A 12-Month Reverse-Engineer of FARA #7653"
date: 2026-09-04 22:00:00
tags: [Privacy & Power, Big Tech & Platforms, Signal vs Noise]
categories: [Privacy & Power]
description: "The mechanism under the Israeli MFA's $3.2M church-targeting campaign isn't religion. It's geofenced psychographic ad delivery at scale, routed through Havas Media and a 6-week-old LLC."
keywords: [Show Faith by Works, Israel geofence churches, FARA 7653, Chad Schnitger, Havas Media, geofencing, Israeli MFA, Foreign Agents Registration Act, ad targeting]
og_image: /og/israel-churches-geofence.png
---

The Israeli Ministry of Foreign Affairs didn't try to influence American Christians with a sermon. It tried to influence them with a 1,000-foot GPS fence drawn around their pews.

On September 27, 2025, a six-week-old California LLC called **Show Faith by Works** filed FARA registration **#7653** with the U.S. Department of Justice. The client listed on the filing: **Israel's Ministry of Foreign Affairs**. The routing bank: **Havas Media Germany GmbH**, the German parent of the Israeli agency Inbar Merhav G. The budget: **$3.2 million over five months**, paid in equal installments of $651,792, with an "ideal additional budget" of $835,000 floating on top.

That's the surface. The mechanism underneath is what matters.

## The Mechanism

A geofence is a virtual perimeter drawn on a map around a physical location. Every mobile device that crosses the line with location services enabled is tagged with a persistent advertising identifier. The advertiser can then chase that device across every app, site, and CTV channel that runs on the same identifier graph — for days, weeks, or months.

Show Faith by Works' FARA filing doesn't mince words about what's being drawn:

> *"Geofence the actual boundaries of every Major church in California, Arizona, Nevada, and Colorado, and all Christian Colleges during worship times. Track attendees and continue to target with ads."*

The filing specifies 219 churches in California, 38 in Arizona, 32 in Colorado, 14 in Nevada, plus colleges and additional Texas sites. **303 named venues** in total. **~4 million Christians** in reach, with the filing projecting it would "win over more than 100,000" of them.

Then comes the part that turns this from targeted advertising into influence operations:

> *"Increase positive associations with the nation of Israel,"* and, in the same sentence, *"while linking the Palestinian population with extremist factions."*

That's the two-line mission statement of a $3.2M federal-disclosure-grade foreign influence campaign run on American soil, inside American houses of worship, without asking any of the people inside.

## The Routing Layer

This is the piece that should make every ad-tech person sit up. The money doesn't move directly from the Israeli MFA to Show Faith by Works. It moves **through Havas Media Germany**. That's a deliberate jurisdictional hop — the payment trail crosses from Israel to Frankfurt before reaching a Riverside, California LLC founded on August 5, 2025.

Why this matters:

1. **Havas Media is an ID-graph owner.** Their data arm tracks device-level identifiers across display, audio, CTV, and DOOH inventory. When the geofence captures a phone on a Sunday morning, that device's identifier joins Havas's audience graph regardless of which app or site the user later visits. The "Israel ad" stops being an ad the moment the user leaves the church parking lot — it becomes a permanent audience cohort attached to that device.

2. **The targeting window is the weakest link in the user's privacy posture.** Almost no one disables location services on their phone before walking into a church. The default is *on*. Sunday-morning geofence captures hit phones during the exact moment the user is most predictable, most stationary, and least likely to be scrolling past the ad to dismiss it.

3. **Auto-deletion by Signal defeats FARA's recordkeeping requirement.** The FARA filing raises the question because the daily updates — talking points, video clips, talking-point briefs — flow through an encrypted Signal group called "NYC Creators Announcements"… sorry, that's a different filing. The Show Faith by Works operation is analog by comparison, but the targeting data still gets stored on ad-platform servers, where it can be subpoenaed by FARA enforcement and quietly retained by the platform itself indefinitely.

## The Pastor Stipend Pipeline

Geofencing is the loud part. The quieter, more corrosive part is in the same filing:

> Pay "individual guest pastors, bilingual pastors, or pastors who match target demographics to record messages based on content creation targets."

Pastors don't know they're on the list. The congregations don't know. The preachers they listen to on Sunday may be receiving direct stipends from a foreign government's PR contractor to deliver specific talking points — without disclosure. The FARA filing was made, but the in-pew disclosure? Optional. Until the church finds out and objects.

One Colorado church, **Canyon View Vineyard**, found out. Their statement:

> *"We did not know about this. We did not consent to this, and we are not participating in this."*

That's the cleanup posture. By November 2025, the operator — **Chad Schnitger**, a political consultant also running the California chapter of the **Faith & Freedom Coalition** — told outlets he had "dropped" the geofence. The invoice schedule didn't drop. The Israeli MFA's five monthly $651,792 wire transfers through Havas Media continued into December and beyond. By March, **more than $2.5 million** had moved.

The "drop" was a press-cycle tactic. The payment schedule is the truth.

## The Byte-Level Pattern

Geofencing a house of worship is not new. Retail geofencing has been doing this to shopping malls since 2013. The novelty here is three-fold:

- **Foreign principal.** The U.S. Department of Justice's FARA unit exists precisely to make this kind of payment legible. The filing is doing its job — it's on the public record at fara.gov, document 7653. But legible is not stopped.

- **Influence-not-commerce framing.** A retailer geofencing your local Whole Foods wants you to buy paper towels. The Israeli MFA geofencing your church wants you to re-rank an entire foreign conflict in your head. The targeting infrastructure is identical; the impact target is your political worldview.

- **Pastors as the relay.** This is the piece most coverage misses. The 303 churches are the *delivery surface*. The pastors are the *amplifier*. If a $5,000 stipend gets a pastor to drop "and friends, let us also remember the nation of Israel this week" into a sermon, the campaign doesn't need a single ad to convert that listener — the conversion is delivered by the trusted voice the listener already came to hear. Foreign government talking points, distributed through domestic religious authority, with zero disclosure to the congregation.

## What the Filings Say vs. What the Filing Does

The FARA filing for #7653 was completed. The campaign was disclosed. That's the legal box checked. The legal box is not the same as the political box.

The political box would ask:

- Why does a foreign ministry need an American LLC to target American religious gatherings with location-based advertising?
- Why are those religious gatherings chosen without the venues' consent?
- Why are payment schedules continuing after the operator publicly says the campaign is dead?
- Why does the mission statement pair "positive associations with Israel" with "linking the Palestinian population with extremist factions" — in the same sentence, with the same budget line, run by the same operator?

Those questions aren't being asked by FARA. FARA is a disclosure regime, not a consent regime. The DOJ can see the money. The DOJ can't stop the fence.

## The Actual Moat

The mechanism that makes this work isn't the geofence, the Havas data graph, the FARA filing, or even the pastor stipends. The mechanism that makes this work is **the audience's assumption that they're not being targeted inside their own church**.

Geofencing a stadium works because people expect ads in stadiums. Geofencing a Walmart works because people expect personalization inside commercial spaces. Geofencing a **house of worship during the most predictably-attended hour of the user's week** works because the audience has *no mental model* for being marketed to in that context. They came to listen. They're being scanned.

The next time you sit down in a pew on a Sunday morning and feel the phone in your pocket is just a phone, remember FARA #7653. The line on the map doesn't know you're praying. The advertiser doesn't care.

---

**Sources**
- [Show Faith by Works FARA Filing #7653, U.S. DOJ NSD (Sept 27, 2025)](https://efile.fara.gov/docs/7653-Exhibit-AB-20250927-1.pdf)
- [Responsible Statecraft: "Israel wants to pay US pastors a stipend to spread the word"](https://responsiblestatecraft.org/israel-geofencing-churches)
- [Times of Israel: "Israel to spend up to $4.1M in bid to bolster support among Christians in western US"](https://www.timesofisrael.com/israel-to-spend-up-to-4-1m-in-bid-to-bolster-support-among-christians-in-western-us)
- [Amarillo Tribune: "Amarillo churches are listed as potential targets for a geofencing campaign"](https://amarillotribune.org/2025/11/04/amarillo-churches-are-listed-as-potential-targets-for-a-geofencing-campaign-with-or-without-their-knowledge-or-consent)
- [Truthout: "New Campaign Aims to Flood Churches and Christian Colleges With Pro-Israel Ads"](https://truthout.org/articles/new-campaign-targets-churches-and-christian-colleges-for-pro-israel-ads)
- [Canyon View Vineyard Church Statement](http://canyonviewchurch.com/statement-foreign-advertising-campaign)
