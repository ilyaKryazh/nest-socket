import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Socket, io } from "socket.io-client";
import { AppModule } from "../src/app.module";   
import { User } from "../src/database/schemas/user.schema";
import * as request from 'supertest';
import { RegistrationService } from "../src/authentication/providers/registration.service";
import { UserService } from "../src/database/providers/user.service";

describe('ChatGateway E2E', () => {
    let app: INestApplication;
    let ioClient: Socket;
    let registrationService: RegistrationService
    let userService: UserService

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        app.listen(82);


        registrationService = app.get<RegistrationService>(RegistrationService)
        ioClient = io('http://localhost:82/', {
            autoConnect: false,
            transports: ['websocket', 'polling'],

        });
    });

    it('Check communication', async () => {
        ioClient.connect();
       ioClient.emit('ping', { ping: 'ping' });
        return await new Promise(resolve => {
          ioClient.on("error", (error) => {
            throw new Error(error);
          });
            ioClient.on('ping', (data) => {
                expect(data).toEqual('pong');
                resolve(expect(data).toEqual('pong'));
            })
        }).finally(() => {
            ioClient.disconnect();
        })
    });

    it('Check auth', async () => {

        let mockUser: User = {
            name: 'ALex Coe',
            email: 'xdvds@example.com',
            password: 'password123',
        };
        
        const token = await registrationService.register(mockUser);
        
        var socket = io("http://localhost:82/", {
            auth: {
                token
            }
        }).connect();
        socket.emit('auth');

        return await new Promise(resolve => {
            socket.on("error", (error) => {
            throw new Error(error);
          });
          socket.on('auth', (data) => {
                expect(data).toEqual('success');
                resolve(expect(data).toEqual('success'));
            })
        }).finally(() => {
            socket.disconnect();
        })
    })

    it('Check conversation create', async () => {

        let mockSender: User = {
            name: 'ALex Send',
            email: 'xdvdsend@example.com',
            password: 'password123',
        };
        
        let mockReceiver: User = {
            name: 'ALex Rec',
            email: 'xdvdsrec@example.com',
            password: 'password123',
        }

        const senderToken = await registrationService.register(mockSender);
        const receiverToken = await registrationService.register(mockReceiver);

        const senderSocket = io("http://localhost:82/", {
            auth: {
                token: senderToken
            }
        })


        //recieverId
        //TODO: add friends endpoint
        userService = app.get<UserService>(UserService);

        const reciever = await userService.findByEmail(mockReceiver.email);
        
        senderSocket.emit('createChat', {reciever});

        await new Promise(resolve => {
            senderSocket.on('getConversations', (data) => {
                resolve(expect(data).toHaveProperty('partisipans'));
            })
        })
        
    })

    it('Check conversation message', async () => {

        let mockSender: User = {
            name: 'ALex Send',
            email: 'xdvdsend2@example.com',
            password: 'password123',
        };
        
        let mockReceiver: User = {
            name: 'ALex Rec',
            email: 'xdvdsrec2@example.com',
            password: 'password123',
        }

        const senderToken = await registrationService.register(mockSender);
        const receiverToken = await registrationService.register(mockReceiver);

        const senderSocket = io("http://localhost:82/", {
            auth: {
                token: senderToken
            }
        })

        
    })
    
    afterAll(async () => {
        const userService = app.get<UserService>(UserService);
        await userService.deleteAll();
        await app.close();
    });
});

