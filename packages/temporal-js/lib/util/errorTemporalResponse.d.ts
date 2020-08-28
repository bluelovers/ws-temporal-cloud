import { ITemporalResponseData } from '../types';
export declare function errorTemporalResponse<T extends ITemporalResponseData<any>, E = Error>(data: T, Err?: new (...argv: any[]) => E): E & T & {
    code: string;
};
export declare function assertTemporalResponse<T extends ITemporalResponseData<any>, E = Error>(data: T, Err?: new (...argv: any[]) => E): asserts data;
