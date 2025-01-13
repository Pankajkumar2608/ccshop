import express from 'express';
import { Signup, login,  userProfile, getAvailableCards,adminLogin, updateBalance, fetchBalance, getUserCards, buyCard, filterOption} from '../controllers/authController.js';
import {  uploadCard } from '../controllers/uploadController.js';
import {loginAuth, isAdmin} from '../middleware/authication.js';


const router = express.Router();

router.post('/signup', Signup);
router.post('/login', login);
router.get('/profile', loginAuth, userProfile);
router.post('/adminLogin', adminLogin);
router.get('/cards/available' ,getAvailableCards);
router.post('/uploadcc',uploadCard);
router.post('/updateBalance', isAdmin, updateBalance);
router.get('/user/cards', loginAuth ,getUserCards);
router.get('/fetchBalance', loginAuth ,fetchBalance);
router.post('/buycard', loginAuth , buyCard);
router.post('/filter', loginAuth, filterOption);

export default router;