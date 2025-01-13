
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const Signup = async (req,res) =>{
    const { userName, email, password } = req.body
    try {
        const existUser = await prisma.user.findUnique({where: {email}})
        if (existUser) return res.status(409).json({error:'User already exists with this email'})
        const hashedPassword = await bcrypt.hash(password,10)
        
        await prisma.user.create({
            data:{
                userName, email, password:hashedPassword
            }
        })
        res.status(201).json({message:'Account Created Successfully'})

        
    } catch (error) {
        res.status(500).json({error:error.message + "Something went wrong"})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

       
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        
        res.cookie('token', token, {
                    httpOnly: true,
                    secure:  false, // set it true when we deploy it on production
                    sameSite: 'none',
                    maxAge: 7 * 24 * 60 * 60 * 1000, 
                    credentials: true
                });

        return res.status(200).json({
            success: true,
            userName: user.userId
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
export const userProfile = async(req,res) => {
    try {
        const { userId } = req.auth;
        const user = await prisma.user.findUnique({where: {id:userId}})
        return res.status(200).json({
            userName: user.userName,
            walletBalance: user.walletBalance,
            email: user.email 
        })
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}

export const getAvailableCards = async(_req,res) => {
    try {
       
        const cards = await prisma.card.findMany({
            where: { isSold: false },
            select: {
                id:true,
                cardNumber: true,
                country: true,
                state: true,
                city:true,
                expiryMonth:true,
                expiryYear:true,
                postalCode: true,
                phoneNumber: true,
                city: true,
                email: true,
                price:true
            }
        });
        function maskCardDetails(card) {
            return {
                id: card.id,
                cardNumber: card.cardNumber.slice(0, 6) + "**********" ,
                country: card.country,
                state: card.state,
                expYear: card.expiryYear,
                expMonth: card.expiryMonth,
                zipCode: card.postalCode,
                city: card.city,
                phoneAvailable: card.phoneNumber ? "Yes" : "No",
                emailAvailable: card.email ? "Yes" : "No",
                price:card.price
            };
        }
          
        // Create an array of masked cards
        const maskedCards = cards.map(maskCardDetails);
        
        // Set security headers
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        res.setHeader('X-Content-Type-Options', 'nosniff');
        
        res.json({
            data: maskedCards,
            total: await prisma.card.count({ where: { isSold: false } })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch available cards' });
    }
}



export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.role !== "admin") {
            return res.status(401).json({ error: 'You are not an admin' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV || 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
            credentials: true
        };
        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            success: true,
            userName: user.userName
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
export const updateBalance = async(req,res) => {
    const { email, amount } = req.body;
   
    try {
        await prisma.user.update({
            where: {email},
        
            data:{
                walletBalance: {
                    increment: parseInt(amount)
                }
            }

        })
        
        return res.status(200).json({ message: `Balance updated successfully of user ${email} by $${amount}` });
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}
export const fetchBalance = async(req,res) => {
    const { userId } = req.auth;

    try {
        const fetchBalance = await prisma.user.findUnique({where: {id:userId}});
        console.log(fetchBalance)
        return res.status(200).json({walletBalance: fetchBalance.walletBalance, userName: fetchBalance.userName});
    } catch (error) {
        return res.status(500).json({message:"something went wrong"});
    }
}

export const getUserCards = async(req, res) => {
    const { userId } = req.auth;
    try {
        const id = userId;
        
        const ownedCards = await prisma.userCard.findMany({
            where: { id: userId},
            include: {
              card: true, 
            },
          });
        if( ownedCards.length === 0) return res.status(200).json({ message: 'Buy your first card from shop section' });
        return res.status(200).json({ message: 'Cards fetched successfully',
            data: ownedCards });
    } catch (error) {
        
        return res.status(401).json({ message: 'something went wrong' });
    }
}
export const buyCard = async(req,res) => {
    const { cardId  } = req.body;
    const { userId } = req.auth;
    
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const findUser = await prisma.user.findUnique({where: {id: userId}});
            
            const findCard = await prisma.card.findUnique({where: {id: cardId}});
            
            if(findCard.isSold === true){
                return { error: 'Card is already sold' };
            }
            
            if(findUser.walletBalance < findCard.price){
                return { error: 'Insufficient balance' };
            }
            
            await prisma.user.update({
                where: {id: userId},
                data: {
                    walletBalance: findUser.walletBalance - findCard.price
                }
            });
            
            await prisma.card.update({
                where: {id: cardId},
                data: {
                    isSold: true
                }
            });
            
            const userCard = await prisma.userCard.create({
                data: {
                    userId: userId,
                    cardId: cardId
                }
            });
            
            
            return { success: true, data: userCard };
        });

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        
        return res.status(200).json({ message: 'Card bought successfully', data: result.data });
    } catch (error) {
        res.status(500).json({message: "something went wrong"});
    }
}
export const filterOption = async(req,res) => {
    try{
        const { cardNumber, zipCode, city, base } = req.body;
        const cards = await prisma.card.findMany({
            where: {
                cardNumber: {
                    contains: cardNumber,
                },
                zipCode: {
                    contains: zipCode,
                },
                city: {
                    contains: city,
                },
            }
        })
        res.status(200).json({ message: 'Cards fetched successfully', data: cards });

    }
    catch(error){
        res.status(500).json({message: "something went wrong"});
    }
}
