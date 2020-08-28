import { ITemporalBaseConfigForIPFSHttpClientConfig } from 'temporal-js2/lib/toIPFSHttpClientConfig';
export declare function ipfsTemporalClient<T>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): T;
export declare function ipfsTemporalClientAsync<T>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): Promise<T>;
export { ipfsTemporalClientAsync as create };
export default ipfsTemporalClient;
