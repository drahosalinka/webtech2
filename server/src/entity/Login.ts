import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;
}
