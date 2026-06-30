import { defineConfig } from "tinacms";
import type { Template } from "tinacms";

/**
 * TinaCMS configuration.
 *
 * Tina is a git-based CMS: it edits the same Markdown/MDX files in this repo
 * that the site already renders from. The public site does NOT depend on Tina
 * at render time — `lib/content.ts` still reads the files directly — so Tina is
 * purely the editing UI at /admin. Content always stays in git.
 *
 * The rich-text `templates` below mirror the custom MDX components in
 * components/mdx/*, so the editor can insert Callouts, Steps, etc. visually and
 * they serialise back to the same MDX the site renders.
 */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

/** A "Tone" matching the Callout component's `type` prop. */
const calloutTemplate: Template = {
  name: "Callout",
  label: "Callout",
  fields: [
    {
      type: "string",
      name: "type",
      label: "Tone",
      options: ["note", "tip", "warning", "quote"],
    },
    { type: "string", name: "title", label: "Title" },
    { type: "rich-text", name: "children", label: "Content" },
  ],
};

const stepTemplate: Template = {
  name: "Step",
  label: "Step",
  fields: [
    { type: "string", name: "title", label: "Title" },
    { type: "rich-text", name: "children", label: "Content" },
  ],
};

const stepsTemplate: Template = {
  name: "Steps",
  label: "Steps (numbered)",
  fields: [{ type: "rich-text", name: "children", label: "Steps" }],
};

const takeawayTemplate: Template = {
  name: "Takeaway",
  label: "Takeaway",
  fields: [{ type: "rich-text", name: "children", label: "Text" }],
};

const keyTakeawaysTemplate: Template = {
  name: "KeyTakeaways",
  label: "Key takeaways",
  fields: [{ type: "rich-text", name: "children", label: "Takeaways" }],
};

const statTemplate: Template = {
  name: "Stat",
  label: "Stat",
  fields: [
    { type: "string", name: "value", label: "Value" },
    { type: "string", name: "label", label: "Label" },
  ],
};

const statGridTemplate: Template = {
  name: "StatGrid",
  label: "Stat grid",
  fields: [{ type: "rich-text", name: "children", label: "Stats" }],
};

const figureTemplate: Template = {
  name: "Figure",
  label: "Figure (image)",
  fields: [
    { type: "image", name: "src", label: "Image" },
    { type: "string", name: "alt", label: "Alt text" },
    { type: "string", name: "caption", label: "Caption" },
  ],
};

const articleTemplates: Template[] = [
  calloutTemplate,
  keyTakeawaysTemplate,
  takeawayTemplate,
  stepsTemplate,
  stepTemplate,
  statGridTemplate,
  statTemplate,
  figureTemplate,
];

export default defineConfig({
  branch,
  // From your Tina Cloud project (https://app.tina.io). Empty for local dev,
  // where Tina runs a local content server over the filesystem.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        // Marketing copy for /about. A single JSON document (not creatable or
        // deletable in the editor) whose shape mirrors the page's sections, so
        // every string is editable — in-context via the visual editor.
        name: "aboutPage",
        label: "About page",
        path: "content/pages",
        format: "json",
        match: { include: "about" },
        ui: {
          router: () => "/about",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "intro",
                label: "Intro",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "blocks",
            label: "Story blocks",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Block" }),
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Call to action",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        format: "mdx",
        ui: {
          router: ({ document }) => `/articles/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            description: "Shown on cards and as the meta description.",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish date",
            ui: { dateFormat: "YYYY-MM-DD" },
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "e.g. Conversion, Analytics, Strategy.",
          },
          {
            type: "number",
            name: "readingMinutes",
            label: "Reading time (minutes)",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft (hide from listings)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: articleTemplates,
          },
        ],
      },
    ],
  },
});
