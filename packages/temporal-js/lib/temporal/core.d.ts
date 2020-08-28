/// <reference types="bluebird" />
import { IOptionsTemporal, ITemporalResponseData, IOptionsTemporalFetch, ITemporalBaseConfig } from '../types';
/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
export declare class TemporalCore implements ITemporalBaseConfig {
    endpoint: string;
    ipfsEndpoint: string;
    version: string;
    token: string;
    constructor(prod?: boolean | IOptionsTemporal);
    protected _fetch<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch): import("bluebird")<{
        data: T;
    }>;
}
