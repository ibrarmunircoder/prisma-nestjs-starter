import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { LoggerService } from './core/logger/logger.service';
import { CacheService } from './core/cache/cache.service';
import { mockDeep } from 'jest-mock-extended';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { DatabaseService } from './core/services/database.service';

describe('AppService', () => {
  let appService: AppService;
  let cacheService: DeepMocked<CacheService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: LoggerService,
          useValue: createMock<LoggerService>(),
        },
        {
          provide: CacheService,
          useValue: createMock<CacheService>(),
        },
        {
          provide: DatabaseService,
          useValue: mockDeep<DatabaseService>(),
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    cacheService = app.get(CacheService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      cacheService.get.mockResolvedValue(`Ibrar`);
      const result = await appService.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});
