import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import slugify from 'slugify';

@Entity('authors')
class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @BeforeInsert()
  generateSlug(): void {
    this.username = this.username || slugify(this.name);
  }
}

export default Author;
