"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTemporal = exports.fetchTemporalCore = void 0;
const fetchHeaders_1 = require("./fetchHeaders");
const fetchWrapped_1 = require("./fetchWrapped");
const buildTemporalApiUrl_1 = require("../buildTemporalApiUrl");
function fetchTemporalCore(opts, temporal) {
    var _a;
    opts.headers = fetchHeaders_1.convertToHeaders(opts.headers);
    if ((_a = temporal === null || temporal === void 0 ? void 0 : temporal.token) === null || _a === void 0 ? void 0 : _a.length) {
        fetchHeaders_1.ensureHeadersValue(opts.headers, 'Authorization', `Bearer ${temporal.token}`);
    }
    return fetchWrapped_1.fetchWrapped(opts);
}
exports.fetchTemporalCore = fetchTemporalCore;
function fetchTemporal(opts, temporal) {
    var _a;
    if (!((_a = opts.url.match(/^https?:\/\//)) === null || _a === void 0 ? void 0 : _a.length)) {
        opts.url = buildTemporalApiUrl_1.buildTemporalApiHref(opts.url, temporal);
    }
    return fetchTemporalCore(opts, temporal);
}
exports.fetchTemporal = fetchTemporal;
//# sourceMappingURL=fetchTemporal.js.map