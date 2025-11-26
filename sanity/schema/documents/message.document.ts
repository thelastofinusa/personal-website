import { defineField, defineType } from "sanity";
import { SiImessage } from "react-icons/si";

export const messagesType = defineType({
  name: "messages",
  title: "Messages",
  type: "document",
  icon: SiImessage,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Projects", value: "projects" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "messages",
      title: "Messages",
      type: "array",
      of: [{ type: "message" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      page: "page",
    },
    prepare(selection) {
      const { page } = selection;
      return {
        title: `${page.charAt(0).toUpperCase() + page.slice(1)} Messages`,
        subtitle: `Page: ${page}`,
      };
    },
  },
});
