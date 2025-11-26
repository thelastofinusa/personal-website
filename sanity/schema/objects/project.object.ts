import { defineField, defineType } from "sanity";

export const projectUrlType = defineType({
  name: "projectUrl",
  title: "Project URL",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "Website", value: "website" },
        ],
      },
    }),
  ],
});
