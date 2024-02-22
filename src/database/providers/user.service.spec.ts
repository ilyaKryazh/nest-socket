import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by email', async () => {
    const user: User = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const createdUser = await service.create(user);

    const foundUser = await service.findByEmail('test@example.com');
    expect(foundUser).toEqual(createdUser);
  });

  it('should create a new user', async () => {
    const user: User = { name: 'Test User 2', email: 'test2@example.com', password: 'password456' };
    const createdUser = await service.create(user);

    expect(createdUser.email).toBe('test2@example.com');
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(users).toHaveLength(2); // Assuming there are already 2 users in the database
    await service.deleteManyl(users);
  });
});
