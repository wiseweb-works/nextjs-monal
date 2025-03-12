---
title: "New NLNet Funding"
date: 2024-07-22

tags: []
author: "Monal"
---

We are pleased to announce that we [got selected in another funding round](https://nlnet.nl/project/Monal-IM-UI/) by the [EU’s NGI](https://ngi.eu/) via the [NLnet Foundation NGI0 Entrust Fund](https://nlnet.nl/entrust) to work on some important features in Monal.

In short this consists of the following tasks (in no special order).

- **Implement Dialpad:**
Add Dialpad to our Call-UI and backend code to be able to send DTMF tones in A/V calls. This will
make Monal fully compatible with jmp.chat, like Snikket is already.
- **Rewrite Chat UI:**
Our current chat UI is still UIKit-based and it's hard to improve it or fix some UI glitches. We want
to rewrite and modernize the whole chat UI using SwiftUI. This will not only simplify maintenance a
lot and allow us to fix these UI glitches, but also enable us to implement modern XMPP features
like message reactions, message styling, message replies or mentions.
- **UI work: Implement Message Reactions, Rich Replies and Stickers:**
Implement UI and backend for message reactions (XEP-0444), rich replies (XEP-0461) and
Stickers, once the chat UI is ported to SwiftUI
- **XSF work:**
After having successfully worked on the SASL2 XEP-suite, I want to modernize XEP-0389: Extensible In-Band Registration to also send only password hashes
instead of cleartext passwords (similar to password upgrades specced in XEP-0480: SASL Upgrade Tasks)
- **Write documentation of Monal internals:**
After having started to publish a blog series and wiki articles about Monal's internals (beginning
with the Handlers Framework), I want to publish blog and wiki articles on our XML query-language
(intentionally based on the XPath-like syntax of Prosody's query language), the PubSub/PEP
framework, Model-Classes used as data sources for our UI (MLContact, MLMessage etc.) and
possibly more.

**Thanks again to NLNet for fund this!**
