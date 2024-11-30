import { Router } from 'express';
import sql from 'mssql';
import nodemailer from "nodemailer";
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    user: '',
    password: '',
    database: 'NODEJS',
    server: '',
    options: { encrypt: true, trustServerCertificate: true },
};
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "MainPage.html"));
  });

router.post('/', (req, res,next) => {
    const { Name, Surname, Email, Phone, Ubication, textarea } = req.body;
    sql.connect(config)
        .then(pool => {
            return pool.request()
                .input("Name", sql.NVarChar, Name)
                .input("Surname", sql.NVarChar, Surname)
                .input("Phone", sql.NVarChar, Phone)
                .input("Email", sql.NVarChar, Email)
                .input("Ubication", sql.NVarChar, Ubication)
                .input("textarea", sql.NVarChar, textarea)
                .query('INSERT INTO ListContact (Name, Surname, Email, Phone, Ubication, textarea) VALUES (@Name, @Surname, @Email, @Phone, @Ubication, @textarea)');
                 
        })
        .then(result => {
               if (result.rowsAffected[0]>0) {  
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "INFO@gmail.com", // Your email
                        pass: "Node.js"  // Application-specific password
                    }
                });
            
                const mailOptions = {
                    from: "INFO@gmail.com",
                    to:  `${Email}`,
                    subject: "Contact Information",
                    html: `
                    <h3>Hello, My Name is ${Name} ${Surname}</h3>
                    <p>${textarea}</p>
                    <span>Call me back at: ${Phone} or Email me using: ${Email}</span>
                    ` 
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ error: "Failed to send email", details: error.message });
                    }
            
                    console.log("Email sent: " + info.response);
                    res.status(200).json({ message: "Email sent successfully!", info: info.response });
                });
               } else {
                console.log('Somenthing went wrong');
               }           
        })
        .catch(error => {
            console.error("Error al insertar datos:", error);
         });
         
});
 
 

export default router;
