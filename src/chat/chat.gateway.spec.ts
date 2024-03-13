import { INestApplication } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { Test, TestingModule } from "@nestjs/testing";
import { Socket, io } from "socket.io-client";

describe('ChatGateway (e2e)', () => {
  let app: INestApplication;
  let chatGateway: ChatGateway;
  let ioClient: Socket

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ChatGateway],
    }).compile();

    app = module.createNestApplication();
    chatGateway = app.get<ChatGateway>(ChatGateway);

    ioClient = io('http://localhost:80', {
        autoConnect: false,
        transports: ['websocket', 'polling'],
    });
    app.listen(80);
  });

  afterAll(async () => {
    await app.close();
  });

    it('chatGateway should be defined', () => {
      expect(chatGateway).toBeDefined();
    });

    it('chatGateway should handle message', async () => {
       ioClient.connect();
       ioClient.emit('ping', { ping: 'ping' });
        await new Promise<void>(resolve => {
          ioClient.on("error", (error) => {
            throw new Error(error);
          });
          ioClient.on('connect', () => {
            console.log('connect success')
          })
            ioClient.on('ping', (data) => {
              console.log(data)
                expect(data).toEqual('pong');
                resolve();
            })
        })
      ioClient.disconnect();
    });
});