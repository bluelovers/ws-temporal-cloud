import { TemporalCore } from './core';
import Bluebird from 'bluebird';
import { fetchWrapped } from '../util/fetchWrapped';
import {
	IResponseRegister,
	IResponseToken,
	IResponseString,
	IResponseNumber,
	IResponseIpfsKeys,
	ITemporalResponseData,
} from '../types';
import { buildTemporalApiHref } from '../buildTemporalApiUrl';
import { assertTemporalResponse } from '../util/errorTemporalResponse';
import { fetchTemporal } from '../util/fetchTemporal';

export class TemporalAccount extends TemporalCore
{

	/**
	 * @notice Registers a new user
	 * @param username The username of the new user
	 * @param email_address The email of the new user
	 * @param password The password of the new user
	 * @return An object containing all the information of the new account
	 */
	register(username: string, email_address: string, password: string)
	{
		return fetchWrapped<IResponseRegister>({
			url: buildTemporalApiHref('auth/register', this),
			method: 'POST',
			formData: {
				username,
				email_address,
				password,
			},
		})
			.then(r => r.data.response)
			.delay(100)
	}

	/**
	 * Logs in an user
	 * @param username The username of the user
	 * @param password The password of the user
	 * @return An object containing the id of the token and its expiry date
	 */
	login(username: string, password: string)
	{

		return fetchWrapped<IResponseToken>({
			method: 'post',
			url: buildTemporalApiHref('auth/login', this),
			body: {
				username,
				password,
			},
		})
			.then((res) =>
			{
				this.token = res.data.token;
				return res.data;
			})
	}

	async loginByToken(token: string)
	{
		const temporal = Object.create(this) as this;
		temporal.token = token;
		const ret = await this.getUsernameFromToken.call(temporal);

		if (typeof ret === 'string' && ret.length)
		{
			this.token = ret;
		}
		else
		{
			throw new Error(`login failed by token '${token}'`)
		}

		return this
	}

	/**
	 * Gets the username of the current user
	 * @return The username of the current user
	 */
	getUsernameFromToken()
	{
		return this._fetch<IResponseString>({
				method: 'get',
				url: buildTemporalApiHref('account/token/username', this),
			})
			.then(res => res.data.response)
	}

	/**
	 * Gets the available credits of the current user
	 * @return The available credits
	 */
	getCredits()
	{

		return this._fetch<IResponseNumber>({
				method: 'get',
				url: `${this.endpoint}/${this.version}/account/credits/available`,
			})
			.then(res => res.data.response)
	}

	/**
	 * Refreshes the current auth token
	 * @return An object containing the id of the token and its expiry date
	 */
	refreshAuthToken()
	{
		return this._fetch<IResponseToken>({
				method: 'get',
				url: `${this.endpoint}/${this.version}/auth/refresh`,
			})
			.then(res => res.data)
	}

	/**
	 * Generates an IPFS key
	 * @param keyType The type of the key rsa or ed25519
	 * @param keyBits 2048 -> 4096 for RSA and 256 for ED25519
	 * @return A success message
	 */
	generateIpfsKey(keyType: string | 'rsa', keyBits: number | string, keyName: string)
	{

		return this._fetch<IResponseString>({
				method: 'post',
				url: `${this.endpoint}/${this.version}/account/key/ipfs/new`,

				formData: {
					key_type: keyType,
					key_bits: keyBits,
					key_name: keyName,
				},
			})
			.then(res => {

				assertTemporalResponse(res.data);

				return res.data
			})
			// delay for make sure getIpfsKeys can get data
			.delay(500)
	}

	/**
	 * Gets the IPFS keys
	 * @return An object containing the IPFS keys owned by the current user
	 */
	getIpfsKeys()
	{

		return this._fetch<IResponseIpfsKeys>({
				method: 'get',
				url: `${this.endpoint}/${this.version}/account/key/ipfs/get`,
			})
			.then(res => res.data.response)
	}

	/**
	 * Exports a key as a mnemonic phrase
	 * @param keyName The name of the key to export
	 * @return An array containing the words of the mnemonic
	 */
	exportIpfsKey(keyName: string)
	{

		return this._fetch<ITemporalResponseData<string[]>>({
				method: 'get',
				url: `${this.endpoint}/${this.version}/account/key/export/${keyName}`,
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			})
			.then(res => {

				assertTemporalResponse(res.data);

				return res.data.response
			})
	}

}
