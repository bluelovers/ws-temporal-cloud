import { IOptionsTemporal, ITemporalResponseData, IOptionsTemporalFetch, ITemporalBaseConfig } from '../types';
import { handleTemporalApiCoreSetting } from '../options';
import { convertToHeaders, ensureHeadersValue } from '../util/fetchHeaders';
import { fetchWrapped } from '../util/fetchWrapped';
import { fetchTemporal } from '../util/fetchTemporal';

/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
export class TemporalCore implements ITemporalBaseConfig
{
	public endpoint: string;
	public ipfsEndpoint: string;
	public version: string;
	public token: string;

	constructor(prod?: boolean | IOptionsTemporal)
	{
		if (typeof prod === 'boolean')
		{
			prod = {
				prod,
			}
		}

		prod = handleTemporalApiCoreSetting(prod);

		this.endpoint = prod.endpoint;
		this.ipfsEndpoint = prod.ipfsEndpoint;
		this.version = prod.version;
		this.token = prod.token;
	}

	protected _fetch<T = ITemporalResponseData<unknown>>(opts: IOptionsTemporalFetch)
	{
		return fetchTemporal<T>(opts, this)
	}

}
