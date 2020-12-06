import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Relationships1602125219042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'relationships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'followed_id',
            type: 'uuid',
          },
          {
            name: 'follower_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'Follower',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['follower_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Followed',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['followed_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relationships');
  }
}
