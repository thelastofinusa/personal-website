export type MessageLinkType = {
  text?: string;
  href?: string;
  newTab?: boolean;
};

export type MessageFormType = {
  field: "input" | "textarea";
  type?: string;
  name: string;
  placeholder?: string;
  error?: string;
};

export type MessageContentType = {
  text?: string[];
  imgUrl?: string;
  links?: MessageLinkType[];
  socials?: MessageLinkType[];
  form?: MessageFormType[];
  route?: MessageLinkType;
};

export type MessageType = {
  from: string;
  type: "me" | "user" | "client";
  avatar?: string;
  content: MessageContentType[];
};
