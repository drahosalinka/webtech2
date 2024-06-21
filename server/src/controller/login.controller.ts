import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entity/Login";

export class LoginController extends Controller {
    repository = AppDataSource.getRepository(User);
}