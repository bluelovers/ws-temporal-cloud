import { qs, formData } from './qs';
import Bluebird from 'bluebird';
import { IOptionsFetchWrapped, ITemporalResponseData } from '../types';
import 'cross-fetch/polyfill';
import { convertToHeaders, ensureHeadersValue } from './fetchHeaders';
import errcode from 'err-code';

export function handleFetchOptions(options: IOptionsFetchWrapped)
{
	let { url, ...opts } = options;

	opts.headers = convertToHeaders(opts.headers);

	ensureHeadersValue(opts.headers, 'Content-Type', 'application/x-www-form-urlencoded');

	opts.method ??= 'POST';

	opts.body = qs(opts.body ?? opts.data ?? formData(opts?.formData));

	return {
		url,
		opts: {
			...opts,
			headers: opts.headers,
		},
	}
}

export function fetchWrapped<T = any>(options: IOptionsFetchWrapped)
{
	let { url, opts } = handleFetchOptions(options);

	//console.dir({url, opts})

	// @ts-ignore
	//opts.headers = Object.fromEntries(opts.headers.entries());

	//opts.headers['Authorization'] = opts.headers['authorization'];

	return Bluebird.resolve(fetch(url, opts as RequestInit))
		.then(async (response) =>
		{
			if (response.status >= 400)
			{
				let err = errorFetchResponse(response);

				return Promise.reject(err)
			}
			else if (opts.responseType === 'stream')
			{
				return {
					data: response.body as any as T,
				}
			}

			return {
				data: await response.json()
					.catch(async (err) =>
					{
						if (err?.type === 'invalid-json')
						{
							return response.text()
						}

						return Promise.reject(err)
					}) as T,
			}
		})
		.tapCatch(error =>
		{
			if (error && !error.statusText)
			{
				console.error(error);
			}
		})
}

export function errorFetchResponse<T extends Response, E = Error>(response: T, Err?: new (...argv) => E)
{
	Err ??= Error as any;

	let { status, statusText } = response;

	// @ts-ignore
	let err = errcode<string, {
		status,
		statusText,
		response: T
		// @ts-ignore
	}, E>(new Err(JSON.stringify({
		status,
		statusText,
	})), status, {

		status,
		statusText,

		response,
	});

	return err
}
