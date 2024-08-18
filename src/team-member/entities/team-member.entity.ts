import { Exclude } from "class-transformer";
import { MemberReference } from "../../member-reference/entities/member-reference.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeamMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imagePath: string;

    @Column()
    description: string;

    @Column()
    link1: string;

    @Column()
    link2: string;

    @Column()
    link3: string;


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

    @Exclude()
    @OneToMany(() => MemberReference, (memberReference) => memberReference.teamMember)
    memberReferences: MemberReference[];

}

