
const productService = require("../../../services/admin/admin.product.service");
const specificationService = require("../../../services/admin/admin.specification.service");


exports.productList = async (req, res) => {


    // const page = undefined;
    // const limit = undefined;

    //Lấy products
    const allProducts = await productService.productList();

    //products
    const products = allProducts.rows;
    //Số lượng các products
    const count = allProducts.count;

    res.json(products);
}

exports.specificationList = async (req, res) => {


    // const page = undefined;
    // const limit = undefined;

    //Lấy products
    const allSpecifications = await specificationService.specificationList();

    //products
    const specifications = allSpecifications.rows;
    //Số lượng các products
    const count = allSpecifications.count;

    res.json(specifications);
}