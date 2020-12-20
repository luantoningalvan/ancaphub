import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('relationships')
class Relationships {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followed_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'followed_id' })
  followed: User;

  @Column()
  follower_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}

export default Relationships;
