import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BorrowVehicleDTO, CustomerDTO, VehicleDTO } from "../../../models";
import { Customer } from "./Customer";
import { Vehicle } from "./Vehicle";

@Entity()
export class BorrowVehicle implements BorrowVehicleDTO {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    timestamp: string;

    @ManyToOne(type => Customer, customer => customer.borrowedVehicles, { eager: true })
    customer: CustomerDTO;

    @ManyToOne(type => Vehicle, vehicle => vehicle.borrowedBy, { eager: true })
    vehicle: VehicleDTO;

    @Column()
    days: number;

}