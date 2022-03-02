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
import uploadConfig from '@config/upload';

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
  getAvatarUrl(): string | null {
    if (!this.cover) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_BASE_URL}/files/${this.cover}`;
      case 's3':
        return `https://ancaphub.s3.amazonaws.com/${this.cover}`;
      default:
        return null;
    }
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
