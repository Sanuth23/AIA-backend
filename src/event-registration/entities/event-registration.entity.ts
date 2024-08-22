import { UpcomingEvent } from "../../upcoming-event/entities/upcoming-event.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'event_registration' })
export class EventRegistration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    age: number;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    upcomingEventId: number;

    
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

    @ManyToOne(() => UpcomingEvent, (upcomingEvent) => upcomingEvent.eventRegistrations)
    @JoinColumn({name:'upcomingEventId'})
    upcomingEvent: UpcomingEvent;
}
