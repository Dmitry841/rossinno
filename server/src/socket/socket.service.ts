import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AppService } from 'src/app.service';

interface IDto {
  rowsCount: number;
  value: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayConnection {
  constructor(private readonly appService: AppService) {}
  @SubscribeMessage('server-path')
  async handleEvent(@MessageBody() dto: IDto, @ConnectedSocket() client: any) {
    const res = await this.appService.getLogs(dto.rowsCount);
    client.emit('client-path', res);
  }

  @SubscribeMessage('server-path-add')
  async handleSetNewString(
    @MessageBody() dto: IDto,
    @ConnectedSocket() client: any,
  ) {
    const { rowsCount, value } = dto;
    this.appService.setLog(value);
    const res = await this.appService.getLogs(rowsCount);
    client.emit('client-path', res);
  }
  handleConnection() {
    console.log('CONNECTED');
  }
}
