import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from '../src/database/schemas/user.schema';
import { Socket, io } from 'socket.io-client';
import { UserService } from '../src/database/providers/user.service';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let userSservice: UserService
  let ioClient: Socket

  const mockUser1: User = {
    name: 'ALex Doe',
    email: 'p3dwH2x@example.com',
    password: 'password123',
  };

  const mockUser2: User = {
    name: 'Rene Doe',
    email: 'p3H2xs1@example.com',
    password: 'password123',
  };


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userSservice = moduleFixture.get<UserService>(UserService);

    ioClient = io('http://localhost:80', {
        autoConnect: false,
        transports: ['websocket', 'polling'],
    });

    await app.init();
    app.listen(80)
  });

  afterAll(async () => {
    
    await userSservice.deleteAll();
    await app.close();
  })

  it('Registration', () => {
    return request(app.getHttpServer())
    .post('/register')
    .send(mockUser1).expect(201).expect((x) => x instanceof String);
  });

  it('Login', () => {

    const userCredentials = {
      email: mockUser1.email,
      password: mockUser1.password
    }

    return request(app.getHttpServer())
    .post('/login')
    .send(userCredentials).expect(201).expect((x) => x instanceof String);
  })
});
