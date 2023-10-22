import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_settings')
class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => UserSettings)
  @JoinColumn({ name: 'user_id' })
  user: UserSettings;

  @Column()
  geolocation: boolean;
}

export default UserSettings;
