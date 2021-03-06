import Bluebird from 'bluebird';
import { IOptionsFetchWrapped } from '../types';
import 'cross-fetch/polyfill';
export declare function handleFetchOptions(options: IOptionsFetchWrapped): {
    url: string;
    opts: {
        headers: Headers;
        body?: string | ArrayBuffer | ArrayBufferView | Blob | FormData | URLSearchParams | ReadableStream<Uint8Array> | Record<any, any>;
        data?: string | ArrayBuffer | ArrayBufferView | Blob | FormData | URLSearchParams | ReadableStream<Uint8Array> | Record<any, any>;
        formData?: Record<string, any>;
        responseType?: string;
        window?: any;
        cache?: RequestCache;
        credentials?: RequestCredentials;
        integrity?: string;
        keepalive?: boolean;
        method?: string;
        mode?: RequestMode;
        redirect?: RequestRedirect;
        referrer?: string;
        referrerPolicy?: ReferrerPolicy;
        signal?: AbortSignal;
    };
};
export declare function fetchWrapped<T = any>(options: IOptionsFetchWrapped): Bluebird<{
    data: T;
}>;
export declare function errorFetchResponse<T extends Response, E = Error>(response: T, Err?: new (...argv: any[]) => E): E & {
    status: any;
    statusText: any;
    response: T;
} & {
    code: string;
};
