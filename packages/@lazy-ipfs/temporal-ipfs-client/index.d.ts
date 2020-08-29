import { ITemporalBaseConfigForIPFSHttpClientConfig } from '@lazy-ipfs/temporal-to-ipfs-http-client-config';
export declare function ipfsTemporalClient<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): T;
export declare function ipfsTemporalClientAsync<T extends any = any>(temporal: ITemporalBaseConfigForIPFSHttpClientConfig): Promise<T>;
export { ipfsTemporalClientAsync as create };
export default ipfsTemporalClient;
