import { defineConfig } from "@rslib/core";

export default defineConfig({
    source: {
        entry: {
            index: "./index.js",
        },
    },
    lib: [
        {
            format: "esm",
            syntax: "es2015",
            output: {
                filename: {
                    js: "maptalks.plotsymbol.es.js",
                },
                legalComments: "none",
            },
        },
        {
            format: "umd",
            syntax: "es2015",
            output: {
                filename: {
                    js: "maptalks.plotsymbol.js",
                },
                legalComments: "none",
            },
            tools: {
                rspack: {
                    output: {
                        library: {
                            name: "maptalks",
                            type: "assign-properties",
                        },
                    },
                },
            },
        },
    ],
});
