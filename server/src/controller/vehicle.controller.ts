import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";

export class VehicleController extends Controller {
    repository = AppDataSource.getRepository(Vehicle);
}