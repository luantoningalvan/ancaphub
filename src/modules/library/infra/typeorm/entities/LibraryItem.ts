import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Author from './Author';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Entity('library_item')
class LibraryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author_id: string;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @Column()
  cover: string;

  @Expose({ name: 'cover_url' })
  get getAvatarUrl(): string | null {
    return this.cover
      ? `${process.env.API_BASE_URL}/files/${this.cover}`
      : null;
  }

  @Column()
  type: string;

  @Column()
  content: string;

  @Column()
  video_url: string;

  @Column()
  status: string;

  @Column()
  contributor_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'contributor_id' })
  contributor: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default LibraryItem;
