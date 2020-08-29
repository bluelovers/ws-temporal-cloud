import { ITemporalBaseConfig } from 'temporal-js2/lib/types';
export interface ITemporalBaseConfigForIPFSHttpClientConfig extends Pick<ITemporalBaseConfig, 'ipfsEndpoint' | 'ipfsEndpointPort' | 'token'> {
}
export declare function assertTemporalConfig<T extends ITemporalBaseConfigForIPFSHttpClientConfig>(temporal: T): asserts temporal is T & {
    ipfsEndpoint: string;
    token: string;
};
export declare function toIPFSHttpClientConfig(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): {
    host: string;
    port: number;
    'api-path': string;
    protocol: string;
    headers: {
        authorization: string;
    };
};
export default toIPFSHttpClientConfig;
