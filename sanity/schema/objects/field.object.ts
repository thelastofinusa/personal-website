import { defineField, defineType } from "sanity";

export const fieldType = defineType({
  name: "field",
  title: "Field",
  type: "object",
  fields: [
    defineField({
      name: "field",
      title: "Field Type",
      type: "string",
      options: {
        list: ["input", "textarea", "select", "checkbox", "radio"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "HTML Type",
      type: "string",
      options: {
        list: [
          "text",
          "email",
          "password",
          "number",
          "tel",
          "url",
          "search",
          "color",
          "date",
          "datetime-local",
          "month",
          "week",
          "time",
          "range",
          "file",
          "hidden",
          "textarea",
        ],
      },
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
    defineField({
      name: "error",
      title: "Error Message",
      type: "string",
    }),
  ],
});
