import Notification from '../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../repositories/INotificationsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProjectService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute(user: string): Promise<Notification[]> {
    return await this.notificationsRepository.findUserNotifications(user);
  }
}

export default ShowProjectService;
