import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(
    notificationData: ICreateNotificationDTO
  ): Promise<Notification> {
    const notification = this.ormRepository.create(notificationData);
    await this.ormRepository.save(notification);

    return notification;
  }

  public async findUserNotifications(user: string): Promise<Notification[]> {
    const notifications = this.ormRepository.find({
      where: { recipient_id: user },
    });

    return notifications;
  }
}

export default NotificationsRepository;
