import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BorrowVehicle } from "./BorrowVehicle";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    idCard: string;

    @OneToMany(type => BorrowVehicle, borrow => borrow.customer)
    borrowedVehicles: BorrowVehicle[];
}
