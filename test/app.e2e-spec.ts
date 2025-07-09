import * as request from 'supertest';
import { getDatabaseService, getServer } from './setup';
import { App } from 'supertest/types';
import { DatabaseService } from 'src/core/services/database.service';

describe('AppController (e2e)', () => {
  let server: App;
  let databaseService: DatabaseService;

  beforeEach(() => {
    server = getServer();
    databaseService = getDatabaseService();
  });

  it('/ (GET)', async () => {
    await databaseService.user.create({
      data: {
        email: 'ibrarmunir009@gmail.com',
        name: 'Ibrar',
      },
    });
    const count = await databaseService.user.count();
    console.log(`COUNT`, count);
    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toBe('Hello World!');
      });
  });
  it('/ (GET)', async () => {
    const count = await databaseService.user.count();
    console.log(`COUNT Expect 0`, count);
    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toBe('Hello World!');
      });
  });
});
