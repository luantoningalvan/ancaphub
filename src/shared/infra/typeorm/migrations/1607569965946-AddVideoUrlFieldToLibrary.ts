import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddVideoUrlFieldToLibrary1607569965946
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'library_item',
      new TableColumn({
        name: 'video_url',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('library_item', 'video_url');
  }
}
