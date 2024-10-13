import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;
}
