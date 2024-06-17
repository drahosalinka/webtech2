import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Status } from "../../status.enum";
import { BorrowVehicle } from "./BorrowVehicle";
import { BorrowController } from "../controller/borrow.controller";


@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vehicleId: string;

    @Column()
    type: string;

    @Column()
    manufacturer: string;

    @Column()
    chassisNumber: string;

    @Column()
    dateOfAcquisition: string;

    @Column()
    price: number;

    @Column()
    km: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.Free,
    })
    state: Status;

    @OneToMany(type => BorrowVehicle, borrow => borrow.vehicle)
    borrowedBy: BorrowVehicle[];
}
