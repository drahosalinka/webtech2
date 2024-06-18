import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BorrowBook } from "./BorrowBook";

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
    libraryCard: string;

    @OneToMany(type => BorrowBook, borrow => borrow.customer)
    borrowedBooks: BorrowBook[];
}
