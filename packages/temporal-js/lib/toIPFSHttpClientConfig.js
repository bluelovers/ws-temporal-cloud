"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIPFSHttpClientConfig = void 0;
function toIPFSHttpClientConfig(temporal) {
    var _a;
    return {
        // the hostname (or ip address) of the endpoint providing the ipfs api
        host: temporal.ipfsEndpoint,
        // the port to connect on
        port: (_a = temporal.ipfsEndpointPort) !== null && _a !== void 0 ? _a : 443,
        'api-path': '/api/v0/',
        // the protocol, https for security
        protocol: 'https',
        // provide the jwt within an authorization header
        headers: {
            authorization: 'Bearer ' + temporal.token,
        },
    };
}
exports.toIPFSHttpClientConfig = toIPFSHttpClientConfig;
//# sourceMappingURL=toIPFSHttpClientConfig.js.map