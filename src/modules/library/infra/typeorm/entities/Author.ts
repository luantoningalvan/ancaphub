import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Author;
