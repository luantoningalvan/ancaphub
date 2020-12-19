import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @Column()
  favorite_count: number;

  @Column()
  spread_count: number;

  @Column()
  comment_count: number;

  @Column()
  image: string;

  @Column()
  media: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  get getAvatarUrl(): string | null {
    return this.image
      ? `${process.env.API_BASE_URL}/files/${this.image}`
      : null;
  }
}

export default Post;
