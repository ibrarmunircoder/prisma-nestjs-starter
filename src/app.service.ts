import { Injectable } from '@nestjs/common';
import { CacheService } from './core/cache/cache.service';

@Injectable()
export class AppService {
  constructor(private readonly cacheService: CacheService) {}
  async getHello(): Promise<string> {
    await this.cacheService.set('key', 'Ibrar', 1000);

    const valueFromCache = await this.cacheService.get('key');
    console.log(valueFromCache, 'valueFromCache');
    return 'Hello World!';
  }
}
