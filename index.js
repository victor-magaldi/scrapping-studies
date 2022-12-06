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

  try {
    const request = await axios.get(url);
    const $ = load(request.data);
    const title = $("title").text();

    return res.status(200).json({ titleWebSite: title });
  } catch (e) {
    console.error("error==>", e);

    return res.status(500).json({ error: "error interno" });
  }
});
server.get("/get-metatags", async (req, res) => {
  //http://localhost:3000/get-title?url=https%3A%2F%2Fwww.google.com%2F
  const { url } = req.query;

  try {
    const request = await axios.get(url);
    const $ = load(request.data);
    const metaTags = $("meta");
    console.log("teste=====>", $("meta"));
    return res.status(200).json({ metaTags: String(metaTags) });
  } catch (e) {
    console.error("error==>", e);

    return res.status(500).json({ error: "error interno" });
  }
});
server.get("/search-google", async (req, res) => {
  //http://localhost:3000/search-google?term=https%3A%2F%2Fwww.google.com%2F
  const { term } = req.query;

  try {
    const request = await axios.get("https://www.google.com/search??q=" + term);
    const $ = load(request.data);
    const body = $("body");

    return res.status(200).json({ body: String(body) });
  } catch (e) {
    console.error("error==>", e);

    return res.status(500).json({ error: "error interno" });
  }
});
