import isPlainObject from 'is-plain-object';
import URLSearchParams from 'http-form-urlencoded/index';

export function qs(obj)
{
	return isPlainObject(obj) ? JSON.stringify(obj) : obj
}

export function formData(obj)
{
	return isPlainObject(obj) ? new URLSearchParams(obj) : obj
}
