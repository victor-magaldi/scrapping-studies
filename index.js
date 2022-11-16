const express = require("express");
const { load } = require("cheerio");

const axios = require("axios");

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

server.get("/get-title", async (req, res) => {
  //http://localhost:3000/get-title?url=https%3A%2F%2Fwww.google.com%2F
  const { url } = req.query;

  const request = await axios.get(url);
  const $ = load(request.data);
  const title = $("title").text();
  return res.json({ titleWebSite: title });
});
