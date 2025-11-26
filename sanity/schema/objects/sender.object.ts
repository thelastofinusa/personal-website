import { defineField, defineType } from "sanity";

export const senderType = defineType({
  name: "sender",
  title: "Sender",
  type: "object",
  fields: [
    defineField({
      name: "from",
      title: "From",
      type: "string",
      options: {
        list: [
          { title: "Holiday", value: "holiday" },
          { title: "Anonymous", value: "anonymous" },
          { title: "Client", value: "client" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
