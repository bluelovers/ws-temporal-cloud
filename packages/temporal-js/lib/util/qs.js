"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = exports.qs = void 0;
const is_plain_object_1 = __importDefault(require("is-plain-object"));
const index_1 = __importDefault(require("http-form-urlencoded/index"));
function qs(obj) {
    return is_plain_object_1.default(obj) ? JSON.stringify(obj) : obj;
}
exports.qs = qs;
function formData(obj) {
    return is_plain_object_1.default(obj) ? new index_1.default(obj) : obj;
}
exports.formData = formData;
//# sourceMappingURL=qs.js.map