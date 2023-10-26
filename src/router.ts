import { Router } from 'express';

import AuthController from './controller/auth/AuthController';
import BankAccountsController from './controller/bankAccounts/BankAccountsController';
import CategoriesContactController from './controller/categoriesContact/CategoriesContactController';
import CategoriesTaskController from './controller/categoriesTask/CategoriesTaskController';
import CategoriesTransactionsController from './controller/categoriesTransactions/CategoriesTransactionsController';
import ContactController from './controller/contacts/ContactController';
import TransactionController from './controller/transactions/TransactionController';
import UsersController from './controller/users/UsersController';
import { checkToken } from './middlewares/checkToken';

export const router = Router();

// Auth
router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);

// Users
router.get('/users/me', checkToken, UsersController.me);

// Categories-transaction
router.get('/categoriesTransactions', checkToken, CategoriesTransactionsController.findAll);
router.post('/categoriesTransactions', checkToken, CategoriesTransactionsController.create);
router.put('/categoriesTransactions/:categoryTransactionId', checkToken, CategoriesTransactionsController.update);
router.delete('/categoriesTransactions/:categoryTransactionId', checkToken, CategoriesTransactionsController.remove);

// Bank-accounts
router.get('/bank-accounts', checkToken, BankAccountsController.findAll);
router.post('/bank-accounts', checkToken, BankAccountsController.create);
router.put('/bank-accounts/:bankAccountId', checkToken, BankAccountsController.update);
router.delete('/bank-accounts/:bankAccountId', checkToken, BankAccountsController.remove);

// Transactions
router.get('/transactions', checkToken, TransactionController.findAll);
router.post('/transactions', checkToken, TransactionController.create);
router.put('/transactions/:transactionId', checkToken, TransactionController.update);
router.delete('/transactions/:transactionId', checkToken, TransactionController.remove);

// Contacts
router.get('/contacts', checkToken, ContactController.findAll);
router.post('/contacts', checkToken, ContactController.create);
router.put('/contacts/:contactId', checkToken, ContactController.update);
router.delete('/contacts/:contactId', checkToken, ContactController.remove);

// Categories-contacts
router.get('/categoriesContacts', checkToken, CategoriesContactController.findAll);
router.post('/categoriesContacts', checkToken, CategoriesContactController.create);
router.put('/categoriesContacts/:categoryContactId', checkToken, CategoriesContactController.update);
router.delete('/categoriesContacts/:categoryContactId', checkToken, CategoriesContactController.remove);

// Tasks

// Categories-tasks
router.get('/categoriesTasks', checkToken, CategoriesTaskController.findAll);
router.post('/categoriesTasks', checkToken, CategoriesTaskController.create);
router.put('/categoriesTasks/:categoryTaskId', checkToken, CategoriesTaskController.update);
router.delete('/categoriesTasks/:categoryTaskId', checkToken, CategoriesTaskController.remove);
