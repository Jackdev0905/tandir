import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import app from "./app";
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then(() => {
    console.log("MongoDB connection is succeed");
    
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, () => {
      console.log("The server is running successfully on", PORT);
      console.log(`Admin project on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
