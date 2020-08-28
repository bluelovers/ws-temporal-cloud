import { IHeadersInit } from '../types';

export function convertToHeaders(headers: IHeadersInit)
{
	if (!isHeadersLike(headers))
	{
		// @ts-ignore
		headers = new Headers(headers)
	}

	return headers
}

export function setHeadersValue(headers: IHeadersInit, key: string, value: string)
{
	if (isHeadersLike(headers))
	{
		headers.set(key, value);
	}
	else
	{
		headers[key] = value
	}
}

export function ensureHeadersValue(headers: IHeadersInit, key: string, defaultValue: string)
{
	if (isHeadersLike(headers))
	{
		let value = headers.get(key);

		if (value === null || value === void 0)
		{
			headers.set(key, defaultValue);
		}
	}
	else
	{
		headers[key] ??= defaultValue
	}
}

export function isHeadersLike<T extends IHeadersInit>(headers: T): headers is Extract<T, Headers>
{
	return typeof (headers as Headers)?.set === 'function'
}
