import { JoiSchema } from 'nestjs-joi';
import { BookingSchema } from 'src/common/joi/schemas/bookings/Booking';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsersEntity } from './UsersEntity';

export class BookingTimes {
  @JoiSchema(BookingSchema.start.required())
  start: string;

  @JoiSchema(BookingSchema.start.required())
  end: string;
}

export class Booking {
  @JoiSchema(BookingSchema.daysWeek.required())
  sunday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  monday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  tuesday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  wednesday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  thursday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  friday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  saturday: BookingTimes[];
}

@Entity('barbers', { schema: 'barbers' })
export class BarberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.Barbers)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column('jsonb', {
    nullable: true,
    default: () => '{"sunday": [], "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "saturday": []}\'::jsonb',
  })
  bookings: Booking;
}
