/// <reference types="bluebird" />
import { IOptionsHandleTemporalApiCoreSetting, IOptionsTemporalFetch, ITemporalResponseData } from '../types';
export declare function fetchTemporalCore<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch, temporal: IOptionsHandleTemporalApiCoreSetting): import("bluebird")<{
    data: T;
}>;
export declare function fetchTemporal<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch, temporal: IOptionsHandleTemporalApiCoreSetting): import("bluebird")<{
    data: T;
}>;
