import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { DatabaseModule } from '../database.module';
import { INestApplication } from '@nestjs/common';

describe('UserService', () => {
  let app: INestApplication;
  let service: UserService;

  const mockUser: User = {
    name: 'Lana Kane',
    email: 'sxdfk@example.com',
    password: 'password123'
}


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MongooseModule.forRoot('mongodb://user:pass@mongo_db:27017/nest'), 
      ],
    }).compile();

    app = await module.createNestApplication()
    await app.init()
    service = await app.get(UserService);
  });

  afterAll(async () => {
    await service.deleteAll();
    await app.close();
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
      let user = await service.create(mockUser);
      expect(user.name).toEqual(mockUser.name);
      expect(user.email).toEqual(mockUser.email);
      expect(user.password).toEqual(mockUser.password);
  });

  it('should return user id', async () => {
    let user = await service.findByEmail(mockUser.email);
    expect(user._id).toBeDefined();
  })

  it('should find a user by email', async () => {
      const users = await service.findAll();
      expect(users.length).toBeGreaterThan(0);
  });

  it('should delete a user', async () => {
      const user = await service.findByEmail(mockUser.email);
      await service.delete(user);
      const users = await service.findByEmail(mockUser.email);
      expect(users).toBeNull();
  });

});
