import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewUserFields1607737160871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'is_verified',
        type: 'boolean',
        default: false,
      }),
      new TableColumn({
        name: 'bio',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'location',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'url',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'birthday',
        type: 'timestamp',
        isNullable: true,
      }),
      new TableColumn({
        name: 'cover',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'old_id',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_verified');
    await queryRunner.dropColumn('users', 'bio');
    await queryRunner.dropColumn('users', 'location');
    await queryRunner.dropColumn('users', 'url');
    await queryRunner.dropColumn('users', 'birthday');
    await queryRunner.dropColumn('users', 'cover');
    await queryRunner.dropColumn('users', 'old_id');
  }
}
