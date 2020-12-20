import {
  Entity,
  ObjectID,
  Column,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('locations')
class UserLocation {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  location: {
    type: 'Point';
    coordinates: number[];
  };

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserLocation;
