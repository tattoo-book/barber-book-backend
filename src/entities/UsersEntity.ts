import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TattooArtistEntity } from './TattooArtistEntity';

@Entity({ schema: 'users', name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column('int', { array: true, default: () => 'ARRAY[2]', nullable: false })
  roles: number[];

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => TattooArtistEntity, (tattooArtist) => tattooArtist.user)
  tattooArtists: TattooArtistEntity[];

  setRoles(roles: number[]) {
    this.roles = roles;
  }
}
