import { Status } from "../server/status.enum";

export interface CustomerDTO {
    id: number;
    customerId: string;
    name: string;
    address: string;
    phone: string;
    libraryCard: string;
}

export interface VehicleDTO {
    id: number;
    vehicleId: string;
    type: string;
    manufacturer: string;
    chassisNumber: string;
    dateOfAcquisition: string;
    price: number;
    km: number;
    state: Status;
}

export interface BorrowVehicleDTO {
    id: number;
    timestamp: string;
    customer: null | CustomerDTO;
    vehicle: null | VehicleDTO;
    days: number;
}