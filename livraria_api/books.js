const express = require("express");
const BookSchema = require("../back_end/models/Books");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Defina o diretório onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Middleware do multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido. Apenas JPEG e PNG são permitidos."));
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 }, // Limite de 2MB
});

router.post(
  "/",
  upload.single("image"), // "image" deve ser o nome do campo do arquivo no formulário
  async (req, res) => {
    const { title, author, year } = req.body;

    try {
      const newBook = new BookSchema({
        title,
        author,
        year,
        image: req.file?.path, // Certifique-se de usar o caminho do arquivo corretamente
      });

      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      res.status(500).json({ message: "Erro ao cadastrar livro", error });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const books = await BookSchema.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os livros", error });
  }
});

router.put("/:id", async (req, res) => {
  const { title, author, year } = req.body;

  try {
    const updatedBook = await BookSchema.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar livro", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await BookSchema.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar livro", error });
  }
});

module.exports = router;
