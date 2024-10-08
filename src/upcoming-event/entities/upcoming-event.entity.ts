import { Exclude } from "class-transformer";
import { EventRegistration } from "../../event-registration/entities/event-registration.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'upcoming_event' })
export class UpcomingEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column()
    description: string;


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
    @OneToMany(() => EventRegistration, (eventRegistration) => eventRegistration.upcomingEvent)
    eventRegistrations: EventRegistration[];
}
