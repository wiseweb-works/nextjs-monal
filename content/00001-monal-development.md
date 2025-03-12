---
title: "Insights Into Monal Development"
date: 2022-03-07

tags: []
author: "Monal"
---
> TLDR:
>
> _Info: Monal will stop support for iOS 12, iOS 13 and macOS Catalina!  
> We are searching for a SwiftUI developer.  
> We need a new simplified website.  
> With better continuous funding, our push servers will move from the US to Europe.  
> We have a new support mail: info@monal-im.org_

Two years ago we decided to rewrite the Monal app almost entirely and improve it gradually in the process, instead of creating another XMPP Client for iOS and macOS. We successfully managed to transform Monal from an app that had flaws and issues with many functions to a level that promotes a user-friendly experience with working features such as push notification, group chat, and partially end-to-end encryption support (OMEMO). If you are selecting an XMPP client for Apple systems we think that Monal is a great choice nowadays. We have been investing more than a thousand hours and worked hard to overcome all the flaws, the legacy app had. We invite you to give the recent beta a try!

The development of Monal has not yet finished though, and many more features are hopefully to come. But due to our time constraints, it sometimes takes a bit longer than we and the community would like. We are at most two developers at the moment using our spare time to maintain Monal and develop new features. As we are developing Monal in our spare time without decent funding, it is sometimes hard to prioritize specific features. Please give this circumstance some credits.

### What should Monal look like in the future?

To give you a bit of insight knowledge of our plans we tried to summarize the most important tasks.

#### Interface (SwiftUI)

In the future Monal should be easy to use. Therefore, the interface requires a proper rework and while we are at it, it should be ported to SwiftUI. While we are still improving in designing with SwiftUI, we would be glad if there is a SwiftUI & Open Source enthusiast who would like to help us with this.  
With this transition we would like to improve the accessibility of the app as well. If you like to support an open source project, and you would like to be part of our SwiftUI journey please contact us.

Task:

*   Add new MUC creation and management UI
*   Port the chat view
*   Finish contact Details
    *   List group chat (MUC) participants
    *   Display OMEMO encryption fingerprints for verification
*   Port our settings
*   Port all other remaining views

Qualifications:

*   General knowledge around SwiftUI (iOS and Catalyst)
*   Interest in improving a (XMPP) chat client
*   Optional, but preferred: Some experience with XMPP (e.g. some weeks, or maybe months of usage of Monal or any other “modern” XMPP client)
*   Optional: Experience in designing inclusive / accessible UI

#### Website

We need a modern (simplified) Hugo based website that is easier to understand, similar to Conversations, Dino or Gajim.

If you have some spare time, and you are a skilled in creating websites with Hugo please contact us.

Requirements:

*   Simple design nothing too fancy
*   Privacy by design → No analytics, no external CSS, jss, … usage

#### OMEMO Encryption in Group Chat (MUC)

We started to integrate OMEMO for group chats (MUC) into our alpha build. The receiving and sending sides are already implemented, but there are a few more steps until we can release it into the beta.

#### Switching to our new Domain monal-im.org

In late 2021 we decided that we would like to have a domain with [DNSSEC](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) as our current top level domain does not support it. This domain will mainly be used for our push servers and mail servers in the future. From now on you will be able to reach us via info@monal-im.org.

#### Build server

Thanks to ~20 generous donors, we were able to buy a new build server that will be used to build our alpha, beta and stable releases. Furthermore, Thilo is now finally able to debug code with a proper debugger connected to his phone.

#### Redundant Push Servers

We are currently using an AWS US instance for our push server that is not redundant and failed in 2021 more frequently than we liked it to. For that reason we started an internal project to auto-deploy our push server with Ansible and looked into ways for running a redundant push server setup. The first tests look promising so far, but a few more things need to be sorted out before we can switch over to our new setup.

Before we can switch to the new push server setup, we need a stable funding each month. We estimate that renting a VM in Germany and one at a different hoster in Finland would cost us between 16€ to 32€ each month. Without a stable funding we might not be able to afford this new setup and our push servers would stay in the US.

Thanks to our generous build server donors, we have a few bucks left that will be used as a ~5 month buffer in case of fluctuant push server funding

#### Privacy improved push servers

With our current push implementation our so-called “app servers” see your JID (username + server), a unique but otherwise opaque device id and an opaque token generated by apple, as well as your interaction times (when you register for push notifications, timestamps when your XMPP server triggers a push notification device).  
If you use multiple accounts on one device, the unique device id is shared across all accounts. We don’t think that this is ideal, as we know all jid’s a user is using.  
In the future we want to try to reduce our knowledge by hiding your username from our app servers. If our idea works, we would only see that a device is registered on one or more domains and the timestamps that a push message was triggered from each domain that is used.

#### Audio and Video Calls

Many clients such as Conversations and Dino support audio and video calls, so Monal should be next 🙂

#### End-of-life: iOS 12, iOS 13 and macOS Catalina will not be supported anymore

Our user group on iOS 12, iOS 13 as well as macOS Catalina has decreased in last years while the resources needed to maintain these old platforms increased. We therefore decided to focus on newer iOS versions and drop the old ones. The next stable release will only be supported on iOS 14 and higher and macOS Big Sur and higher. We are still unsure how long we will support iOS 14, as most of the devices also support iOS15.

Donations and Support
---------------------

Monal is developed by volunteers and community collaboration. The work which has been done is usually not paid, and the developers need to keep up service costs and development in the future! Please consider giving a bit back for the hard work which has been conducted. Currently, there are three ways to financially support the Monal development:

*   Donate via [GitHub Sponsors](https://github.com/sponsors/tmolitor-stud-tu)
*   Donate via [Libera Pay](https://liberapay.com/tmolitor)
*   EU citizens can donate via SEPA, too. Just contact Thilo Molitor via mail to [info@monal-im.org](mailto:info@monal-im.org) to get his IBAN.

Here you can read about further [support of the development](https://github.com/monal-im/Monal/issues/363)! Find general information in the [Monal Wiki](https://github.com/monal-im/Monal/wiki).

#### Translations

We host and manage translations via [Weblate](https://hosted.weblate.org/engage/monal/).

#### Many thanks!

Of course, thank you very much to everyone who supported us in the past two years! 🙂

You can follow us via [Mastodon](https://fosstodon.org/@Monal).
