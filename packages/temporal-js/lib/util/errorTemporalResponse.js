"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertTemporalResponse = exports.errorTemporalResponse = void 0;
const err_code_1 = __importDefault(require("err-code"));
function errorTemporalResponse(data, Err) {
    Err !== null && Err !== void 0 ? Err : (Err = Error);
    // @ts-ignore
    let err = err_code_1.default(new Err(JSON.stringify(data)), data.code, data);
    return err;
}
exports.errorTemporalResponse = errorTemporalResponse;
function assertTemporalResponse(data, Err) {
    if (data.code !== 200) {
        throw errorTemporalResponse(data, Err);
    }
}
exports.assertTemporalResponse = assertTemporalResponse;
//# sourceMappingURL=errorTemporalResponse.js.map