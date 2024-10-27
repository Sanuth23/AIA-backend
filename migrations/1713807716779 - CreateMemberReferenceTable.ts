import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMemberReferenceTable1713807716779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'member_reference',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
          },
          {
            name: 'phoneNumberOptional',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'teamMemberId',
            type: 'integer',
          },
          {
            name: 'productCategoryId',
            type: 'integer',
          },
          {
            name: 'createdBy',
            type: 'integer',
            isNullable: true,
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
      'member_reference',
      new TableForeignKey({
        columnNames: ['teamMemberId'],
        referencedTableName: 'team_member',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'member_reference',
      new TableForeignKey({
        columnNames: ['productCategoryId'],
        referencedTableName: 'product_category',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('member_reference');
  }
}
