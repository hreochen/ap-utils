import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import camelCase from "lodash.camelcase";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

const libraryName = "ap-utils";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: "umd",
      sourcemap: true,
    },
    { file: pkg.module, format: "es", sourcemap: true },
  ],
  external: [],
  watch: {
    include: "src/**",
  },
  plugins: [json(), typescript(), commonjs(), resolve()],
};
