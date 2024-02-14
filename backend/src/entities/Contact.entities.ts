import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User.entities";

@Entity("contacts")
export default class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ type: "text", nullable: true })
  picture: string | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  email: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone: string | null;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: "CASCADE" })
  user: User;
}
