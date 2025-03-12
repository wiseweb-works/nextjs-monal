---
title: "Monal Internals - XML Query Language"
date: 2024-09-09

tags: []
author: "Thilo Molitor"
---

In this new series, I want to shine some light onto specific parts of Monal's internals. It's dedicated to programmers or people curious about how Monal works internally. If you want to give some feedback, feel free to send an email to thilo@monal-im.org

**Other articles in this series:**
- [Monal Internals - Handlers framework](00007-monal-internals-handlers)

# The `MLXMLNode` methods
All incoming and outgoing XMPP stanzas are parsed to/from an instance of nested `MLXMLNode` elements.
This class therefore provides some methods for creating such elements as well as querying them.
In this chapter I want to briefly introduce some parts of the `MLXMLNode` interface before diving into our XML Query Language in the next chapter.

## Creating an `MLXMLNode`
There are several initializers for `MLXMLNode`:
```objc
-(id) initWithElement:(NSString*) element;
-(id) initWithElement:(NSString*) element andNamespace:(NSString*) xmlns;
-(id) initWithElement:(NSString*) element andNamespace:(NSString*) xmlns withAttributes:(NSDictionary*) attributes andChildren:(NSArray*) children andData:(NSString* _Nullable) data;
-(id) initWithElement:(NSString*) element withAttributes:(NSDictionary*) attributes andChildren:(NSArray*) children andData:(NSString* _Nullable) data;
-(id) initWithElement:(NSString*) element andData:(NSString* _Nullable) data;
-(id) initWithElement:(NSString*) element andNamespace:(NSString*) xmlns andData:(NSString* _Nullable) data;
```

The initializers not taking a namespace argument will create XML nodes that automatically inherit the namespace of their containing node, once added to a tree of XML nodes.

When nesting `MLXMLNode`s , it looks like this:
```objc
MLXMLNode* exampleNode = [[MLXMLNode alloc] initWithElement:@"credentials" andNamespace:@"urn:xmpp:extdisco:2" withAttributes:@{} andChildren:@[
    [[MLXMLNode alloc] initWithElement:@"service"  withAttributes:@{
        @"type": service[@"type"],
        @"host": service[@"host"],
        @"port": service[@"port"],
    } andChildren:@[] andData:nil]
] andData:nil]
```

## Querying a (possibly nested) `MLXMLNode`
All XML queries are implemented as an interface of `MLXMLNode` as well. For XML queries this class has three different methods:
```objc
-(NSArray*) find:(NSString* _Nonnull) queryString, ... NS_FORMAT_FUNCTION(1, 2);
-(id) findFirst:(NSString* _Nonnull) queryString, ... NS_FORMAT_FUNCTION(1, 2);
-(BOOL) check:(NSString* _Nonnull) queryString, ... NS_FORMAT_FUNCTION(1, 2);
```

`find:` will return an `NSArray` listing all results matching your query, `findFirst:` will only return the first result of your query (or nil if the resulting `NSArray` was empty). This should be used, if you are certain that there should only be one element matching (or none at all). `check:` can be used to determine if `find:` would return an empty `NSArray`.

All three methods take a string argument possibly containing `printf`-style format specifiers including the `%@` specifier as supported by `NSString stringWithFormat:` and a variable argument list for providing the values for these format specifiers.

