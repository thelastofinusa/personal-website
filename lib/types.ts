import type { HTMLInputTypeAttribute } from "react";

type SenderType = {
  from: "holiday" | "anonymous" | "client";
  name?: string;
  avatar?: string;
};

export type RouteType = {
  path?: string;
  label?: string;
  newTab?: boolean;
  images?: string[];
};

export type LinkType = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

export type ProjectType = {
  title: string;
  description: string;
  slug?: string;
  featured: boolean;
  createdAt: string;
  urls?: Array<{ url: string; label: "github" | "website" }>;
};

export type ButtonType = {
  label: string;
  url: string;
  newTab?: boolean;
};

export type FieldType = {
  field: HTMLInputTypeAttribute;
  type?: string;
  name: string;
  placeholder?: string;
  error?: string;
};

export type MessageContentType = {
  message?: string;
  route?: RouteType;
  link?: LinkType;
  project?: ProjectType;
  buttons?: Array<ButtonType>;
  fields?: Array<FieldType>;
};

export type MessageType = {
  sender: SenderType;
  content: Array<MessageContentType>;
};
