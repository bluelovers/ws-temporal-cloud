"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalCore = void 0;
const options_1 = require("../options");
const fetchTemporal_1 = require("../util/fetchTemporal");
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
        return fetchTemporal_1.fetchTemporal(opts, this);
    }
}
exports.TemporalCore = TemporalCore;
//# sourceMappingURL=core.js.map