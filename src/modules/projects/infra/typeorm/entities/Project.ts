import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  cover: string;

  @Column()
  category: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  faq: Array<{ question: string; answer: string }>;

  @Column()
  created_by: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  get getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.API_BASE_URL}/files/${this.avatar}`
      : null;
  }

  @Expose({ name: 'cover_url' })
  get getCoverUrl(): string | null {
    return this.cover
      ? `${process.env.API_BASE_URL}/files/${this.cover}`
      : null;
  }
}

export default Project;
