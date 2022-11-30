//import express from ('express')
var express = require("express");
var logger = require("morgan");
var helmet = require("helmet");
var httpProxy = require("express-http-proxy");
var resolve = require("path");
var readFile = require("fs");
var safeLoad = require("js-yaml");

//var

const app = express();
let port = 80;

const pathfile = resolve.resolve(process.cwd(), "config.yml");
const readconfig = readFile.readFileSync(pathfile, { encoding: "utf8" });
const services = safeLoad.load(readconfig, { json: true });

console.log(readconfig);

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

console.log(services);

services.services.forEach(({ name, url }) => {
  console.log(`"/${name}"`);
  app.use(`/${name}`, httpProxy(url, { timeout: 3000 }));
});

//app.get(
//  "/getUser",
//  httpProxy("http://localhost:8887/api/getUser", { timeout: 3000 })
//);

//app.use("/proxy", proxy("http://www.google.com"));

//function selectProxyHost(req) {
//  if (req.path.startsWith("/api/getUsers")) {
//    return "https://localhost:8887/api/getUser";
//  } else if (req.path.startsWith("/cinemas")) return "http://localhost:3001/";
//}
//
//app.use((req, res, next) => {
//  httpProxy(selectProxyHost(req))(req, res, next);
//});

app.listen(port, () => {
  console.log("Server at " + port);
});

app.get("/", (req, res) => {
  return res.json({ message: "Running at " });
});
