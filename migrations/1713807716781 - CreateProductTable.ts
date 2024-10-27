import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductTable1713807716781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'mainTitle',
            type: 'varchar',
          },
          {
            name: 'topic',
            type: 'varchar',
          },
          {
            name: 'coverAge',
            type: 'varchar',
          },
          {
            name: 'issueAge',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'categoryId',
            type: 'integer',
          },
          {
            name: 'createdBy',
            type: 'integer',
          },
          {
            name: 'updatedBy',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: 'product_category',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
