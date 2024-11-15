import { defineConfig, type LibConfig, type RslibConfig } from "@rslib/core";
import { cloneDeep } from "es-toolkit";

export default defineConfig(() => {
    const umdLib: LibConfig = {
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
    };

    const minifyUmdLib = cloneDeep(umdLib);
    minifyUmdLib.output!.filename!.js = "maptalks.plotsymbol.min.js";
    minifyUmdLib.output!.minify = true;

    return {
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
            umdLib,
            minifyUmdLib,
        ],
    } satisfies RslibConfig;
});
