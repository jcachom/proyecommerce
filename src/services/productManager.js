let fs = require("fs");

let estructMensaje = require("../utils/estructMensaje");

class productManager {
  constructor(path) {
    this.path = path;
  }

  #estructProduct = {
    properties: {
      code: { type: "string", minlength: 1 },
      title: { type: "string", minlength: 1 },
      description: { type: "string", minlength: 1 },
      price: { type: "number" },
      status: { type: "boolean" },
      stock: { type: "number" },
      category: { type: "string", minlength: 1 },
      thumbnail: { type: "array", minlength: 1 },
    },
    required: ["code", "title", "description", "price", "thumbnail", "stock"],
  };

  #getNewId(productos) {
    let mayor = 0;
    productos.forEach((element) => {
      if (element.id > mayor) mayor = element.id;
    });
    return mayor + 1;
  }

  async addProduct(product) {
    let response = new estructMensaje().response;

    let productos = await this.getProducts();
    let findProduct = productos.filter((X) => X.code == product.code);

    response.status = "E";
    response.mensaje = "Código se encuentra registrado";

    if (findProduct.length == 0) {
      let new_product_id = this.#getNewId(productos);
      let new_product = {
        id: new_product_id,
        ...product,
      };
      productos.push(new_product);

      let contenido = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`${this.path}`, contenido);

      response.status = "S";
      response.mensaje = "Producto adicionado/modificado.";
      response.payload = new_product;
    }

    return response;
  }

  async getProducts() {
    let productos = await fs.promises.readFile(`${this.path}`, "utf-8");
    let response = new estructMensaje().response;
    let list = JSON.parse(productos);
    return list;
  }

  async getProductById(id) {
    let productos = await this.getProducts();
    let findProduct = productos.find((X) => X.id == id);

    let response = new estructMensaje().response;
    response.status = "E";
    response.mensaje = "Not found";

    if (findProduct != undefined) {
      response.status = "S";
      response.mensaje = "Producto encontrado";
      response.payload = findProduct;
    }

    return response;
  }

  async updateProduct(product) {
    let response = new estructMensaje().response;

    response = await this.deleteProduct(product.id);
    if (response.status == "E") return response;

    let new_product = {
      ...product,
    };
    response = await this.addProduct(new_product);

    return response;
  }

  async deleteProduct(id) {
    let response = new estructMensaje().response;

    let productos = await this.getProducts();
    let find = false;
    for (const key in productos) {
      if (productos[key].id == id) {
        productos.splice(key, 1);
        find = true;
      }
    }

    response.status = "E";
    response.mensaje = "Producto no encontrado.";

    if (find) {
      let contenido = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`${this.path}`, contenido);

      response.status = "S";
      response.mensaje = "Producto eliminado";
    }

    return response;
  }

  async deleteProductAll() {
    let response = new estructMensaje().response;

    await fs.promises.writeFile(`${this.path}`, "[]");
    response.status = "S";
    response.mensaje = "Productos eliminados";
    return response;
  }
}

module.exports = productManager;
