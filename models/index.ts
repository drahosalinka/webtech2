import { Status } from "../server/status.enum";

export interface CustomerDTO {
    id: number;
    customerId: string;
    name: string;
    address: string;
    phone: string;
    libraryCard: string;
}

export interface BookDTO {
    id: number;
    ISBN: string;
    title: string;
    author: string;
    publisher: string;
    yearOfPublishing: number;
    state: Status;
}

export interface BorrowBookDTO {
    id: number;
    timestamp: string;
    customer: null | CustomerDTO;
    book: null | BookDTO;
    days: number;
}

export interface UserDTO {
    id: number;
    userName: string;
    password: string;
}