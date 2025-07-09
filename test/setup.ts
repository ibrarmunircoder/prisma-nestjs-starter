import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import helmet from 'helmet';
import { DatabaseService } from 'src/core/services/database.service';
import { CacheService } from 'src/core/cache/cache.service';

let app: INestApplication<App>;
let databaseService: DatabaseService;
let cacheService: CacheService;
let server: App;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.init();
  databaseService = app.get(DatabaseService);
  cacheService = app.get(CacheService);
  server = app.getHttpServer();
});

afterEach(async () => {
  // After each test, reset database and cache
  await cacheService.reset();
  await databaseService.resetDb();
});

afterAll(async () => {
  await app.close();
});

export function getApp(): INestApplication<App> {
  return app;
}
export function getServer(): App {
  return server;
}

export function getDatabaseService(): DatabaseService {
  return databaseService;
}
