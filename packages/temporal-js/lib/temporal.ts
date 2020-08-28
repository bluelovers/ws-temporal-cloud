import ipfsapi from "ipfs-http-client";
import 'cross-fetch/polyfill';
import {
	IOptionsTemporal,
	IResponseString,
	IResponseToken,
	IResponseNumber,
	IOptionsFetchWrapped,
	IOptionsTemporalFetch, IResponseRegister, ITemporalResponseData, IResponseIpfsKeys, IResponseUploadPublicFile,
} from './types';
import { handleTemporalApiCoreSetting } from './options';
import { buildTemporalApiHref } from './buildTemporalApiUrl';
import Bluebird from 'bluebird';
import { qs } from './util/qs';
import { fetchWrapped } from './util/fetchWrapped';
import errcode from 'err-code';
import { errorTemporalResponse, assertTemporalResponse } from './util/errorTemporalResponse';
import FormData from 'cross-formdata';
import { ensureHeadersValue, convertToHeaders } from './util/fetchHeaders';
import { TemporalCore } from './temporal/core';
import { TemporalAccount } from './temporal/accont';

/**
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/account.html
 * @see https://gateway.temporal.cloud/ipns/docs.api.temporal.cloud/ipfs.html
 */
export class Temporal extends TemporalAccount
{

	resolve<T = Temporal>(value?: T | PromiseLike<T>): Bluebird<T>
	resolve(...argv)
	{
		return Bluebird.resolve(argv.length ? argv[0] : this).bind(this)
	}



