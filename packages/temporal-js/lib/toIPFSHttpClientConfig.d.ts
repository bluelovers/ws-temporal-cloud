import { ITemporalBaseConfig } from './types';
export interface ITemporalBaseConfigForIPFSHttpClientConfig extends Pick<ITemporalBaseConfig, 'ipfsEndpoint' | 'ipfsEndpointPort' | 'token'> {
}
export declare function toIPFSHttpClientConfig(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): {
    host: string;
    port: number;
    'api-path': string;
    protocol: string;
    headers: {
        authorization: string;
    };
};
