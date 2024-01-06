import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import AuthController from './controller/auth/AuthController';
import BankAccountsController from './controller/bankAccounts/BankAccountsController';
import CategoriesContactController from './controller/categoriesContact/CategoriesContactController';
import CategoriesTaskController from './controller/categoriesTask/CategoriesTaskController';
import CategoriesTransactionsController from './controller/categoriesTransactions/CategoriesTransactionsController';
import ContactController from './controller/contacts/ContactController';
import TaskController from './controller/task/TaskController';
import TransactionController from './controller/transactions/TransactionController';
import UsersController from './controller/users/UsersController';
import WheaterController from './controller/weather/WheaterController';
import { checkToken } from './middlewares/checkToken';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Auth
router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);

// Users
router.get('/users/me', checkToken, UsersController.me);
router.put('/users/:userId', checkToken, upload.single('imagePath'), UsersController.update);

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
router.get('/categoriesContacts/:categoryContactId/contacts', checkToken, CategoriesContactController.findAllByCategory);

// Tasks
router.get('/tasks', checkToken, TaskController.findAll);
router.post('/tasks', checkToken, TaskController.create);
router.put('/tasks/:taskId', checkToken, TaskController.update);
router.patch('/tasks/:taskId', checkToken, TaskController.updateDone);
router.delete('/tasks/:taskId', checkToken, TaskController.remove);

// Categories-tasks
router.get('/categoriesTasks', checkToken, CategoriesTaskController.findAll);
router.post('/categoriesTasks', checkToken, CategoriesTaskController.create);
router.put('/categoriesTasks/:categoryTaskId', checkToken, CategoriesTaskController.update);
router.delete('/categoriesTasks/:categoryTaskId', checkToken, CategoriesTaskController.remove);

router.get('/weather', checkToken, WheaterController.findAll);
