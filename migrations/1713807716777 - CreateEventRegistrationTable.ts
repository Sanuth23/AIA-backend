import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEventRegistrationTable1713807716777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_registration',
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
            name: 'age',
            type: 'integer',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'upcomingEventId',
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
      'event_registration',
      new TableForeignKey({
        columnNames: ['upcomingEventId'],
        referencedTableName: 'upcoming_event',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_registration');
  }
}
