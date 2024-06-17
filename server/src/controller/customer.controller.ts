import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";

export class CustomerController extends Controller {
    repository = AppDataSource.getRepository(Customer);
}