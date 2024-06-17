import express from 'express';
import { CustomerController } from './controller/customer.controller';
import { VehicleController } from './controller/vehicle.controller';
import { BorrowController } from './controller/borrow.controller';

export function getRouter() {
    const router = express.Router();

    const customerController = new CustomerController();
    const vehicleController = new VehicleController();
    const borrowController = new BorrowController();

    router.get('/customer', customerController.getAll);
    router.get('/customer/:id', customerController.getOne);
    router.post('/customer', customerController.create);
    router.put('/customer', customerController.update);
    router.delete('/customer/:id', customerController.delete);

    router.get('/vehicle', vehicleController.getAll);
    router.get('/vehicle/:id', vehicleController.getOne);
    router.post('/vehicle', vehicleController.create);
    router.put('/vehicle', vehicleController.update);
    router.delete('/vehicle/:id', vehicleController.delete);

    router.post('/borrow', borrowController.create);
    router.get('/borrow/:customerId', borrowController.borrowsByCustomer);
    router.get('/borrow/:vehicleId', borrowController.borrowsByVehicle);

    router.get('/return', borrowController.getAll);
    router.get('/return/:id', borrowController.getOne);
    router.post('/return', borrowController.create);
    router.get('/return/:customerId', borrowController.borrowsByCustomer);
    router.get('/return/:vehicleId', borrowController.borrowsByVehicle);
    router.delete('/return/:id', borrowController.delete);
    router.put('/return', borrowController.update);
    
    return router;
}