import dotenv from "dotenv";
import { createExpressApp } from "./common/config/express";
//Cargar variables de entorno
dotenv.config();

//Conectar a la base de datos
// connectDB();
//Crear la aplicación Express
const app = createExpressApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
