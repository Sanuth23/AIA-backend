import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUpcomingEventTable1713807716774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'upcoming_event',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'topic',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'location',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('upcoming_event');
  }
}
