---
title: "Push on iOS"
date: 2023-02-04

tags: []
author: "Thilo Molitor"
---

I recently wrote a summary about push on iOS in the xmpp.org wiki.  
See [over here](https://wiki.xmpp.org/web/Push_notifications) for all the technical details and links to the documentation.
I also talked about that topic in my talk "_Modern XMPP - A story based on Monal_" linked [on the About page over here](/about).  
For convenience I'd like to summarize some parts of that wiki entry in this blog-post, too.

**UPDATE:** This post describes the way Monal implements push as well as the pitfalls of implementing it in another way. I tried to make this clearer in the text now.

# Background knowledge: Push on iOS
On iOS there are several push modes having different properties. All modes, except VoiIP pushes, have in common, that they only provide 30 seconds of background time.
- **VoIP pushes:** MUST always make the device ring via Apple's CallKit framework. You can't use these pushes to silently retrieve messages or other XMPP stanzas in the background.
- **Low priority pushes:** These pushes don't show any user-visible notification, but they can be dropped or arbitrarily delayed by Apple. They grant 30 seconds of background time.
- **High priority pushes:** These MUST show a user-visible notification. They grant 30 seconds of background time.
  - **But:** Since iOS 13.3, apps having the `com.apple.developer.usernotifications.filtering` entitlement are allowed to suppress the user-visible notification. To cite Apple:
    >This entitlement is intended for certain types of apps — such as messaging apps or location sharing apps — that use notification service extensions to receive push notifications without delivering notifications to the user.

High priority pushes in combination with the `com.apple.developer.usernotifications.filtering` entitlement are not only used by Monal, but some other popular messaging apps, too (links to the source):
- [WhatsApp](https://www.reddit.com/r/TweakBounty/comments/z9oyf7/comment/iyirqor/?utm_source=reddit&utm_medium=web2x&context=3)
- [Signal](https://github.com/signalapp/Signal-iOS/blob/main/SignalNSE/SignalNSE-AppStore.entitlements#L7)
- [Threema](https://github.com/threema-ch/threema-ios/blob/main/ThreemaNotificationExtension/SupportingFiles/ThreemaForWorkRedNotificationExtension.entitlements#L7)
- [Telegram](https://github.com/TelegramMessenger/Telegram-iOS/blob/master/build-system/fake-codesigning/profiles/NotificationService.mobileprovision) (binary)

# Monal
Monal is using this entitlement to wake up background processing without sending any message data through Apple's servers (not even ecrypted data).
When iOS grants the app it's 30 seconds background time because of the incoming push, Monal then connects to the XMPP server over the network to retrieve the actual message
and display a notification to the user, if needed.

Signal does exactly the same:  It uses push only to wake up the app and then fetches the messages using a dedicated network connection: [Example in Signal's code](https://github.com/signalapp/Signal-iOS/blob/main/SignalNSE/NotificationService.swift#L236)

**This way Monal avoids all of the pitfalls depicted below!**

# Diving deeper: Some more details about iOS push and XMPP
The following explanations and thoughts are a bit more technical and require some understanding of the XMPP protocol and it's inner workings.

## Push server implementations and iOS time limits

Pushes of all types (see above) can only wake up the iOS app for 30 seconds. But in most cases that's more than enough to connect to the xmpp server and retrieve pending stanzas (if using the entitlement mentioned above and XEP-0198, it is even possible to get pushes for iq stanzas etc., thus behaving like being permanently connected while still sleeping most of the time because of CSI).
Even if the 30 seconds don't suffice, the client can disconnect and both, Prosody and eJabberd, will send another push if there are still unacked stanzas in the XEP-0198 queue. This will give the app another 30 seconds. Even longer catchups lasting for > 5 minutes can be done completely in the background this way (observed in the wild with Monal stable).

This means that even with the 30 second time limit in place, it usually is possible to do a longer lasting catchup completely in the background, effectively extending the time limit to several minutes. 
This obviously only holds, if you use the `com.apple.developer.usernotifications.filtering` entitlement and connect directly to the xmpp server and is hardly possible if you try to transport stanzas through the push sent through Apple (see below).

## Pitfalls: Transporting (encrypted) xmpp message stanzas through push (out of band)

When using the iOS push infrastructure provided by apple for transporting (encrypted) stanzas out of band, multiple things have to be considered. First of all, pushes can get lost. That frequently happens if the device was in flight mode while the push was sent.
Second, xmpp is a streaming protocol, strongly relying on the ordering of stanza (even inter-type ordering like the ordering of message and iq stanzas for mam). The order of message stanza matters for other XEPs, too (for example message retraction or last message correction). Using the iOS push service which is loosing pushes or even only sending pushes for a particular type of stanza (message stanzas having a body for example) breaks this ordering of events that every XEP implicitly relies upon.
The payload sizes allowed for each push are also somewhat low (~4kb including some of the push metadata).
OMEMO's self-healing through key-transport-elements requires the client to send those key-transport message stanzas once a broken session gets detected. But using the push service for data transport is a one way channel only.

Last but not least the UX can be really degraded if a user does not open the app for some hours (while still receiving push notifications). Once they open the app, a long mam catchup has to be waited for until the ui does reflect what the user already saw in notifications. If the device has no connectivity when the user opens it, they might even be really confused why those messages they alread saw a notification for are not displayed in the app at all). Writing incoming messages to the database to solve this will only make the ordering problem depicted above harder. The client not being able to execute the OMEMO self-healing stuff mentioned above will degrade UX further.

NOT using the entitlement mentioned above will prevent the client from receiving push notifications for XEP-0333 read markers and remove already displayed notifications instead of posting a new one (because apps not having that entitlement are forced to show a notification for each incoming high priority push, even if the push was only for a XEP-0333 read marker).
**To be clear: without that entitlement neither message retraction nor XEP-0333 read markers can be implemented reliably!**  
_And if an app has the entitlement:_ why bother delivering some stanzas out of band and running into the ordering problem if the app could as well connect to the xmpp server in the background and retrieve all pending stanzas in the right order?
