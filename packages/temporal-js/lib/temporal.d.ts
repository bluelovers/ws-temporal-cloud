import 'cross-fetch/polyfill';
import { ITemporalResponseData, IResponseUploadPublicFile } from './types';
import Bluebird from 'bluebird';
import { TemporalAccount } from './temporal/accont';
/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
export declare class Temporal extends TemporalAccount {
    resolve<T = Temporal>(value?: T | PromiseLike<T>): Bluebird<T>;
    /**
     * Publishes a message to the given pubsub topic
     * @param topic The topic to be published to
     * @param message The message to be published
     * @return An object containing the topic and the message
     */
    publishPubSubMessage(topic: string, message: string): Bluebird<unknown>;
    /**
     * Pins content for a specific period
     * @param hash The hash of the content
     * @param holdTime The number of months to pin for
     */
    pin(hash: string, holdTime: number): Bluebird<unknown>;
    /**
     * Extends hold duration of the given hash
     * @notice Requires a non-free account
     * @param hash The ipfs hash to extend the hold time for
     * @param holdTime The number of months to extend. Total hold time must not be greater than 24 months
     */
    extendPin(hash: string, holdTime: number): Bluebird<unknown>;
    /**
     * Uploads a public file
     * @param file The file to upload
     * @param holdTime The number of months to pin for
     * @return The IPFS hash of the file
     */
    uploadPublicFile(file: any, uploadOptions?: number | {
        holdTime?: number;
        passphrase?: string;
        hash_type?: string;
    }): Bluebird<IResponseUploadPublicFile>;
    /**
     * Uploads a directory and pins the root hash for 1 month
     * @notice IF you want to pin for longer than 1 month call the extendPin call afterwards
     * @param file the path to the directory to upload
     */
    uploadDirectory(file: string, holdTime: number): void;
    /**
     * Gets the stat of an object
     * @param hash The hash of the object
     * @return An object containing the Hash, BlockSize,
     * CumulativeSize, DataSize, LinksSize and NumLinks
     */
    getObjectStat(hash: string): Bluebird<ITemporalResponseData<unknown>>;
    /**
     * Gets the dag
     * @param hash The hash to look for
     * @return An object containing the associated IPLD
     */
    getDag(hash: string): Bluebird<ITemporalResponseData<unknown>>;
    /**
     * Downloads a file
     * @param hash The hash of the file to download
     * @return The file as a stream
     */
    download(hash: string, network_name?: string): Bluebird<ReadableStream<Uint8Array>>;
    /**
     * Publishes IPNS records to the public networks
     * @param hash The hash of the content
     * @param life_time The lifetime of the content
     * @param ttl The lifetime of the content
     * @param key The key of the content
     * @param resolve
     * @return A success message
     */
    publishDetails(hash: string, life_time: string, ttl: string, key: string, resolve: boolean): Bluebird<ITemporalResponseData<unknown>>;
    /**
     * Submits a search to Lens for ipfs content matching the query
     * @param query the search query to match content against
     * @param tags optional tags to filter by
     * @param categories optional search categories to filter by
     * @param mime_types optional content mime types to filter by
     * @param hashes optional hashes to filter by
     * @param required whether or not an exact match is required
     */
    searchRequest(query: string, tags?: string[], // the ?: indicates optional
    categories?: string[], // the ?: indicates optional
    mime_types?: string[], // the ?: indicates optional
    hashes?: string[], // the ?: indicates optional
    required?: boolean): Bluebird<ITemporalResponseData<unknown>>;
    /**
     * Index an IPFS hash to be searchable through lens
     * @param object_identifier The IPFS hash to idnex
     * @param object_type The type of content, use IPLD for all types
     */
    indexRequest(object_identifier: string, object_type: string): Bluebird<ITemporalResponseData<unknown>>;
}
export default Temporal;
