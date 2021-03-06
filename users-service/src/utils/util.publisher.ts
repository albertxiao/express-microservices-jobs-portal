import IORedis, { Redis } from 'ioredis'
import { IPublisher } from '../interface/interface.publisher'

export class Publisher {
	private static key: string

	constructor(configs: Readonly<IPublisher>) {
		Publisher.key = configs.key
		Publisher.set(configs.key)
	}

	public static get(): string {
		return Publisher.key
	}

	private static set(key: string): void {
		Publisher.key = key
	}

	private redisConnect(): Redis {
		const ioRedis = new IORedis({
			host: '127.0.0.1',
			port: 6379,
			maxRetriesPerRequest: 50,
			connectTimeout: 5000,
			enableReadyCheck: true,
			enableAutoPipelining: true
		}) as IORedis.Redis

		return ioRedis
	}

	public async setString(keyName: string, data: string): Promise<void> {
		const ioRedis = this.redisConnect()
		await ioRedis.set(keyName, data)
	}

	public async setMap(keyName: string, data: Record<string, any>): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.hmset(keyName, { ...data })
	}

	public async setArray(keyName: string, data: Array<Record<string, any>>): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.hmset(keyName, JSON.stringify({ data: data }))
	}

	public async setResponse(data: Record<string, any>): Promise<void> {
		const ioRedis = this.redisConnect() as Redis
		await ioRedis.hmset('message:speaker', { ...data })
	}
}
