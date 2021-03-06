"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIPFSHttpClientConfig = exports.assertTemporalConfig = exports.isNullOrUndefined = void 0;
function isNullOrUndefined(value) {
    return value === void 0 || value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function assertTemporalConfig(temporal) {
    var _a, _b, _c, _d, _e;
    if (!((_a = temporal === null || temporal === void 0 ? void 0 : temporal.ipfsEndpoint) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new TypeError(`temporal.ipfsEndpoint is required`);
    }
    if (!((_b = temporal === null || temporal === void 0 ? void 0 : temporal.token) === null || _b === void 0 ? void 0 : _b.length)) {
        throw new TypeError(`temporal.token is required`);
    }
    let port = (_d = (_c = temporal === null || temporal === void 0 ? void 0 : temporal.ipfsEndpointPort) === null || _c === void 0 ? void 0 : _c.toString) === null || _d === void 0 ? void 0 : _d.call(_c);
    if (!isNullOrUndefined(port) && (!port.length || ((_e = port.match(/\D/)) === null || _e === void 0 ? void 0 : _e.length))) {
        throw new TypeError(`temporal.ipfsEndpointPort should is port, but got '${temporal.ipfsEndpointPort}'`);
    }
}
exports.assertTemporalConfig = assertTemporalConfig;
function toIPFSHttpClientConfig(temporal) {
    var _a;
    assertTemporalConfig(temporal);
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
exports.default = toIPFSHttpClientConfig;
//# sourceMappingURL=index.js.map