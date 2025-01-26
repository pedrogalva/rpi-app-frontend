import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// Caminho para o build do React
const reactBuildPath = path.join(__dirname, "../build");

app.use("/front_rpi", express.static(reactBuildPath));

app.get("/front_rpi/*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
