import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import ProfileType from '@modules/profiles/enums/ProfileType';

/**
 * Profile entity for creating multiple profiles for a single user
 */
@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: string;

  @Column({
    type: 'enum',
    enum: ProfileType,
    default: ProfileType.PERSONAL, // A common profile is a personal profile
  })
  type: string;

  /**
   * AKA the 'name'
   */
  @Column('varchar')
  title: string;

  /**
   * This is more of an URL handle instead of just using an UUID
   */
  @Index({ unique: true })
  @Column()
  handle: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Profile;
