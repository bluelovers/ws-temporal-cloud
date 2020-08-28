import { ITemporalResponseData } from '../types';
import errcode from 'err-code';

export function errorTemporalResponse<T extends ITemporalResponseData<any>, E = Error>(data: T, Err?: new (...argv) => E)
{
	Err ??= Error as any;

	// @ts-ignore
	let err = errcode< string, T, E>(new Err(JSON.stringify(data)), data.code, data);

	return err
}

export function assertTemporalResponse<T extends ITemporalResponseData<any>, E = Error>(data: T, Err?: new (...argv) => E): asserts data
{
	if (data.code !== 200)
	{
		throw errorTemporalResponse(data, Err)
	}
}
