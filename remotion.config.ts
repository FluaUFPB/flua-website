import path from "node:path";
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/remotion/index.ts");

// O site usa o alias "@/..." do tsconfig; o bundler do Remotion precisa saber dele.
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...(config.resolve?.alias ?? {}),
      "@": path.join(process.cwd(), "src"),
    },
  },
}));
