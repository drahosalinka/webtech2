import { AppDataSource } from "../data-source";
import { BorrowBook } from "../entity/BorrowBook";
import { Controller } from "./base.controller";

export class BorrowController extends Controller {
    repository = AppDataSource.getRepository(BorrowBook);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            delete entity.timestamp;

            // TODO: összeg 0 feletti-e?

            // TODO: külső létezik-e?

            // TODO: cél létezik-e?

            // TODO: küldő és cél megegyezik-e?

            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    borrowsByCustomer = async (req, res) => {
        try {
            const customerId = req.params.customerId;

            const borrows = await this.repository.findBy({
                customer: { id: customerId } 
            });

            res.json(borrows);
        } catch (err) {
            this.handleError(res, err);
        }
    }

    borrowsByBook = async (req, res) => {
        try {
            const bookId = req.params.bookId;

            const borrows = await this.repository.findBy({
                book: { id: bookId } 
            });

            res.json(borrows);
        } catch (err) {
            this.handleError(res, err);
        }
    }
}