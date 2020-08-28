"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFetchResponse = exports.fetchWrapped = exports.handleFetchOptions = void 0;
const qs_1 = require("./qs");
const bluebird_1 = __importDefault(require("bluebird"));
require("cross-fetch/polyfill");
const fetchHeaders_1 = require("./fetchHeaders");
const err_code_1 = __importDefault(require("err-code"));
function handleFetchOptions(options) {
    var _a, _b, _c;
    let { url, ...opts } = options;
    opts.headers = fetchHeaders_1.convertToHeaders(opts.headers);
    fetchHeaders_1.ensureHeadersValue(opts.headers, 'Content-Type', 'application/x-www-form-urlencoded');
    (_a = opts.method) !== null && _a !== void 0 ? _a : (opts.method = 'POST');
    opts.body = qs_1.qs((_c = (_b = opts.body) !== null && _b !== void 0 ? _b : opts.data) !== null && _c !== void 0 ? _c : qs_1.formData(opts === null || opts === void 0 ? void 0 : opts.formData));
    return {
        url,
        opts: {
            ...opts,
            headers: opts.headers,
        },
    };
}
exports.handleFetchOptions = handleFetchOptions;
function fetchWrapped(options) {
    let { url, opts } = handleFetchOptions(options);
    //console.dir({url, opts})
    // @ts-ignore
    //opts.headers = Object.fromEntries(opts.headers.entries());
    //opts.headers['Authorization'] = opts.headers['authorization'];
    return bluebird_1.default.resolve(fetch(url, opts))
        .then(async (response) => {
        if (response.status >= 400) {
            let err = errorFetchResponse(response);
            return Promise.reject(err);
        }
        else if (opts.responseType === 'stream') {
            return {
                data: response.body,
            };
        }
        return {
            data: await response.json()
                .catch(async (err) => {
                if ((err === null || err === void 0 ? void 0 : err.type) === 'invalid-json') {
                    return response.text();
                }
                return Promise.reject(err);
            }),
        };
    })
        .tapCatch(error => {
        if (error && !error.statusText) {
            console.error(error);
        }
    });
}
exports.fetchWrapped = fetchWrapped;
function errorFetchResponse(response, Err) {
    Err !== null && Err !== void 0 ? Err : (Err = Error);
    let { status, statusText } = response;
    // @ts-ignore
    let err = err_code_1.default(new Err(JSON.stringify({
        status,
        statusText,
    })), status, {
        status,
        statusText,
        response,
    });
    return err;
}
exports.errorFetchResponse = errorFetchResponse;
//# sourceMappingURL=fetchWrapped.js.map