# The Query Language
To query single values out of a complex XML stanza, we use a XML query language inspired by XPath, but **not** compatible with it.
Instead, our language, as implemented in Monal, is a strict superset of Prosody's query language as documented in [Prosody's documentation of util.stanza](https://prosody.im/doc/developers/util/stanza#stanzafind_path). This makes it possible to copy over queries from Prosody and directly use them in Monal without any modification.

The query language consists of a `path` followed by an optional `extraction command` and `conversion command` and is parsed by complex regular expressions in `MLXMLNode.m`. These regular expressions and the usage of the xml language throughout Monal were [security audited in 2024](https://monal-im.org/post/00011-security-audit-1/).

 **_Note:_** If the following description talks about the `find:` method, the `findFirst:` and `check:` methods are automatically included.

## Path Segments
The path is built of `/`-separated segments each representing an XML node, selected by either an XML namespace or an element name or both. The XML namespace is wrapped in `{ }` and prefixes the element name. 
Each path segment is used to select all XML nodes matching the criteria listed in this path segment.
The special wildcard value `*` for element name or namespace mean "any namespace" or "any element".

If the namespace is omitted, the namespace of the parent node in the XML tree the query is acted upon is used (or `* `, if there is no parent node), see _example 0_. The namespace of the parent node is used even if the `find:` method is executed on a child XML node, see _example 1_. The element name can not be omitted and should be set to `*` if unknown.

A path beginning with a `/` is called a `rooted query`. That means the following first path segment is to be used to select the node the `find:` method is called on, if the leading `/` is omitted, the first path segment is used to select the **child nodes** of the node the `find:` method is called on.

**_Note:_** If using such a `rooted query` to access attributes, element names etc. of the XML node the whole query is acting upon, both the element name and namespace can be fully omitted and are automatically replaced by `{*}*`. This allows us to write queries like `/@h|int"` or `/@autojoin|bool`.

The special path segment with element name `..` not naming any namespace or other selection criteria (e.g. `/../`) will ascend one node in the XML node tree to the parent of the XML node that the query reached and apply the remaining query to this XML node. Thus using `/{jabber:client}iq/{http://jabber.org/protocol/pubsub}pubsub/items/../../../@type` will return the value of the type attribute on the root element (the `{jabber:iq}iq`).

**_Note:_** Not using an extraction command (see the next chapter below) will return the matching `MLXMLNode`s _as reference_. Changing the attributes etc. of that reference will change the original `MLXMLNode` in the XML tree it is part of.
If you don't want that, you'll have to call `copy` on the returned `MLXMLNode`s to decouple them from their original.

**Example 0:**
```xml
<message from='test@example.org' id='some_id' xmlns='jabber:client'>
    <body>Message text</body>
    <body xmlns='urn:some:different:namespace'>This will NOT be used</body>
</message>
```
```objc
MLXMLNode* message = <the stanza above as MLXMLNode tree>;
NSArray<NSString*>* bodyStrings = [message find:@"body#"];

MLAssert(bodyStrings.count == 1, @"Only one body text should be returned!");
MLAssert([bodyStrings[0] isEqualToString:@"Message text", @"The body with inherited namespace 'jabber:client' should be used!");
```

**Example 1:**
```xml
<message from='test@example.org' id='some_id' xmlns='jabber:client'>
    <body>Message text</body>
</message>
```
```objc
MLXMLNode* message = <the stanza above as MLXMLNode tree>;
NSString* messageId = [message findFirst:@"/@id"];

MLAssert([messageId isEqualToString:@"some_id", @"The extracted message id should be 'some_id'!");
```

### More selection criteria
- **Not element name:**  
If you want to select all XML nodes **not** having a specified name, you'll have to prefix the element name with `!`. This will negate the selection, e.g. `!text` will select all XML nodes **not** named `text`, see _example 2_.
- **Element attribute equals value**:  
If you want to select XML nodes on the basis of their XML attributes, you can list those attributes as `attributeName=value` pairs each inside `< >`, see _example 3_. You can use format string specifiers in the value part of those pairs to replace those with the variadic arguments of `find:`. The order of variadic arguments has to resemble _all_ format specifiers of the complete query string given to `find:` Note: the value part of those pairs can not be omitted, use regular expression matching to select for mere XML attribute presence (e.g. `<attributeName~^.*$>`).
- **Element attribute matches regular expression**:  
To select XML nodes on the basis of their XML attributes, but using a regular expression, you'll have to use `attributeName~regex` pairs inside `< >`. No format string specifiers will be replaced inside your regular expression following the `~`. You'll have to use `^` and `$` to match begin and end of the attribute value yourself, e.g. `<attributeName~.>` will match all attribute values having **at least** one character, while `<attributeName~^.$>` will match all attribute values having **exactly** one character.

**Example 2:**
```xml
<stream:error>
    <not-well-formed xmlns='urn:ietf:params:xml:ns:xmpp-streams'/>
    <text xmlns='urn:ietf:params:xml:ns:xmpp-streams'>Some descriptive Text...</text>
</stream:error>
```
```objc
MLXMLNode* streamError = <the stanza above as MLXMLNode tree>;
NSString* errorReason = [streamError findFirst:@"{urn:ietf:params:xml:ns:xmpp-streams}!text$"];

MLAssert([errorReason isEqualToString:@"not-well-formed"], @"The extracted error should be 'not-well-formed'!");
```

**Example 3 (also using an extraction command, see below):**
```xml
<iq id='605818D4-4D16-4ACC-B003-BFA3E11849E1' to='user@example.com/Monal-iOS.15e153a8' xmlns='jabber:client' type='result' from='asdkjfhskdf@messaging.one'>
    <pubsub xmlns='http://jabber.org/protocol/pubsub'>
        <subscription node='eu.siacs.conversations.axolotl.devicelist' subid='6795F13596465' subscription='subscribed' jid='user@example.com'/>
    </pubsub>
</iq>
```
```objc
MLXMLNode* iq = <the stanza above as MLXMLNode tree>;
NSString* subscriptionStatus = [iq findFirst:@"/<type=result>/{http://jabber.org/protocol/pubsub}pubsub/subscription<node=%@><jid=%@>@subscription", @"eu.siacs.conversations.axolotl.devicelist", @"user@example.com"];

MLAssert([subscriptionStatus isEqualToString:@"subscribed"], @"The extracted value of the subscription attribute should be 'subscribed'!");
```

## Extraction Commands
An extraction command can be appended to the last path segment. Without those extraction commands, `find:` will return the full `MLXMLNode` matching the selection criteria of the XML query. If you rather want to read a special attribute, element value etc. of the full XML node, you'll have to use one of the extractions commands below

- `@attributeName`:  
This will return the value of the attribute named after the `@` as `NSString`, use a conversion command to convert the value to other data types.
- `@@`:
This will return all attributes of the selected XML node as key-value-pairs in an `NSDictionary`. No conversion commands can be used together with this extraction command.
- `#`:
This will return the text contents of the selected XML node as `NSString`, use a conversion command to convert the value to other data types.
- `$`:
This will return the element name of the selected XML node as `NSString`. This is only really useful if the last path segment contained a wildcard element name or its element name was negated. A Conversion command can be used to convert the returned element name to other data types as well.

For data-form ([XEP-0004](https://xmpp.org/extensions/xep-0004.html)) subqueries, see the corresponding section below.

## Conversion Commands
Conversion commands can be used to convert the returned `NSString` of an extraction command to some other data type. Conversion commands can not be used without an extraction command and must be separated from the preceeding extraction command by a pipe symbol (`|`).
The following conversions are currently defined:

- `bool`:  
This will convert the extracted `NSString` to an `NSNumber` representing a `BOOL`. `true`/`1` becomes `@YES` and `false`/`0` becomes `@NO`. This is in accordance to the representation of truth values in XMPP.
- `int`:  
This will convert the extracted `NSString` to an `NSNumber` representing a `NSInteger` (`integerValue` property).
- `uint`:  
This will convert the extracted `NSString` to an `NSNumber` representing a `NSUInteger` (`unsignedIntegerValue` property).
- `double`:  
This will convert the extracted `NSString` to an `NSNumber` representing a `double` (`doubleValue` property).
- `datetime`:  
This will use the `HelperTools` method `parseDateTimeString:` to parse the given `NSString` into an `NSDate` object.
- `base64`:  
This will use the `HelperTools` method `dataWithBase64EncodedString:` to parse the given `NSString` into an `NSData` object.
- `uuid`:  
This will try to parse the given `NSString` into an `NSUUID` object using the `initWithUUIDString` initializer of `NSUUID`. This will return `nil` for an invalid string, which will omit this result from the `NSArray` returned by `find:` (`findFirst:` will return nil, and `check:` will return NO).
- `uuidcast`:  
This will do the same as the `uuid` conversion command for valid uuid strings, but use the `HelperTools`method `stringToUUID` to cast any other given string to a UUIDv4 by hashing it using SHA256 and arranging the result to resemble a valid UUIDv4.

**Example 4 (attribute extraction command together with a `bool` conversion command):**
```xml
<iq type='result' id='juliet1'>
  <fin xmlns='urn:xmpp:mam:2' complete='true'>
    <set xmlns='http://jabber.org/protocol/rsm'>
      <first index='0'>28482-98726-73623</first>
      <last>09af3-cc343-b409f</last>
    </set>
  </fin>
</iq>
```
```objc
MLXMLNode* iqNode = <the stanza above as MLXMLNode tree>;
if([[iqNode findFirst:@"{urn:xmpp:mam:2}fin@complete|bool"] boolValue])
    DDLogInfo(@"Mam query finished")
```

**Example 5 (attribute extraction command together with a `datetime` conversion command):**
```xml
<message from='romeo@montague.net/orchard' to='juliet@capulet.com' type='chat'>
    <body>O blessed, blessed night! I am afeard.</body>
    <delay xmlns='urn:xmpp:delay' from='capulet.com' stamp='2002-09-10T23:08:25Z'/>
</message>
```
```objc
MLXMLNode* messageNode = <the stanza above as MLXMLNode tree>;
NSDate* delayStamp = [messageNode findFirst:@"{urn:xmpp:delay}delay@stamp|datetime"];

MLAssert(delayStamp.timeIntervalSince1970 == 1031699305, @The delay stamp should be 1031699305 seconds after the epoch!");
```

**Some more queries as found in our codebase:**
- `{urn:xmpp:jingle:1}jingle<action~^session-(initiate|accept)$>`
- `error/{urn:ietf:params:xml:ns:xmpp-stanzas}item-not-found`
- `{urn:xmpp:avatar:metadata}metadata/info`
- `{urn:xmpp:avatar:data}data#|base64`

# The data-forms (XEP-0004) query language extension
To query fields etc. of a [XEP-0004](https://xmpp.org/extensions/xep-0004.html) data-form, the last path segment of an XML query can contain a data-forms subquery.
Thes parser for these subqueries is an `MLXMLNode` extension implemented in `XMPPDataForm.m` and glued into `MLXMLNode.m` as the extraction command `\` (backslash). This extraction command is also special as it has to be terminated by a `\` (optionally followed by a conversion command, see below).

**_Note:_** since our query is a string, double backslashes (`\\`) have to be used because of string escaping rules.

Like other extraction commands, these subqueries must be in the last path segment. Naming the element name and namespace of the node this extraction command is applied to, is optional and automatically defaults to name `x` and namespace `jabber:x:data` as defined by [XEP-0004](https://xmpp.org/extensions/xep-0004.html).

This query language extension is its own small query language tailored to data-forms implemented in `-(id _Nullable) processDataFormQuery:(NSString*) query;`.
To ease its use, this language reuses some constructs of the main query language, but gives them a new meaning:

- **"Namespace" and "element name":**  
The subquery can begin with something looking like a namespace and element name (both optional) like so: `{http://jabber.org/protocol/muc#roominfo}result`. The "element name" is used to select data forms with this form-type (`result` in this case). The "namespace" is used to select data-forms with a form field (usually of type hidden) with name `FORM_TYPE` having this value, see _example 6_. The special form-type `*` and `FORM_TYPE` value `*` can be used to denote "any form-type" and "any FORM_TYPE field value".
- **Item index:**  
This is something not present in the main query language. Between the form-type (the "element name", see above) and the "extraction command" (see below) an index in square brackets is allowed (`[0]`). An example query using an index as seen in our codebase would be `\\result[0]@expire\\` or `\\[0]@expire\\`. An index is only allowed for data-forms having multiple item elements encapsulating the form fields, see [example 8 of XEP-0004](https://xmpp.org/extensions/xep-0004.html#example-8). If the index is out of bounds (e.g. greater than or equal to the count of `<item/>` XML nodes in the form), the data-form query will return nil, which will be omitted from the resulting `NSArray` by the `MLXMLNode` implementation of `find:` (`findFirst:` will return nil, and `check:` will return NO).
- **Extraction command:**  
Data-Form subqueries have only two extraction commands: `@fieldName` and `&fieldName`. `@fieldName` is used to extract the value of that field, while `&fieldName` returns an `NSDictionary` describing that field, like returned with the `-(NSDictionary* _Nullable) getField:(NSString* _Nonnull) name;` method of `XMPPDataForm`. 

**_Note:_** The implementation in `XMPPDataForm.m` has many useful methods for creating and working with [XEP-0004](https://xmpp.org/extensions/xep-0004.html) data-forms. Make sure to check out `XMPPDataForm.h` or the implementation in `XMPPDataForm.m`.

**_Note:_** An `@fieldName` extraction command can be used together with a conversion command, see _example 6_. Conversion commands are not allowed for `&fieldName` extraction commands or data-form queries not using an extraction command at all (e.g. returning the whole data-form).

**Example 6:**
```xml
<iq from='upload.montague.tld' id='step_02' to='romeo@montague.tld/garden' type='result'>
  <query xmlns='http://jabber.org/protocol/disco#info'>
    <identity category='store' type='file' name='HTTP File Upload' />
    <feature var='urn:xmpp:http:upload:0' />
    <x type='result' xmlns='jabber:x:data'>
      <field var='FORM_TYPE' type='hidden'>
        <value>urn:xmpp:http:upload:0</value>
      </field>
      <field var='max-file-size'>
        <value>5242880</value>
      </field>
    </x>
  </query>
</iq>
```
```objc
MLXMLNode* iqNode = <the stanza above as MLXMLNode tree>;
NSInteger uploadSize = [[iqNode findFirst:@"{http://jabber.org/protocol/disco#info}query/\\{urn:xmpp:http:upload:0}result@max-file-size\\|int"] integerValue];

MLAssert(uploadSize == 5242880, @"Extracted upload size should be 5242880 bytes!");
```

**Some more data-form queries as found in our codebase:**
- `{http://jabber.org/protocol/disco#info}query/\\{http://jabber.org/protocol/muc#roominfo}result@muc#roomconfig_roomname\\`
- `{http://jabber.org/protocol/commands}command<node=urn:xmpp:invite#invite>/\\[0]@expire\\|datetime` (the form-type and FORM_TYPE field value was omitted, the query matches every data-form)
- `{http://jabber.org/protocol/commands}command<node=urn:xmpp:invite#invite>/\\@expire\\|datetime` (the form-type and FORM_TYPE field value was omitted, the query matches every data-form)
