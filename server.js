require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  cors({
    origin: [
      "https://api-book-bw94.onrender.com",
      "http://localhost:8080/",
      "http://localhost:8080/allBooksPage",
    ],
  })
);
app.options("*", cors());
app.use(express.json());

const authRoutes = require("./livraria_api/authRoutes");

mongoose
  .connect(
    "mongodb+srv://thiagocontato1232:123123123@library.bayuj.mongodb.net/?retryWrites=true&w=majority&appName=library",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Mongodb conectado"))
  .catch((err) => console.error("Erro ao conectar no mongo", err));

const bookRoutes = require("./livraria_api/books");
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Servidor executando na porta 5000");
});
