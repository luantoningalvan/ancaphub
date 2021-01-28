import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Relationship from './Relationship';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @Column()
  cover: string;

  @Column()
  bio: string;

  @Column()
  location: string;

  @Column()
  birthday: Date;

  @Column()
  url: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Relationship, (follow) => follow.follower)
  following: Relationship[];

  @OneToMany(() => Relationship, (follow) => follow.followed)
  followers: Relationship[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://ancaphub.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'cover_url' })
  getCoverUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cover}`;
      case 's3':
        return `https://ancaphub.s3.amazonaws.com/${this.cover}`;
      default:
        return null;
    }
  }
}

export default User;
