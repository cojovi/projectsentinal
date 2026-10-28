---
title: 'PHP2Shell: What Is Still Running?'
date: '2026-10-26T18:14:09.806623+00:00'
author: Protocol Sentinel
categories:
  - Privacy & Power
tags:
  - PHP
  - PHP2Shell
  - Cybersecurity
  - Patch Management
  - Software Supply Chain
description: >-
  PHP2Shell fixes are available and AWS reports exploitation. The remaining job is proving which web-serving
  runtimes and deployable images actually contain both patches.
feature: true
draft: false
cover: /og/php2shell-what-is-still-running.png
image: /og/php2shell-what-is-still-running.png
og_image: /og/php2shell-what-is-still-running.png
og_image_width: 1600
og_image_height: 900
image_credit: >-
  AI-generated symbolic pixel-art editorial illustration via Higgsfield Nano Banana Pro; not an image of an
  actual incident or infrastructure.
updated: '2026-10-28T21:26:28.286Z'
article_type: analysis
reporting_cutoff: '2026-10-26T18:14:09.806623Z'
---

**Source review note — October 28, 2026.** This pass narrowly checked the stored PHP release notice, both linked PHP advisories and Amazon’s telemetry report. It supports the branch-specific fixes and exploit-condition distinctions below. It does not verify every deployment, reproduce exploits, reassess every secondary guidance link or establish successful compromise of a particular system. The article’s reporting checkpoint remains **October 26, 2026**.

The PHP fixes are available. That does not mean the PHP handling your next web request has changed.

PHP released emergency updates on October 21 for **CVE-2026-109618 and CVE-2026-109619**, the critical runtime vulnerabilities known as PHP2Shell. The question for October 26 is no longer when the release will arrive. It is whether every exposed deployment actually received it.[1]

There is a second reason to move beyond release-day headlines. Amazon Threat Intelligence says its MadPot sensors recorded an exploitation attempt on October 17, before public disclosure. Its report now describes PHP2Shell as broadly exploited in the wild.[2] This is an active remediation problem, not a reminder to watch for a future download.

## A patch release is not a deployment receipt

PHP's current security notice lists these fixed upstream releases:[1]

| PHP branch | Fixed release listed by the project |
| --- | --- |
| 8.2 | 8.2.35 |
| 8.3 | 8.3.36 |
| 8.4 | 8.4.27 |
| 8.5 | 8.5.12 |

Those are branch-specific releases, not interchangeable upgrade instructions. A distribution or long-term-support vendor may backport the fixes into a package whose upstream-looking version remains older. In that case, the relevant evidence is the vendor's security advisory and exact package revision, not a comparison with this table alone.[1][5]

The opposite mistake is assuming that installing a new package finished the work. Datadog's remediation guidance calls for rebuilding affected container images and restarting or replacing workers that still run the old runtime.[5] An updated file on disk is not proof that an existing worker loaded it.

A green dashboard needs to answer a specific question: which patched package or image is executing these requests?

## Two bugs, with different conditions

The first flaw concerns interrupted initialization. An out-of-memory condition can leave PHP's internal request data in an invalid state; cleanup can then act on that data. The PHP advisory reports complete unauthenticated remote code execution over HTTP against Apache mod_php, before application-specific code runs.[3]

The second concerns state that outlives its request. A persistent worker can retain a reference after the memory behind it has been freed. A later request reaching the same worker can encounter that stale state before normal initialization resets it.[4]

That distinction matters for PHP-FPM. For the first advisory, PHP explains that FPM terminates a child when request startup fails, blocking that particular sequence. The advisory still identifies other circumstances in which FPM is susceptible, without claiming a complete demonstrated FPM exploit for that flaw. The separate stale-state advisory does report validated FPM exploitation, dependent on a suitable application operation after successful startup.[3][4]

“Different attack path” is a poor substitute for “patched.” It is equally wrong to turn configuration-dependent exploitation into a claim that every PHP site has already been compromised.

## What the exploitation report establishes

