import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageConsumer } from './queue/message.consumer';
import { MessageProducer } from './queue/message.producer';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private messageProducer: MessageProducer, private messageConumer: MessageConsumer) { }

  private logger: Logger = new Logger("AppGateWay");

  afterInit(server: Server) {
    this.logger.log("WebSocket Gateway Initialted")
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ID : ${client.id}  is Connected`);
    this.messageConumer.clientsArray.push(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ID : ${client.id}  is Disconnected`);
    this.messageConumer.clientsArray = this.messageConumer.clientsArray.filter((storedClient) => {
      return client.id != storedClient.id
    });
  }

  @SubscribeMessage('dataToServer')
  async handleMessage(client: Socket, data: number) {

    try {
      await this.messageProducer.sendImportData(client.id, data)
      client.emit('processing', "Request is Processing. Will Notify Once Finished")
    } catch (error) {
      client.emit('errorProcessing', error.message)
    }

  }

}
