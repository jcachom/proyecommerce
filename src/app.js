const PUERTO = 8080;
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require("./routers/products.router");
const cartsRouter = require("./routers/carts.router");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor arriba:http://localhost:${PUERTO}`);
});


/*
GET : all products> http://localhost:8080/api/products
GET :with limits> http://localhost:8080/api/products/?limit=2
GET  : Produc by id > http://localhost:8080/api/products/7
POST : Add product > http://localhost:8080/api/products
{
    "code": "abc149",
    "title": "producto prueba",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

  PUT : Update a product > http://localhost:8080/api/products/13
  {
    "code": "abc146",
    "title": "producto prueba3",
    "description": "Este es un producto prueba",
    "price": 200,
    "status": true,
    "stock": 250,
    "thumbnail": [
      "url1",
      "url2"
    ]
  }

  DELETE : Delete a product > http://localhost:8080/api/products/13
  POST : Create a Cart > http://localhost:8080/api/carts
  GET : Get all Carts > http://localhost:8080/api/carts
  GET : Get a Cart > http://localhost:8080/api/carts/5
  GET : All products by Cart > http://localhost:8080/api/carts/5
  DELETE : Delete a cart > http://localhost:8080/api/carts/6
  DELETE : Delete a product in a Cart > http://localhost:8080/api/carts/40/product/8


*/