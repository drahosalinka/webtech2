import "reflect-metadata"
import { DataSource } from "typeorm"
import { Customer } from "./entity/Customer"
import { Book } from "./entity/Book"
import { BorrowBook } from "./entity/BorrowBook"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "library",
    synchronize: true,
    logging: true,
    entities: [Customer, Book, BorrowBook],
    migrations: [],
    subscribers: [],
})
