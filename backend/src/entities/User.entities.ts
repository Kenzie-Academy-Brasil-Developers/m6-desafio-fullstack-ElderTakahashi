import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Contact from "./Contact.entities";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: "text", nullable: true })
  picture: string | null;

  @Column({ length: 120 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);

    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