	/**
	 * Publishes a message to the given pubsub topic
	 * @param topic The topic to be published to
	 * @param message The message to be published
	 * @return An object containing the topic and the message
	 */
	publishPubSubMessage(topic: string, message: string)
	{

		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/ipfs/public/pubsub/publish/${topic}`,

			data: {
				message,
			},
		})
			.then(res => res.data.response)
	}

	/**
	 * Pins content for a specific period
	 * @param hash The hash of the content
	 * @param holdTime The number of months to pin for
	 */
	pin(hash: string, holdTime: number)
	{
		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/ipfs/public/pin/${hash}`,
			data: qs({
				hold_time: holdTime,
			}),
		})
			.then(res => res.data.response)
	}

	/**
	 * Extends hold duration of the given hash
	 * @notice Requires a non-free account
	 * @param hash The ipfs hash to extend the hold time for
	 * @param holdTime The number of months to extend. Total hold time must not be greater than 24 months
	 */
	extendPin(hash: string, holdTime: number)
	{
		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/ipfs/public/pin/${hash}/extend`,
			data: {
				hold_time: holdTime,
			},
		})
			.then(res => res.data.response)
	}

	/**
	 * Uploads a public file
	 * @param file The file to upload
	 * @param holdTime The number of months to pin for
	 * @return The IPFS hash of the file
	 */
	uploadPublicFile(file, uploadOptions?: number | {
		holdTime?: number,
		passphrase?: string,
		hash_type?: string,
	})
	{

		if (typeof uploadOptions === "number" || typeof uploadOptions === "string")
		{
			uploadOptions = {
				holdTime: uploadOptions,
			}
		}

		const formData = new FormData();
		formData.append('file', file);
		// @ts-ignore
		formData.append('hold_time', uploadOptions?.holdTime ?? 1);
		uploadOptions?.passphrase && formData.append('passphrase', uploadOptions?.passphrase);
		uploadOptions?.hash_type && formData.append('hash_type', uploadOptions?.hash_type);

		const options: IOptionsTemporalFetch = {
			method: 'POST',
			url: `${this.endpoint}/${this.version}/ipfs/public/file/add`,
			// @ts-ignore
			formData: formData.stream ?? formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				// @ts-ignore
				...(formData.getHeaders?.() ?? formData.headers),
			},
		};

		return this._fetch<IResponseUploadPublicFile>(options)
			.then((res) =>
			{
				assertTemporalResponse(res.data);

				return res.data;
			})
	}

	/**
	 * Uploads a directory and pins the root hash for 1 month
	 * @notice IF you want to pin for longer than 1 month call the extendPin call afterwards
	 * @param file the path to the directory to upload
	 */
	uploadDirectory(file: string, holdTime: number)
	{
		let api = ipfsapi({
			// the hostname (or ip address) of the endpoint providing the ipfs api
			host: this.ipfsEndpoint,
			// the port to connect on
			port: '443',
			'api-path': '/api/v0/',
			// the protocol, https for security
			protocol: 'https',
			// provide the jwt within an authorization header
			headers: {
				authorization: 'Bearer ' + this.token,
			},
		});
		api.addFromFs(file, { recursive: true }, function (err, response)
		{
			if (err)
			{
				console.error(err, err.stack)
			}
			else
			{
				response.forEach(element =>
				{
					if (file.includes(element.path))
					{
						console.log("make sure to extend pin duration")
						return element.path;
					}
				});
			}
		})
	}

	/**
	 * Gets the stat of an object
	 * @param hash The hash of the object
	 * @return An object containing the Hash, BlockSize,
	 * CumulativeSize, DataSize, LinksSize and NumLinks
	 */
	getObjectStat(hash: string)
	{
		return this._fetch({
			method: 'get',
			url: `${this.endpoint}/${this.version}/ipfs/public/stat/${hash}`,
		})
			.then(res => res.data)
	}

	/**
	 * Gets the dag
	 * @param hash The hash to look for
	 * @return An object containing the associated IPLD
	 */
	getDag(hash: string)
	{
		return this._fetch({
			method: 'get',
			url: `${this.endpoint}/${this.version}/ipfs/public/dag/${hash}`,
		})
			.then(res => res.data)
	}

	/**
	 * Downloads a file
	 * @param hash The hash of the file to download
	 * @return The file as a stream
	 */
	download(hash: string, network_name: string = '')
	{
		return this._fetch<ReadableStream<Uint8Array>>({
			method: 'post',
			url: `${this.endpoint}/${this.version}/ipfs/utils/download/${hash}`,
			data: {
				network_name,
			},
			responseType: 'stream',
		})
			.then(res => res.data)
	}

	/**
	 * Publishes IPNS records to the public networks
	 * @param hash The hash of the content
	 * @param life_time The lifetime of the content
	 * @param ttl The lifetime of the content
	 * @param key The key of the content
	 * @param resolve
	 * @return A success message
	 */
	publishDetails(hash: string, life_time: string, ttl: string, key: string, resolve: boolean)
	{
		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/ipns/public/publish/details`,
			data: {
				hash,
				life_time,
				ttl,
				key,
				resolve,
			},
		})
			.then(res => res.data)
	}

	/**
	 * Submits a search to Lens for ipfs content matching the query
	 * @param query the search query to match content against
	 * @param tags optional tags to filter by
	 * @param categories optional search categories to filter by
	 * @param mime_types optional content mime types to filter by
	 * @param hashes optional hashes to filter by
	 * @param required whether or not an exact match is required
	 */
	searchRequest(
		query: string,
		tags?: string[], // the ?: indicates optional
		categories?: string[], // the ?: indicates optional
		mime_types?: string[], // the ?: indicates optional
		hashes?: string[], // the ?: indicates optional
		required?: boolean, // the ?: indicates optional
	)
	{
		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/lens/search`,
			data: {
				query,
				tags,
				categories,
				mime_types,
				hashes,
				required,
			},
		})
			.then(res => res.data)
	}

	/**
	 * Index an IPFS hash to be searchable through lens
	 * @param object_identifier The IPFS hash to idnex
	 * @param object_type The type of content, use IPLD for all types
	 */
	indexRequest(object_identifier: string, object_type: string)
	{
		return this._fetch({
			method: 'post',
			url: `${this.endpoint}/${this.version}/lens/index`,
			data: {
				object_identifier,
				object_type,
			},
		})
			.then(res => res.data)
	}
}

export default Temporal;
