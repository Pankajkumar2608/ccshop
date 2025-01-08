import { PrismaClient } from "@prisma/client";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });
const prisma = new PrismaClient();

export const uploadCard = async (req, res) => {
  try {
      upload.single('file')(req, res, async (err) => {
          if (err) return res.status(400).json({ error: err.message });
          if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

          const filePath = req.file.path;
          const results = { success: [], failed: [] };

          try {
              const fileContent = fs.readFileSync(filePath, 'utf-8');
              const lines = fileContent.split('\n').filter(line => line.trim());

              for (const line of lines) {
                  const data = line.trim().split('|');
                  try {
                    
                      const cardData = {
                          cardNumber: data[0],
                          expiryMonth: data[1].split('/')[0] ,  
                          expiryYear: data[1].split('/')[1],   
                          cvv: data[2],
                          fullName: data[3]||"",
                          addressLine: data[4]||"",
                          state: data[5]||"",
                          city: data[6]||"",
                          postalCode: data[7]||"",
                          phoneNumber: data[8]||"",
                          country: data[9]||"",
                          ssn: data[10]||"",
                          birthMonth: data[11]||"",
                          birthDay: data[12]||"",
                          birthYear: data[13]||"",
                          email: data[14]||"",
                      };

                      await prisma.card.create({ data: cardData });
                      results.success.push(cardData.cardNumber);
                  } catch (error) {
                      results.failed.push({
                          cardNumber: data[0],
                          reason: error.code === 'P2002' ? 'Duplicate card number' : error.message
                      });
                  }
              }

              // Cleanup and response
              fs.unlinkSync(filePath);
              return res.status(200).json({
                  success: true,
                  message: "Upload completed",
                  results
              });

          } catch (error) {
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
              throw error;
          }
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message
      });
  }
};