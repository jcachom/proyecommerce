let { Router } = require("express");
const router = Router();
let productManager = require("../services/productManager");
let oProducto = new productManager("./database/productos.json");

let estructMensaje = require("../utils/estructMensaje");

router.get("/:pid", (req, res) => {
  try {
    let idProd = req.params["pid"];
    const main = async () => {
      response = await oProducto.getProductById(idProd);
      res.json(response);
    };
    main();
  } catch (error) {
    response.status = "E";
    response.mensaje = error.message;
    res.json(response);
  }
});
//http://localhost:8080/products/7

router.get("/", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let cantFilas = new Number(req.query.limit ?? 0);

      response = await oProducto.getProducts();

      if (cantFilas > 0 && cantFilas <= response.length) {
        response = response.slice(0, cantFilas);
      }
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };

  main();
});
//http://localhost:8080/products/?limit=2

router.post("/", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let product = req.body;
      response = await oProducto.addProduct(product);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.put("/:pid", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let product = req.body;
      product.id = new Number(req.params["pid"]);
      response = await oProducto.updateProduct(product);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.delete("/:pid", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let idProd = req.params["pid"];
      response = await oProducto.deleteProduct(idProd);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

module.exports = router;
