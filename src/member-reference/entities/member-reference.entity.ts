import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { TeamMember } from "../../team-member/entities/team-member.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MemberReference {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    teamMemberId: number;

    @Column()
    productCategoryId: number;


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

    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.memberReferences)
    @JoinColumn({name:'productCategoryId'})
    productCategory: ProductCategory;

    @ManyToOne(() => TeamMember, (teamMember) => teamMember.memberReferences)
    @JoinColumn({name:'teamMemberId'})
    teamMember: TeamMember;
}

