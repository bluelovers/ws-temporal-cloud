"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTemporalApiCoreSetting = void 0;
const const_1 = require("./const");
function handleTemporalApiCoreSetting(options = {}) {
    var _a, _b, _c, _d, _e;
    if (options.prod) {
        (_a = options.endpoint) !== null && _a !== void 0 ? _a : (options.endpoint = const_1.prodURL);
        (_b = options.ipfsEndpoint) !== null && _b !== void 0 ? _b : (options.ipfsEndpoint = const_1.prodIPFSURL);
    }
    else {
        (_c = options.endpoint) !== null && _c !== void 0 ? _c : (options.endpoint = const_1.devURL);
        (_d = options.ipfsEndpoint) !== null && _d !== void 0 ? _d : (options.ipfsEndpoint = const_1.devIPFSURL);
    }
    (_e = options.version) !== null && _e !== void 0 ? _e : (options.version = 'v2');
    return options;
}
exports.handleTemporalApiCoreSetting = handleTemporalApiCoreSetting;
//# sourceMappingURL=options.js.map