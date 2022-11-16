const { json } = require("express");
const { load } = require("cheerio");
const express = require("express");

const server = express();
server.listen(3000);

// para conseguir enviar um json por POST
server.use(express.json());

// queryParams = url?param1=teste&param2=teste2
//RouteParams  = curso/2             2 seria o RouteParam
//Request Body = {nome="victor" , teste:}

const cursos = ["nodejs", "javasctipt", "react"];

const url = "http://webcode.me";
// midleware Global
// é chamado em todas rotas da sua aplicação
server.use((req, res, next) => {
  return next();
});

server.get("/", function (req, res) {
  console.log("req", req);
  return res.json({ cursos: cursos });
});
