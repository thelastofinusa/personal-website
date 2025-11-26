import { defineField, defineType } from "sanity";

export const messageContentType = defineType({
  name: "messageContent",
  title: "Message Content",
  type: "object",
  fields: [
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "route",
      title: "Route",
      type: "route",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
    }),
    defineField({
      name: "fields",
      title: "Fields",
      type: "array",
      of: [{ type: "field" }],
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
});
