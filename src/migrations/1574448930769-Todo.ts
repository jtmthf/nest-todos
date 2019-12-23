import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Todo1574448930769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          { name: 'id', type: 'bigserial', isPrimary: true },
          { name: 'title', type: 'text' },
          { name: 'complete', type: 'boolean', default: false },
        ],
      }),
    );

    await queryRunner.createIndex(
      'todo',
      new TableIndex({
        name: 'IDX_TODO_COMPLETE',
        columnNames: ['complete'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('todo');
  }
}
