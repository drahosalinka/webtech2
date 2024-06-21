import express from 'express';
import { CustomerController } from './controller/customer.controller';
import { BookController } from './controller/book.controller';
import { BorrowController } from './controller/borrow.controller';
import { LoginController } from './controller/login.controller';

export function getRouter() {
    const router = express.Router();

    const customerController = new CustomerController();
    const bookController = new BookController();
    const borrowController = new BorrowController();
    const loginController = new LoginController();

    router.get('/customer', customerController.getAll);
    router.get('/customer/:id', customerController.getOne);
    router.post('/customer', customerController.create);
    router.put('/customer', customerController.update);
    router.delete('/customer/:id', customerController.delete);

    router.get('/book', bookController.getAll);
    router.get('/book/:id', bookController.getOne);
    router.post('/book', bookController.create);
    router.put('/book', bookController.update);
    router.delete('/book/:id', bookController.delete);

    router.post('/borrow', borrowController.create);
    router.get('/borrow/:customerId', borrowController.borrowsByCustomer);
    router.get('/borrow/:bookId', borrowController.borrowsByBook);

    router.get('/return', borrowController.getAll);
    router.get('/return/:id', borrowController.getOne);
    router.post('/return', borrowController.create);
    router.get('/return/:customerId', borrowController.borrowsByCustomer);
    router.get('/return/:bookId', borrowController.borrowsByBook);
    router.delete('/return/:id', borrowController.delete);
    router.put('/return', borrowController.update);
    
    router.get('/login', loginController.getAll);
    router.get('/login/:userName', loginController.getOne);
    router.post('/login', loginController.create);
    router.put('/login', loginController.update);
    router.delete('/login/:userName', loginController.delete);


    return router;
}