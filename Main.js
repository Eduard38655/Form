import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Formulario from './Routes/Formulario.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "MainPage.html"));
});

app.use("/",Formulario); 
 

 
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
 