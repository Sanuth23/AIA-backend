import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'activity' })
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    description: string;

    @Column()
    imagePath: string;


    @Column()
    createdBy: number;

    @Column()
    updatedBy: number;

    @Column()
    deletedBy: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    deletedAt: Date;
}
