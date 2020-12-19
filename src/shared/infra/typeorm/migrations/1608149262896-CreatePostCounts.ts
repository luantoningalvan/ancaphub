import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreatePostCounts1608149262896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('posts', [
      new TableColumn({
        name: 'favorite_count',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'comment_count',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'spread_count',
        type: 'integer',
        default: 0,
      }),
    ]);

    await queryRunner.dropColumn('posts', 'number_of_likes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'favorite_count');
    await queryRunner.dropColumn('posts', 'comment_count');
    await queryRunner.dropColumn('posts', 'spread_count');
    await queryRunner.addColumn(
      'posts',
      new TableColumn({ name: 'number_of_likes', type: 'integer' })
    );
  }
}
