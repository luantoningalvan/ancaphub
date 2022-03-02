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
import uploadConfig from '@config/upload';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  cover: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  faq: string;

  @Column({ nullable: true })
  donation_methods: string;

  @Column({ nullable: true })
  links: string;

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
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_BASE_URL}/files/${this.avatar}`;
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
        return `${process.env.API_BASE_URL}/files/${this.cover}`;
      case 's3':
        return `https://ancaphub.s3.amazonaws.com/${this.cover}`;
      default:
        return null;
    }
  }
}

export default Project;
