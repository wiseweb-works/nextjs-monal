---
title: "Monal Internals - Handlers framework"
date: 2023-07-12

tags: []
author: "Thilo Molitor"
---

In this new series, I want to shine some light onto specific parts of Monal's internals. It's dedicated to programmers or people curious about how Monal works internally.
If you want to give some feedback, feel free to send an email to [thilo@monal-im.org](mailto:thilo@monal-im.org)

**Other articles in this series:**
- [Monal Internals - XML Query Language](00014-monal-internals-xml-query-language)

# Handlers
Handlers in Monal are something like serializable callbacks. 
In iOS the app can get frozen or even killed any time and the push implementation requires the complete app state to frequently
transition between the Main App and the Notification Service App Extension (NSE). Using normal callbacks (called blocks in ObjC)
is not possible because blocks are not serializable which means they could not survive an app kill or transition to / from the NSE.

Short overview:
- Simple generalized concept usable throughout the app
- Leverages dynamic language features of ObjC
- "Serializable callbacks" to class / instance methods of ObjC classes
- Bind values (_not vars_) when creating a handler (e.g. to bind state to handler that can be serialized together with the handler)
- Bind vars when calling handler (overwriting creation-time bound values having the same name)
- Used in various places throughout the app like the IQ or PubSub framework (see [Code examples found in the wild](#code-examples-found-in-the-wild))
- [Jump directly to list of supported data types](#available-data-types)

## Usage description with examples

### Define handler method
This will be a static class method and doesn't have to be declared in any
interface to be usable. The argument number or order does not matter,
feel free to reorder or even remove arguments you don't need.
Arguments declared with $$-prefix are mandatory and can not be removed, though.
Arguments with $_-prefix are optional and can be removed.
Primitive datatypes like BOOL, int, NSINTEGER (aka $$INTEGER) etc. can not be
imported as optional and are always mandatory.

```objc
$$class_handler(myHandlerName, $_ID(xmpp*, account), $$BOOL(success))
    // your code comes here
    // variables defined/imported: account (optional), success (mandatory)
$$
```

Instance handlers are instance methods instead of static methods.
You need to specify on which instance these handlers should operate.
The instance extraxtion statement (the second argument to $$instance_handler() can be everything that
returns an objc object. For example: `account.omemo` or `[account getInstanceToUse]` or just `account`.

```objc
$$instance_handler(myHandlerName, instanceToUse, $$ID(xmpp*, account), $$BOOL(success))
    // your code comes here
    // 'self' is now the instance of the class extracted by the instanceToUse statement.
    // instead of the class instance as it would be if $$class_handler() was used instead of $$instance_handler()
    // variables defined/imported: account, success (both mandatory)
$$
```

### Call defined handlers
Calling a defined handler is simple, just create a handler object using `$newHandler()` and `$call()` it.
```objc
MLHandler* h = $newHandler(ClassName, myHandlerName);
$call(h);
```

### Bind variables when creating a handler
You can bind variables to MLHandler objects when creating them and when
invoking them. Variables supplied on invocation overwrite variables
supplied when creating the handler if the names are equal.
Variables bound to the handler when creating it have to conform to the
NSCoding protocol to make the handler serializable.

```objc
NSString* var1 = @"value";
MLHandler* h = $newHandler(ClassName, myHandlerName,
        $ID(var1),
        $BOOL(success, YES)
}));
xmpp* account = nil;
$call(h, $ID(account), $ID(otherAccountVarWithSameValue, account))
```

### Usable shortcuts to create MLHandler objects:
  - `$newHandler(ClassName, handlerName, boundArgs...)`
  - `$newHandlerWithInvalidation(ClassName, handlerName, invalidationHandlerName, boundArgs...)`

### Using invalidation handlers
You can add an invalidation method to a handler when creating the
MLHandler object (after invalidating a handler you can not call or
invalidate it again!). Invalidation handlers can be instance handlers or static handlers,
just like with "normal" handlers:

```objc
// definition of normal handler method as instance_handler
$$instance_handler(myHandlerName, [account getInstanceToUse], $_ID(xmpp*, account), $$BOOL(success))
        // your code comes here
        // 'self' is now the instance of the class extracted by [account getInstanceToUse]
        // instead of the class instance as it would be if $$class_handler() was used instead of $$instance_handler()
$$

// definition of invalidation method
$$class_handler(myInvalidationHandlerName, $$BOOL(done), $_ID(NSString*, var1))
        // your code comes here
        // variables imported: var1, done
        // variables that could have been imported according to $newHandler and $call below: var1, success, done
$$

MLHandler* h = $newHandlerWithInvalidation(ClassName, myHandlerName, myInvalidationHandlerName,
        $ID(var1, @"value"),
        $BOOL(success, YES)
}));

// call invalidation method with "done" argument set to YES
$invalidate(h, $BOOL(done, YES))
```

### Available data types
The following datatypes can be bound to a handler defining them using the corresponding definitions having either the `$$` or `$_` prefix.
If the single argument binding is used, the value is bound using the same name like the var the value is coming from (in this example: name).
* define: `$$ID(NSObject*, name)`, `$_ID(NSObject*, name)`, bind: `$ID(name)`, `$ID(name, value)`
* define: `$$HANDLER(name)`, `$_HANDLER(name)`, bind: `$HANDLER(name)`, `$HANDLER(name, value)`
* define: `$$BOOL(name)`, bind: `$BOOL(name)`, `$BOOL(name, value)`
* define: `$$INT(name)`, bind: `$INT(name)`, `$INT(name, value)`
* define: `$$DOUBLE(name)`, bind: `$DOUBLE(name)`, `$DOUBLE(name, value)`
* define: `$$INTEGER(name)`, bind: `$INTEGER(name)`, `$INTEGER(name, value)`, _this corresponds to the NSInteger type alias_
* define: `$$UINTEGER(name)`, bind: `$UINTEGER(name)`, `$UINTEGER(name, value)`, _this corresponds to the NSUInteger type alias_

## Code examples found in the wild

### Enabling carbons
```objc
if([features containsObject:@"urn:xmpp:carbons:2"])
{
    DDLogInfo(@"got disco result with carbons ns");
    if(!account.connectionProperties.usingCarbons2)
    {
        DDLogInfo(@"enabling carbons");
        XMPPIQ* carbons = [[XMPPIQ alloc] initWithType:kiqSetType];
        [carbons addChildNode:[[MLXMLNode alloc] initWithElement:@"enable" andNamespace:@"urn:xmpp:carbons:2"]];
        [account sendIq:carbons withHandler:$newHandler(self, handleCarbonsEnabled)];
    }
}
```

```objc
$$class_handler(handleCarbonsEnabled, $$ID(xmpp*, account), $$ID(XMPPIQ*, iqNode))
    if([iqNode check:@"/<type=error>"])
    {
        DDLogWarn(@"carbon enable iq returned error: %@", [iqNode findFirst:@"error"]);
        [HelperTools postError:[NSString stringWithFormat:NSLocalizedString(@"Failed to enable carbons for account %@", @""), account.connectionProperties.identity.jid] withNode:iqNode andAccount:account andIsSevere:YES];
        return;
    }
    account.connectionProperties.usingCarbons2 = YES;
$$
```

### Fetching OMEMO bundles
```objc
NSString* bundleNode = [NSString stringWithFormat:@"eu.siacs.conversations.axolotl.bundles:%@", deviceid];
[self.account.pubsub fetchNode:bundleNode from:jid withItemsList:nil andHandler:$newHandler(self, handleBundleFetchResult, $ID(rid, deviceid))];
```

```objc
$$instance_handler(handleBundleFetchResult, account.omemo, $$ID(xmpp*, account), $$ID(NSString*, jid), $$BOOL(success), $_ID(XMPPIQ*, errorIq), $_ID(NSString*, errorReason), $_ID((NSDictionary<NSString*, MLXMLNode*>*), data), $$ID(NSString*, rid))
    if(!success)
    {
        if(errorIq)
            DDLogError(@"Could not fetch bundle from %@: rid: %@ - %@", jid, rid, errorIq);
        else
            DDLogError(@"Could not fetch bundle from %@: rid: %@ - %@", jid, rid, errorReason);
    }
    else
    {
        // check that a corresponding buddy exists -> prevent foreign key errors
        MLXMLNode* receivedKeys = [data objectForKey:@"current"];
        if(!receivedKeys && data.count == 1)
        {
            // some clients do not use <item id="current">
            receivedKeys = [[data allValues] firstObject];
        }
        else if(!receivedKeys && data.count > 1)
        {
            DDLogWarn(@"More than one bundle item found from %@ rid: %@", jid, rid);
        }
        if(receivedKeys)
        {
            [self processOMEMOKeys:receivedKeys forJid:jid andRid:rid];
        }
    }
$$
```
