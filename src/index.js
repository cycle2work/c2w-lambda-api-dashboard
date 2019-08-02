import "core-js/stable";
import "regenerator-runtime/runtime";

import pipeline from "./pipeline";

// pipeline definition is needed to avoid a babel polyfill bug
export const handler = pipeline;
