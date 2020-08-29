import { ITemporalBaseConfigForIPFSHttpClientConfig } from 'temporal-js2/lib/toIPFSHttpClientConfig';
export declare function ipfsTemporalClient<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): T;
export declare function ipfsTemporalClientAsync<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): Promise<T>;
export { ipfsTemporalClientAsync as create };
export default ipfsTemporalClient;
