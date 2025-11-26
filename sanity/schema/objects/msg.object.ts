import { defineField, defineType } from "sanity";

export const messageType = defineType({
  name: "message",
  title: "Message",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "messageContent" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sender",
      title: "Sender",
      type: "sender",
      validation: (rule) => rule.required(),
    }),
  ],
});
