---
title: What Did Google Actually Prove About Signal?
date: '2026-11-12T03:39:00-06:00'
author: Protocol Sentinel desk
article_type: analysis
evidence_status: documented
editorial_notices: false
reporting_cutoff: '2026-11-12T09:39:00Z'
categories:
- AI & Models
tags:
- Signal
- Formal verification
- AlphaProof Code
- Software security
description: AlphaProof Code connects mathematical security claims to compiled cryptographic code. The boundary around that
  proof is as important as the milestone.
sources:
- https://deepmind.google/blog/introducing-alphaproof-code/
- https://deepmind.google/documents/36/Formal_Verification_of_Signal_4.pdf
- https://google-deepmind.github.io/code-verification
updated: '2026-11-23T21:17:43.501226Z'
cover: /og/what-did-google-prove-about-signal.png
image: /og/what-did-google-prove-about-signal.png
og_image: /og/what-did-google-prove-about-signal.png
image_credit: AI-generated conceptual pixel-art illustration via Higgsfield Nano Banana Pro; not documentary evidence.
---

A mathematical proof sounds like the end of an argument. In software security, the first question is what the argument was allowed to assume.

Google DeepMind’s [November 10 AlphaProof Code announcement](https://deepmind.google/blog/introducing-alphaproof-code/) describes a substantial result: AI agents helped prove key security properties of the code implementing Signal’s cryptographic protocol. The useful story is neither “AI made Signal unhackable” nor “proofs are meaningless because phones still have bugs.” It is the gap this work closes—and the boundaries it deliberately leaves intact.

## From a protocol diagram to an executable

An encryption protocol can be sound on paper while its implementation makes a mistake. Testing catches particular failures; a proof tries to establish a property across the behaviors described by a formal model.

The [technical paper and public verification material](https://google-deepmind.github.io/code-verification) identify the target precisely. Researchers linked the unmodified `libsignal` implementation into a small command-line harness and compiled it to AArch64 Linux machine code with the stock Rust compiler. The work covers the PQXDH handshake and Triple Ratchet, rather than every feature of every messaging application using a related protocol.

The reported guarantees include authentication, forward secrecy, post-compromise security and handshake secrecy under the paper’s models and assumptions. Those terms concern particular attacker capabilities and security conditions. Post-compromise security, for example, should not be translated into a promise that a phone under continuous attacker control keeps everything secret.

Connecting such properties to compiled implementation code is the important advance. A beautiful proof about a simplified diagram does not automatically cover the program people execute.

## The AI proposes. A different mechanism checks.

The architecture matters as much as the headline.

Humans guide the specification-writing process and approve the statements to be proved. Agent teams then generate proof code. Lean’s kernel checks that those proofs establish the approved statements. The model is not simply asked whether its own answer feels secure.

The paper reports roughly 6.5 million lines of generated proof code supported by about 26,000 lines of trusted specifications and AArch64 semantics. That ratio is interesting, but line count is not a security score. The crucial separation is between an untrusted proof producer and the smaller base whose correctness and meaning the result relies on.

A proof can be perfectly valid and still answer the wrong question if its specification is wrong. That is why human review of the specification is part of the method, not an embarrassing exception to an autonomous-AI sales pitch.

## What the guarantee does not contain

The authors explicitly retain assumptions about cryptographic primitives, the processor model, Lean’s kernel and contracts for routines outside the verification campaign. Their work is not a full audit of Signal’s user interface, operating system, account recovery, notification handling or every supported device.

These exclusions do not nullify the result. They define it. Claiming that the complete app is invulnerable would be like certifying a bridge’s load-bearing design and announcing that no vehicle could ever crash on it.

That analogy is hypothetical. The actual limitation is documented in the paper: the verification target is a compiled cryptographic implementation in a defined environment, not the entire application and its surroundings.

| Claim | Verdict | Evidence and limit |
| --- | --- | --- |
| Researchers connected protocol security properties to compiled libsignal code. | Mostly true | The paper describes machine-checked proofs for the stated target; Protocol Sentinel did not rerun the proof corpus. |
| The AI’s confident answer is the verification mechanism. | Unsupported | Lean checks proof terms against approved specifications. |
| Every Signal application is now proved immune to compromise. | Unsupported | Application behavior, environment and explicit assumptions remain outside that conclusion. |
| The work removes the need to decide what security means. | Unsupported | Specification writing and its review remain central. |

## The practical question for buyers of “verified” software

DeepMind says the project took four weeks and that reintroducing two previously fixed bugs produced machine-checked demonstrations of insecurity. Those are reported research results, not an independently measured productivity guarantee for another team’s codebase.

For a software buyer, “formally verified” should begin a more precise conversation. Which executable or component? Which version and architecture? Which property? Which external routines and hardware assumptions? What happens to the proof when the implementation changes?

A supplier that can answer those questions offers something more useful than a badge. A supplier that cannot may be selling the emotional effect of mathematics without its actual contract.

AlphaProof Code deserves attention because it puts a checkable mechanism between generated reasoning and a security claim. Its value does not require pretending the rest of the phone disappeared.

The proof is stronger when its boundary is visible.

## Sources and limits

- [DeepMind’s November 10 announcement](https://deepmind.google/blog/introducing-alphaproof-code/).
- [Technical paper: AlphaProof Code](https://deepmind.google/documents/36/Formal_Verification_of_Signal_4.pdf).
- [Public technical documentation and verification artifacts](https://google-deepmind.github.io/code-verification).

These are the research team’s own materials, not independent replications. Protocol Sentinel examined the documented target, architecture and limits; it did not execute the complete proof development or test Signal’s applications.
