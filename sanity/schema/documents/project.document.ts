import { defineField, defineType } from "sanity";
import { BsPersonWorkspace } from "react-icons/bs";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: BsPersonWorkspace,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "urls",
      title: "URLs",
      type: "array",
      of: [{ type: "projectUrl" }],
    }),
  ],
  initialValue: {
    featured: false,
  },
  preview: {
    select: {
      title: "title",
      featured: "featured",
      createdAt: "createdAt",
    },
    prepare(selection) {
      const { title, featured, createdAt } = selection;
      return {
        title: title,
        subtitle: `${featured ? "⭐ " : ""}${new Date(createdAt).toLocaleDateString()}`,
      };
    },
  },
});
