const { json } = require("express");
const express = require("express");

const server = express();
server.listen(3000);

// para conseguir enviar um json por POST
server.use(express.json());

// queryParams = url?param1=teste&param2=teste2
//RouteParams  = curso/2             2 seria o RouteParam
//Request Body = {nome="victor" , teste:}

const cursos = ["nodejs", "javasctipt", "react"];

// midleware Global
// é chamado em todas rotas da sua aplicação
server.use((req, res, next) => {
  return next();
});

// -----------------MIDLEWAREs

// barra a request se o cliente não enviar o campo name
function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "nome do curso é obrigatório" });
  }
  return next();
}
function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: "o curso não existe" });
  }
  req.curso = curso;
  return next();
}

server.get("/cursos", function (req, res) {
  console.log("req", req)
  return res.json({ cursos: cursos });
});

// READ
server.get("/cursos/:id", checkIndexCurso, function (req, res) {
  // http://localhost:3000/curso/4?name=victor
  console.log(req.query.name); // victor
  console.log(req.params.id); //4

  const { id } = req.params;

  return res.json({ curso: cursos[id] });
});

// CREATE
server.post("/cursos", checkCurso, function (req, res) {
  const { name } = req.body;

  console.log("teste")
  cursos.push(name);
  return res.json({ cursos: cursos });
});

// UPDATE
server.put("/cursos/:index", checkCurso, checkIndexCurso, function (req, res) {
  const { index } = req.params;
  const { name } = req.body;
  cursos[index] = name;

  return res.json({ cursos: cursos });
});

// DELETE
server.delete("/cursos/:index", function (req, res) {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json({ cursos: cursos });
});
