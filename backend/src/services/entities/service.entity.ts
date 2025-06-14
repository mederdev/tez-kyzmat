import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

export enum ServiceCategory {
  UNLOADING = "unloading",
  TRACTORS = "tractors",
  TRUCKS = "trucks",
  CONCRETE = "concrete",
  WATER = "water",
}

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  _id: string;

  @Column({ length: 255 })
  name: string;

  @Column({
    type: "enum",
    enum: ServiceCategory,
  })
  category: ServiceCategory;

  @Column("text")
  description: string;

  @Column({ name: "owner_name", length: 255 })
  ownerName: string;

  @Column({ length: 20 })
  contact: string;

  @Column({ length: 20 })
  whatsapp: string;

  @Column({ length: 50 })
  location: string;

  @Column({ name: "location_name", length: 255 })
  locationName: string;

  @Column({ nullable: true, length: 50 })
  district: string;

  @Column({ name: "district_name", nullable: true, length: 255 })
  districtName: string;

  @Column({ length: 255 })
  price: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: "json", nullable: true })
  images: string[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "owner_id", nullable: true })
  ownerId: string;

  @ManyToOne(() => User, (user) => user.services, { onDelete: "SET NULL" })
  @JoinColumn({ name: "owner_id" })
  owner: User;
}
