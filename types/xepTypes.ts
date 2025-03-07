export interface XepItem {
  id: string;
  status: string;
  since: string;
  note: string;
}

export interface XmppXep {
  'xmpp:xep'?: {
    $?: {
      'rdf:resource'?: string;
    };
  }[];
  'xmpp:status'?: string[];
  'xmpp:since'?: string[];
  'xmpp:note'?: string[];
}

export interface Implements {
  'xmpp:SupportedXep'?: XmppXep[];
}

export interface ApiResponse {
  'rdf:RDF': { Project: { implements: Implements[] }[] };
}
