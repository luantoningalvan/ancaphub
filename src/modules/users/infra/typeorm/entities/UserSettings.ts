import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_settings')
class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  geolocation: boolean;
}

export default UserSettings;
