
const productService = require('../../services/admin/admin.product.service');

exports.productList = async (req, res) => {
    const { page, limit } = req.query;
    // const products = await productService.productList(page,limit || 10);
    const products = await productService.productList(page || 1,limit || 10);
    res.render('admin/product/productList', { title: 'Product List', layout: 'admin/layout.hbs', products });
}