import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname em ES Modules com TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, "../build")));

// Redireciona todas as rotas para o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
