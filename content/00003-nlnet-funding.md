---
title: "NLNet Funding"
date: 2022-09-11

tags: []
author: "Monal"
---

We are pleased to announce that we got funding by the EU’s [NGI Assure via the NLnet Foundation](https://nlnet.nl/assure/) to work on some important features in Monal.

In short this consists of the following tasks (in no special order).

### 1\. Implement more privacy-friendly push server

The current push appserver (<https://github.com/tmolitor-stud-tu/mod_push_appserver>) saves more data than strictly needed to perform its task, let’s change that. On top of that, a possible HA-setup and load balancing should be strived for.

### 2\. Implement basic Audio calls using WebRTC

Include WebRTC library into our codebase and wire it up to allow for simple audio calls not involving XMPP (maybe send SDP data through a Monal specific non-standardized XMPP stanza to make this work without hardcoded ip and port).

This is to test Audio Calls in the field first before wiring them up using correct XMPP XEPs.

### 3\. Implement all XEPs needed for Audio Calls

To make Audio Calls for XMPP work, we need proper XMPP integration. This wires up the stuff implemented in (2) into the XMPP layer by implementing the proper XEPs listed below. This will add support for 1:1 audio calls to Conversations, Dino and many more XMPP clients.

### 4\. Implement Video calls using WebRTC

On top of the work done in (2) and (3) we want to implement Video Call support as well. This will add support for 1:1 video calls to Conversations, Dino, and more.

### 5\. Security quickscan

We want a security quickscan performed by Radically Open Security and implement mitigations for problems found by them.

### 6\. Implement MUC UI management (add/remove/promote users etc.)

While Monal supports MUCs (multi user chats) in its flavours “channel” and “group”, the app is still lacking proper support for creating and managing group-type MUCs. We will implement that missing piece in this task.

### 7\. Port addContact UI to SwiftUI

The existing UI to add a contact or show pending contact requests is not user-friendly. We will therefore port it to SwiftUI. Once contacts can be added using the new UI, a UI for creating MUCs will be added. Monal will then support the creation of new private MUCs. Additionally, the existing functionality to scan contact QR-Codes and open contact links from other apps / iOS camera will be refactored. After the refactoring the user can preview the action and select an appropriate account before adding the contact.

### 8\. Add SASL mechanism upgrade capability to XEP-0388

XEP-0388 (“Extensible SASL Profile”) modernizes the old XMPP SASL profile defined in RFC 6120 and reduces round-trips. But neither the old SASL profile nor the new one (dubbed SASL2) solve the problem of SASL mechanism upgrades. A server that saves the hashed password for SCRAM-SHA-1 authentication has no way of upgrading to SCRAM-SHA-256. It does not know the cleartext password to calculate the hash to store itself and no way to ask the client for it. We want to take the opportunity and update the SASL2 XEP before it gets widely deployed to provide a way for a smooth upgrade path that allows the servers to store multiple hashes and get new hashes provided by clients that support the new algorithm without the need of ever knowing the cleartext password.

### 9\. Implement SASL2 in Monal (including SCRAM SHA1, SHA256 and SHA512)

Implement the updated SASL2 XEP and the accompanying XEP-0440 (“SASL Channel-Binding Type Capability”) in Monal which serves as foundation for the implementation of XEP-0397 (“Instant Stream Resumption”).

### 10\. Write new XEP for downgrade protection of channel-binding types and SASL mechanisms and implement it

A Man-In-The-Middle capable of impersonating the XMPP server on the TLS level can use SASL Mechanism
Stripping and/or strip channel-binding types to downgrade the security. Adding an optional SCRAM attribute
containing the hash of all server-advertised SASL mechanisms and channel-binding types as seen by the client
will enable the server to check if any downgrade took place and to abort the authentication, if so. Because the
SCRAM attribute will be part of the mutual authentication between client and server, a MITM will not be able to
forge it.

