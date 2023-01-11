let { Router } = require("express");
const router = Router();

let cartManager = require("../services/cartManager");
let estructMensaje = require("../utils/estructMensaje");
let oCart = new cartManager();

router.post("/", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      response = await oCart.createCart();
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };

  main();
});

router.post("/:cid/product/:pid/:quantity", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let cid = req.params["cid"];
      let pid = req.params["pid"];
      let quantity = new Number(req.params["quantity"]);
      response = await oCart.addProductCart(cid, pid, quantity);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.get("/", (req, res) => {
  let response = new estructMensaje().response;
  const main = async () => {
    try {
      response = await oCart.getAllCart(true);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.get("/:cid", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let cid = req.params["cid"];
      response = await oCart.getCartbyId(cid);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.delete("/:cid", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let cid = req.params["cid"];
      response = await oCart.deleteCartbyId(cid);
      res.json(response);
    } catch (error) {
      response.status = "E";
      response.mensaje = error.message;
      res.json(response);
    }
  };
  main();
});

router.delete("/:cid/product/:pid", (req, res) => {
  let response = new estructMensaje().response;

  const main = async () => {
    try {
      let cid = req.params["cid"];
      let pid = req.params["pid"];
      response = await oCart.deleteProductFromCart(cid, pid);
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
