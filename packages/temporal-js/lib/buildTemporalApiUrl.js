"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTemporalApiHref = exports.buildTemporalApiURL = void 0;
const options_1 = require("./options");
function buildTemporalApiURL(path, options) {
    options = options_1.handleTemporalApiCoreSetting(options);
    return new URL(`${options.version}/${path !== null && path !== void 0 ? path : ''}`, options.endpoint);
}
exports.buildTemporalApiURL = buildTemporalApiURL;
function buildTemporalApiHref(path, options) {
    return buildTemporalApiURL(path, options).href;
}
exports.buildTemporalApiHref = buildTemporalApiHref;
//# sourceMappingURL=buildTemporalApiUrl.js.map