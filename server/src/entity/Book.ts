import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Status } from "../../status.enum";
import { BorrowBook } from "./BorrowBook";
import { BorrowController } from "../controller/borrow.controller";


@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ISBN: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    yearOfPublishing: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.Free,
    })
    state: Status;

    @OneToMany(type => BorrowBook, borrow => borrow.book)
    borrowedBy: BorrowBook[];
}
