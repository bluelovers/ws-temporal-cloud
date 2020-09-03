"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalAccount = void 0;
const core_1 = require("./core");
const fetchWrapped_1 = require("../util/fetchWrapped");
const buildTemporalApiUrl_1 = require("../buildTemporalApiUrl");
const errorTemporalResponse_1 = require("../util/errorTemporalResponse");
class TemporalAccount extends core_1.TemporalCore {
    /**
     * @notice Registers a new user
     * @param username The username of the new user
     * @param email_address The email of the new user
     * @param password The password of the new user
     * @return An object containing all the information of the new account
     */
    register(username, email_address, password) {
        return fetchWrapped_1.fetchWrapped({
            url: buildTemporalApiUrl_1.buildTemporalApiHref('auth/register', this),
            method: 'POST',
            formData: {
                username,
                email_address,
                password,
            },
        })
            .then(r => r.data.response)
            .delay(100);
    }
    /**
     * Logs in an user
     * @param username The username of the user
     * @param password The password of the user
     * @return An object containing the id of the token and its expiry date
     */
    login(username, password) {
        return fetchWrapped_1.fetchWrapped({
            method: 'post',
            url: buildTemporalApiUrl_1.buildTemporalApiHref('auth/login', this),
            body: {
                username,
                password,
            },
        })
            .then((res) => {
            this.token = res.data.token;
            return res.data;
        });
    }
    async loginByToken(token) {
        const temporal = Object.create(this);
        temporal.token = token;
        const ret = await this.getUsernameFromToken.call(temporal);
        if (typeof ret === 'string' && ret.length) {
            this.token = ret;
        }
        else {
            throw new Error(`login failed by token '${token}'`);
        }
        return this;
    }
    /**
     * Gets the username of the current user
     * @return The username of the current user
     */
    getUsernameFromToken() {
        return this._fetch({
            method: 'get',
            url: buildTemporalApiUrl_1.buildTemporalApiHref('account/token/username', this),
        })
            .then(res => res.data.response);
    }
    /**
     * Gets the available credits of the current user
     * @return The available credits
     */
    getCredits() {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/account/credits/available`,
        })
            .then(res => res.data.response);
    }
    /**
     * Refreshes the current auth token
     * @return An object containing the id of the token and its expiry date
     */
    refreshAuthToken() {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/auth/refresh`,
        })
            .then(res => res.data);
    }
    /**
     * Generates an IPFS key
     * @param keyType The type of the key rsa or ed25519
     * @param keyBits 2048 -> 4096 for RSA and 256 for ED25519
     * @return A success message
     */
    generateIpfsKey(keyType, keyBits, keyName) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/account/key/ipfs/new`,
            formData: {
                key_type: keyType,
                key_bits: keyBits,
                key_name: keyName,
            },
        })
            .then(res => {
            errorTemporalResponse_1.assertTemporalResponse(res.data);
            return res.data;
        })
            // delay for make sure getIpfsKeys can get data
            .delay(500);
    }
    /**
     * Gets the IPFS keys
     * @return An object containing the IPFS keys owned by the current user
     */
    getIpfsKeys() {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/account/key/ipfs/get`,
        })
            .then(res => res.data.response);
    }
    /**
     * Exports a key as a mnemonic phrase
     * @param keyName The name of the key to export
     * @return An array containing the words of the mnemonic
     */
    exportIpfsKey(keyName) {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/account/key/export/${keyName}`,
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        })
            .then(res => {
            errorTemporalResponse_1.assertTemporalResponse(res.data);
            return res.data.response;
        });
    }
}
exports.TemporalAccount = TemporalAccount;
//# sourceMappingURL=accont.js.map