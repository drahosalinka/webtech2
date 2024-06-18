import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BorrowBookDTO, CustomerDTO, BookDTO } from "../../../models";
import { Customer } from "./Customer";
import { Book } from "./Book";

@Entity()
export class BorrowBook implements BorrowBookDTO {
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    timestamp: string;

    @ManyToOne(type => Customer, customer => customer.borrowedBooks, { eager: true })
    customer: CustomerDTO;

    @ManyToOne(type => Book, book => book.borrowedBy, { eager: true })
    book: BookDTO;

    @Column()
    days: number;

}