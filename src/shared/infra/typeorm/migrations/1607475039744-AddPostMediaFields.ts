import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPostMediaFields1607475039744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('posts', [
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'media',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'image');
    await queryRunner.dropColumn('posts', 'media');
  }
}
