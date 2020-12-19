import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

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

  @Expose({ name: 'avatar_url' })
  get getAvatarUrl(): string | null {
    return this.avatar ? this.avatar : null;
  }

  @Expose({ name: 'cover_url' })
  get getCoverUrl(): string | null {
    return this.cover
      ? `${process.env.API_BASE_URL}/files/${this.cover}`
      : null;
  }
}

export default User;
