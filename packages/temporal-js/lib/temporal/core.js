"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalCore = void 0;
const options_1 = require("../options");
const fetchHeaders_1 = require("../util/fetchHeaders");
const fetchWrapped_1 = require("../util/fetchWrapped");
/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
class TemporalCore {
    constructor(prod) {
        if (typeof prod === 'boolean') {
            prod = {
                prod,
            };
        }
        prod = options_1.handleTemporalApiCoreSetting(prod);
        this.endpoint = prod.endpoint;
        this.ipfsEndpoint = prod.ipfsEndpoint;
        this.version = prod.version;
        this.token = prod.token;
    }
    _fetch(opts) {
        opts.headers = fetchHeaders_1.convertToHeaders(opts.headers);
        fetchHeaders_1.ensureHeadersValue(opts.headers, 'Authorization', `Bearer ${this.token}`);
        return fetchWrapped_1.fetchWrapped(opts);
    }
}
exports.TemporalCore = TemporalCore;
//# sourceMappingURL=core.js.map