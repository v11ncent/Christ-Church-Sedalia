import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "f96cad0e-7506-443c-bc5b-a45f84fcabd2", // Get this from tina.io
  token: "264d976272e6b35da8c8223950a0622106f68e6f", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "videos",
        label: "Videos",
        path: "src/content/videos",
        format: "json",
        ui: {
          // https://tina.io/docs/extending-tina/filename-customization/
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            },
          },
        },
        fields: [
          {
            type: "image",
            name: "image",
            label: "Image",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              validate: (value) => {
                if (value?.length > 15) {
                  return "Description cannot be more than 15 characters long";
                }
              },
            },
          },
          {
            type: "string",
            name: "link",
            label: "Link",
            required: true,
          },
        ],
      },
      {
        name: "events",
        label: "Events",
        path: "src/content/events",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              validate: (value) => {
                if (value?.length > 15) {
                  return "Description cannot be more than 15 characters long";
                }
              },
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: "d38d471c7bb65306ae0e1fb4732b778260b59086",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
