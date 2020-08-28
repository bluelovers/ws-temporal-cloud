export interface IOptionsHandleTemporalApiCoreSetting extends Partial<ITemporalBaseConfig>
{
	prod?: boolean;
}

export interface IOptionsTemporal extends IOptionsHandleTemporalApiCoreSetting
{
	token?: string,
}

export interface ITemporalBaseConfig
{
	endpoint: string;
	ipfsEndpoint: string;
	version: string;
	token: string;

	ipfsEndpointPort?: number;
}

export interface ITemporalResponseData<T>
{
	code: number,
	response: T
}

export interface IResponseToken
{
	/**
	 * '2020-08-14T22:08:26Z'
	 */
	expire: string;
	token: string;
}

export interface IResponseString extends ITemporalResponseData<string>
{

}

export interface IResponseNumber extends ITemporalResponseData<number>
{

}

export interface IResponseRegister extends ITemporalResponseData<{
	ID: number,
	/**
	 * '2020-08-13T22:49:44.272283Z'
	 */
	CreatedAt: string,
	/**
	 * '2020-08-13T22:49:44.324669363Z'
	 */
	UpdatedAt: string,
	DeletedAt: null,
	UserName: string,
	EmailAddress: string,
	AccountEnabled: boolean,
	EmailEnabled: boolean,
	AdminAccess: boolean,

	EmailVerificationToken: string | 'scrubbed',
	HashedPassword: string | 'scrubbed',

	Free: boolean,
	Credits: number,
	CustomerObjectHash: string,
	Organization: string,
	IPFSKeyNames: null,
	IPFSKeyIDs: null,
	IPFSNetworkNames: null,
	/**
	 * 'by continuing to use this service you agree to be bound by the following api terms and service https://gateway.temporal.cloud/ipns/docs.dev.ts.temporal.cloud'
	 */
	Status: string
}>
{

}

export interface IResponseIpfsKeys extends ITemporalResponseData<{
	key_ids: string[],
	key_names: string[]
}>
{

}

export interface IResponseUploadPublicFile extends ITemporalResponseData<string>
{
	notice: string,
}

export interface IHeaders
{
	'Content-Type'?: string | 'application/x-www-form-urlencoded' | 'text/plain',
	Authorization?: string,
	[k: string]: string
}

export type IHeadersInit = IHeaders | Headers;

export interface IOptionsFetchWrapped extends Omit<RequestInit, 'body' | 'headers'>
{
	url: string,
	body?: BodyInit | null | Record<any, any>
	data?: BodyInit | null | Record<any, any>
	formData?: Record<string, any>
	responseType?: string | 'stream',
	headers?: IHeadersInit,
}

export interface IOptionsTemporalFetch extends IOptionsFetchWrapped
{

}

