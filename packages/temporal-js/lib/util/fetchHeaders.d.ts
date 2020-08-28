import { IHeadersInit } from '../types';
export declare function convertToHeaders(headers: IHeadersInit): Headers;
export declare function setHeadersValue(headers: IHeadersInit, key: string, value: string): void;
export declare function ensureHeadersValue(headers: IHeadersInit, key: string, defaultValue: string): void;
export declare function isHeadersLike<T extends IHeadersInit>(headers: T): headers is Extract<T, Headers>;
