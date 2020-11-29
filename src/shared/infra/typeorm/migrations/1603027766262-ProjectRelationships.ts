import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectRelationships1603027766262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_relationships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'project_id',
            type: 'uuid',
          },
          {
            name: 'follower_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'ProjectFollower',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['follower_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ProjectFollowed',
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            columnNames: ['project_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_relationships');
  }
}
