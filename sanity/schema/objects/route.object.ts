import { defineField, defineType } from "sanity";

export const routeType = defineType({
  name: "route",
  title: "Route",
  type: "object",
  fields: [
    defineField({
      name: "path",
      title: "Path",
      type: "string",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "newTab",
      title: "Open in New Tab",
      type: "boolean",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
