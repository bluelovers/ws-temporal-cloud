"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.ipfsTemporalClientAsync = exports.ipfsTemporalClient = void 0;
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const temporal_to_ipfs_http_client_config_1 = require("@lazy-ipfs/temporal-to-ipfs-http-client-config");
function ipfsTemporalClient(temporal) {
    const ipfs = ipfs_http_client_1.default(temporal_to_ipfs_http_client_config_1.toIPFSHttpClientConfig(temporal));
    return ipfs;
}
exports.ipfsTemporalClient = ipfsTemporalClient;
async function ipfsTemporalClientAsync(temporal) {
    return ipfsTemporalClient(temporal);
}
exports.ipfsTemporalClientAsync = ipfsTemporalClientAsync;
exports.create = ipfsTemporalClientAsync;
exports.default = ipfsTemporalClient;
//# sourceMappingURL=index.js.map