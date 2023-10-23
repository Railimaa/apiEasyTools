import { Router } from 'express';
import AuthController from '../src/controller/auth/AuthController';
import BankAccountsController from './controller/bankAccounts/BankAccountsController';
import CategoriesTransactionsController from './controller/categoriesTransactions/CategoriesTransactionsController';
import TransactionController from './controller/transactions/TransactionController';
import UsersController from './controller/users/UsersController';
import { checkToken } from './middlewares/checkToken';


export const router = Router();

//Auth
router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);

//Users
router.get('/users/me', checkToken, UsersController.me);


//Categories-transaction
router.get('/categoriesTransactions', checkToken, CategoriesTransactionsController.findAll);
router.post('/categoriesTransactions', checkToken, CategoriesTransactionsController.create);
router.put('/categoriesTransactions/:categoryTransactionId', checkToken, CategoriesTransactionsController.update);
router.delete('/categoriesTransactions/:categoryTransactionId', checkToken, CategoriesTransactionsController.remove);


//Bank-accounts
router.get('/bank-accounts', checkToken, BankAccountsController.findAll);
router.post('/bank-accounts', checkToken, BankAccountsController.create);
router.put('/bank-accounts/:bankAccountId', checkToken, BankAccountsController.update);
router.delete('/bank-accounts/:bankAccountId', checkToken, BankAccountsController.remove);


//Transactions
router.get('/transactions', checkToken, TransactionController.findAll);
router.post('/transactions', checkToken, TransactionController.create);
router.put('/transactions/:transactionId', checkToken, TransactionController.update);
router.delete('/transactions/:transactionId', checkToken, TransactionController.remove);
