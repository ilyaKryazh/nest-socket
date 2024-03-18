import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Socket, io } from "socket.io-client";
import { AppModule } from "../src/app.module";   

describe('ChatGateway E2E', () => {
    let app: INestApplication;
    let ioClient: Socket;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        app.listen(82);

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
          ioClient.on('connect', () => {
            console.log('connect success')
          })
            ioClient.on('ping', (data) => {
                expect(data).toEqual('pong');
                resolve(expect(data).toEqual('pong'));
            })
        }).finally(() => {
            ioClient.disconnect();
        })
    });
    
    afterEach(async () => {

        await app.close();
    });
});

