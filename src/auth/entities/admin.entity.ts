import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    isSuperAdmin: boolean;

    
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
