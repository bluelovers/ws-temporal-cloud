import { TemporalCore } from './core';
import Bluebird from 'bluebird';
import { IResponseToken, IResponseString } from '../types';
export declare class TemporalAccount extends TemporalCore {
    /**
     * @notice Registers a new user
     * @param username The username of the new user
     * @param email_address The email of the new user
     * @param password The password of the new user
     * @return An object containing all the information of the new account
     */
    register(username: string, email_address: string, password: string): Bluebird<{
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: null;
        UserName: string;
        EmailAddress: string;
        AccountEnabled: boolean;
        EmailEnabled: boolean;
        AdminAccess: boolean;
        EmailVerificationToken: string;
        /**
         * Logs in an user
         * @param username The username of the user
         * @param password The password of the user
         * @return An object containing the id of the token and its expiry date
         */
        HashedPassword: string;
        Free: boolean;
        Credits: number;
        CustomerObjectHash: string;
        Organization: string;
        IPFSKeyNames: null;
        IPFSKeyIDs: null;
        IPFSNetworkNames: null;
        Status: string;
    }>;
    /**
     * Logs in an user
     * @param username The username of the user
     * @param password The password of the user
     * @return An object containing the id of the token and its expiry date
     */
    login(username: string, password: string): Bluebird<IResponseToken>;
    loginByToken(token: string): Promise<this>;
    /**
     * Gets the username of the current user
     * @return The username of the current user
     */
    getUsernameFromToken(): Bluebird<string>;
    /**
     * Gets the available credits of the current user
     * @return The available credits
     */
    getCredits(): Bluebird<number>;
    /**
     * Refreshes the current auth token
     * @return An object containing the id of the token and its expiry date
     */
    refreshAuthToken(): Bluebird<IResponseToken>;
    /**
     * Generates an IPFS key
     * @param keyType The type of the key rsa or ed25519
     * @param keyBits 2048 -> 4096 for RSA and 256 for ED25519
     * @return A success message
     */
    generateIpfsKey(keyType: string | 'rsa', keyBits: number | string, keyName: string): Bluebird<IResponseString>;
    /**
     * Gets the IPFS keys
     * @return An object containing the IPFS keys owned by the current user
     */
    getIpfsKeys(): Bluebird<{
        key_ids: string[];
        key_names: string[];
    }>;
    /**
     * Exports a key as a mnemonic phrase
     * @param keyName The name of the key to export
     * @return An array containing the words of the mnemonic
     */
    exportIpfsKey(keyName: string): Bluebird<string[]>;
}