Amazon's report separates the earliest observed attempts from the later activity. It says attempts before the embargo lifted targeted MadPot honeypots, while acknowledging uncertainty about whether those attempts would have succeeded against real-world systems. It subsequently reports broad exploitation after public disclosure.[2]

That supports urgency. It does not supply a worldwide count of compromised websites, explain how the earliest actor obtained exploit information, or establish that a particular business was breached.

This is where patching and investigation become separate jobs. Installing a fix addresses the vulnerable runtime. It cannot, by itself, tell an administrator what happened while the old runtime was exposed.

Datadog recommends looking for suspicious form submissions, memory-exhaustion errors and unexpected shell processes. Its analysis also warns that successful command execution need not crash the worker.[5] A quiet service and an apparently healthy homepage are therefore limited evidence. They are not a clean bill of health.

## The inventory has to include the things that come back

Start with internet-facing PHP deployments, including systems where PHP is bundled inside a product rather than installed as an obvious standalone package. The UK National Cyber Security Centre's alert explicitly calls for checking third-party appliances and services that may bundle PHP.[6]

Then inspect the mechanisms that reproduce those deployments. A corrected production instance can be replaced later by an older container image or a forgotten staging template. Datadog specifically includes containers and bundled interpreters in its inventory guidance.[5]

Build pipelines matter here because they can redeploy the vulnerable runtime. That does not mean a CI runner using PHP only on the command line automatically exposes the same HTTP attack surface. Keep the inventory broad without pretending every installation has an identical risk.

Likewise, the PHP version printed in a terminal may belong to a different installation from the one serving the website.[5] For a managed host, ask for confirmation covering both CVEs, the site's actual runtime and the worker rollout. “Your plugins are current” answers a different question.

## A workaround still needs an expiry date

Both PHP advisories say configuration changes do not provide a complete generic fix.[3][4] Hiding warnings is not protection from the stale-state vulnerability: the relevant state can be accessed before PHP decides whether to display or log a diagnostic.[4]

The project's temporary measures address particular paths and have operational trade-offs. Copying an isolated memory setting from a social post into production can exchange one problem for another. Follow the full vendor guidance for the actual environment, with an owner and a deadline for applying the complete update.

For systems that cannot be remediated immediately, the NCSC alert advises considering taking them offline until fully mitigated.[6] That is a containment decision for the responsible administrator, not a reason to declare a workaround equivalent to patching.

## What a defensible status report contains

| Claim | Assessment | Evidence required |
| --- | --- | --- |
| Upstream fixes exist. | True | PHP's October 21 release notice.[1] |
| Exploitation is only theoretical. | Unsupported | Amazon reports observed attempts and subsequent broad exploitation.[2] |
| Using FPM guarantees immunity. | Unsupported | PHP reports a validated, application-dependent stale-state path against FPM.[4] |
| Updating the application's plugins proves PHP is fixed. | Unsupported | The runtime and its running workers require separate verification.[1][5] |

The useful completion record identifies the deployment, its owner, the fixed package or image, and confirmation that the serving workers were replaced or restarted. It also records what investigation was performed for the period of exposure.

PHP shipped the fixes. The remaining work is proving where they are running, and finding the places your deployment process could quietly bring the old version back.

## Sources and reporting checkpoint

Sources retrieved again on **October 26, 2026**. That is the original article’s reporting checkpoint; the October 28 documentary check has the narrower scope stated above. Vendor-specific product status can change; use the responsible vendor's current advisory for a particular appliance or distribution. This article does not claim a worldwide compromise count or that every exposed system was successfully exploited.

1. [PHP project: critical security advisory and October 21 release information](https://www.php.net/index.php#2026-10-21-5).
2. [Amazon Threat Intelligence: PHP2Shell exploitation observed in MadPot](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/).
3. [PHP advisory GHSA-w8hw-w9fx-j79w: RCE via OOM corruption](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w).
4. [PHP advisory GHSA-6wmf-4rv5-p3rp: RCE via stale global state](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp).
5. [Datadog Security Labs: PHP2Shell analysis, detection and remediation](https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/).
6. [UK NCSC: critical security issue affecting PHP](https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php).
