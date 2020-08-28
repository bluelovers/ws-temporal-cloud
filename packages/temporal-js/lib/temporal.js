"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temporal = void 0;
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
require("cross-fetch/polyfill");
const bluebird_1 = __importDefault(require("bluebird"));
const qs_1 = require("./util/qs");
const errorTemporalResponse_1 = require("./util/errorTemporalResponse");
const cross_formdata_1 = __importDefault(require("cross-formdata"));
const accont_1 = require("./temporal/accont");
/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
class Temporal extends accont_1.TemporalAccount {
    resolve(...argv) {
        return bluebird_1.default.resolve(argv.length ? argv[0] : this).bind(this);
    }
    /**
     * Publishes a message to the given pubsub topic
     * @param topic The topic to be published to
     * @param message The message to be published
     * @return An object containing the topic and the message
     */
    publishPubSubMessage(topic, message) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/ipfs/public/pubsub/publish/${topic}`,
            data: {
                message,
            },
        })
            .then(res => res.data.response);
    }
    /**
     * Pins content for a specific period
     * @param hash The hash of the content
     * @param holdTime The number of months to pin for
     */
    pin(hash, holdTime) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/ipfs/public/pin/${hash}`,
            data: qs_1.qs({
                hold_time: holdTime,
            }),
        })
            .then(res => res.data.response);
    }
    /**
     * Extends hold duration of the given hash
     * @notice Requires a non-free account
     * @param hash The ipfs hash to extend the hold time for
     * @param holdTime The number of months to extend. Total hold time must not be greater than 24 months
     */
    extendPin(hash, holdTime) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/ipfs/public/pin/${hash}/extend`,
            data: {
                hold_time: holdTime,
            },
        })
            .then(res => res.data.response);
    }
    /**
     * Uploads a public file
     * @param file The file to upload
     * @param holdTime The number of months to pin for
     * @return The IPFS hash of the file
     */
    uploadPublicFile(file, uploadOptions) {
        var _a, _b, _c, _d;
        if (typeof uploadOptions === "number" || typeof uploadOptions === "string") {
            uploadOptions = {
                holdTime: uploadOptions,
            };
        }
        const formData = new cross_formdata_1.default();
        formData.append('file', file);
        // @ts-ignore
        formData.append('hold_time', (_a = uploadOptions === null || uploadOptions === void 0 ? void 0 : uploadOptions.holdTime) !== null && _a !== void 0 ? _a : 1);
        (uploadOptions === null || uploadOptions === void 0 ? void 0 : uploadOptions.passphrase) && formData.append('passphrase', uploadOptions === null || uploadOptions === void 0 ? void 0 : uploadOptions.passphrase);
        (uploadOptions === null || uploadOptions === void 0 ? void 0 : uploadOptions.hash_type) && formData.append('hash_type', uploadOptions === null || uploadOptions === void 0 ? void 0 : uploadOptions.hash_type);
        const options = {
            method: 'POST',
            url: `${this.endpoint}/${this.version}/ipfs/public/file/add`,
            // @ts-ignore
            formData: (_b = formData.stream) !== null && _b !== void 0 ? _b : formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                // @ts-ignore
                ...((_d = (_c = formData.getHeaders) === null || _c === void 0 ? void 0 : _c.call(formData)) !== null && _d !== void 0 ? _d : formData.headers),
            },
        };
        return this._fetch(options)
            .then((res) => {
            errorTemporalResponse_1.assertTemporalResponse(res.data);
            return res.data;
        });
    }
    /**
     * Uploads a directory and pins the root hash for 1 month
     * @notice IF you want to pin for longer than 1 month call the extendPin call afterwards
     * @param file the path to the directory to upload
     */
    uploadDirectory(file, holdTime) {
        let api = ipfs_http_client_1.default({
            // the hostname (or ip address) of the endpoint providing the ipfs api
            host: this.ipfsEndpoint,
            // the port to connect on
            port: '443',
            'api-path': '/api/v0/',
            // the protocol, https for security
            protocol: 'https',
            // provide the jwt within an authorization header
            headers: {
                authorization: 'Bearer ' + this.token,
            },
        });
        api.addFromFs(file, { recursive: true }, function (err, response) {
            if (err) {
                console.error(err, err.stack);
            }
            else {
                response.forEach(element => {
                    if (file.includes(element.path)) {
                        console.log("make sure to extend pin duration");
                        return element.path;
                    }
                });
            }
        });
    }
    /**
     * Gets the stat of an object
     * @param hash The hash of the object
     * @return An object containing the Hash, BlockSize,
     * CumulativeSize, DataSize, LinksSize and NumLinks
     */
    getObjectStat(hash) {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/ipfs/public/stat/${hash}`,
        })
            .then(res => res.data);
    }
    /**
     * Gets the dag
     * @param hash The hash to look for
     * @return An object containing the associated IPLD
     */
    getDag(hash) {
        return this._fetch({
            method: 'get',
            url: `${this.endpoint}/${this.version}/ipfs/public/dag/${hash}`,
        })
            .then(res => res.data);
    }
    /**
     * Downloads a file
     * @param hash The hash of the file to download
     * @return The file as a stream
     */
    download(hash, network_name = '') {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/ipfs/utils/download/${hash}`,
            data: {
                network_name,
            },
            responseType: 'stream',
        })
            .then(res => res.data);
    }
    /**
     * Publishes IPNS records to the public networks
     * @param hash The hash of the content
     * @param life_time The lifetime of the content
     * @param ttl The lifetime of the content
     * @param key The key of the content
     * @param resolve
     * @return A success message
     */
    publishDetails(hash, life_time, ttl, key, resolve) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/ipns/public/publish/details`,
            data: {
                hash,
                life_time,
                ttl,
                key,
                resolve,
            },
        })
            .then(res => res.data);
    }
    /**
     * Submits a search to Lens for ipfs content matching the query
     * @param query the search query to match content against
     * @param tags optional tags to filter by
     * @param categories optional search categories to filter by
     * @param mime_types optional content mime types to filter by
     * @param hashes optional hashes to filter by
     * @param required whether or not an exact match is required
     */
    searchRequest(query, tags, // the ?: indicates optional
    categories, // the ?: indicates optional
    mime_types, // the ?: indicates optional
    hashes, // the ?: indicates optional
    required) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/lens/search`,
            data: {
                query,
                tags,
                categories,
                mime_types,
                hashes,
                required,
            },
        })
            .then(res => res.data);
    }
    /**
     * Index an IPFS hash to be searchable through lens
     * @param object_identifier The IPFS hash to idnex
     * @param object_type The type of content, use IPLD for all types
     */
    indexRequest(object_identifier, object_type) {
        return this._fetch({
            method: 'post',
            url: `${this.endpoint}/${this.version}/lens/index`,
            data: {
                object_identifier,
                object_type,
            },
        })
            .then(res => res.data);
    }
}
exports.Temporal = Temporal;
exports.default = Temporal;
//# sourceMappingURL=temporal.js.map