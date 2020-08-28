"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHeadersLike = exports.ensureHeadersValue = exports.setHeadersValue = exports.convertToHeaders = void 0;
function convertToHeaders(headers) {
    if (!isHeadersLike(headers)) {
        // @ts-ignore
        headers = new Headers(headers);
    }
    return headers;
}
exports.convertToHeaders = convertToHeaders;
function setHeadersValue(headers, key, value) {
    if (isHeadersLike(headers)) {
        headers.set(key, value);
    }
    else {
        headers[key] = value;
    }
}
exports.setHeadersValue = setHeadersValue;
function ensureHeadersValue(headers, key, defaultValue) {
    var _a;
    if (isHeadersLike(headers)) {
        let value = headers.get(key);
        if (value === null || value === void 0) {
            headers.set(key, defaultValue);
        }
    }
    else {
        (_a = headers[key]) !== null && _a !== void 0 ? _a : (headers[key] = defaultValue);
    }
}
exports.ensureHeadersValue = ensureHeadersValue;
function isHeadersLike(headers) {
    var _a;
    return typeof ((_a = headers) === null || _a === void 0 ? void 0 : _a.set) === 'function';
}
exports.isHeadersLike = isHeadersLike;
//# sourceMappingURL=fetchHeaders.js.map