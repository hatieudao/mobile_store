
const productService = require('../../services/admin/admin.product.service');
const brandService = require('../../services/admin/admin.brand.service');
const configurationService = require('../../services/admin/admin.configuration.service');
const optionService = require('../../services/admin/admin.option.service');
const pictureService = require('../../services/admin/admin.picture.service');
const {stack} = require("sequelize/dist/lib/utils");

exports.productList = async (req, res) => {
    const { page, limit } = req.query;
    const productName = req.query.productName;
    const brandName = req.query.brandName;


    console.log('limit = ',limit);


    //filter
    //Lấy các giá trị filter
    const filter = {
        productName: productName,
        brandName: brandName
    }

    //pagination
    //Lấy url gốc -> cắt chuỗi "page=" ra (nếu có)
    const oriUrl = req.originalUrl;
    const splitIndex = oriUrl.lastIndexOf("page=");
    const url = splitIndex > -1 ? oriUrl.slice(0,splitIndex-1) : oriUrl;

    //Kiểm tra xem trên có các query khác hay koS
    const selectPage = url.lastIndexOf('?') > -1 ? '&page=' : '?page';




    //Lấy products
    const dataService = await productService.productList(page || 1,limit || 10, filter);

    //products
    const products = dataService.rows;
    //Số lượng các products
    const countProduct = dataService.count;


    const curPage = parseInt(page) || 1;
    const curLimit = parseInt(limit) || 10;

    //Số lượng page = ceil của (tổng sản phảm / số lượng sản phẩm trên 1 trang)
    const countPage = Math.ceil(countProduct/curLimit);
    const pagination = {
        curPage: curPage,
        prevPageLink: curPage > 1 ? url + selectPage + (curPage - 1) : url + selectPage + curPage,
        nextPageLink: curPage < countPage ? url + selectPage + (curPage + 1) : url + selectPage + curPage,
        limit: parseInt(limit) || 10
    }

    res.render('admin/product/productList', { title: 'Product List', layout: 'admin/layout.hbs', products, pagination, filter});
}


exports.deleteProduct = async (req, res) => {
    console.log('Detete Form');
    const id = parseInt(req.params.id);
    console.log('id = ', id);

    await productService.deleteProduct(id);

    res.redirect('/admin/product');
}


exports.addProductPage = (req, res) => {
    res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs' });
}


exports.addProduct = async (req, res) => {
    const { fullName, price, rating, brandName } = req.query;
    const addNewProduct = await productService.addProduct(fullName, price, rating, brandName);
    console.log(addNewProduct);
    const id = addNewProduct.id;
    res.redirect('/admin/product/'+ id);
}

exports.productItem = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id = ', id);

    //Tìm kiếm products theo ID
    const data = await productService.findProductInforById(id);
    const product = data[0];

    //Tìm kiếm  configurations, options, pictures dựa trên product
    const configurations = await configurationService.getConfigurationsInforByProductId(id);
    const options = await optionService.getOptionsInforByProductId(id);
    const pictures = await pictureService.getPicturesInforByProductId(id);

    res.render('admin/product/productItem', { title: 'Product', layout: 'admin/layout.hbs', product, configurations, options, pictures });
}

exports.updateProduct = async (req, res) => {

    const id = parseInt(req.params.id);
    const { fullName, price, rating, brandName } = req.query;

    await productService.updateProduct(id, fullName, price, rating, brandName);

    const data = await productService.findProductInforById(id);
    const product = data[0];

    res.render('admin/product/productItem', { title: 'Product', layout: 'admin/layout.hbs', product });
}

exports.addConfigurationPage = async (req, res) => {
    const producId = parseInt(req.params.id);


    res.render('admin/product/productAddConfiguration', { title: 'Product', layout: 'admin/layout.hbs', producId });
}

exports.addConfiguration = async (req, res) => {
    const producId = parseInt(req.params.id);
    console.log('id = ', producId);
    //
    const { value, specificationName} = req.query;
    console.log('specificationName: ',value);
    console.log('specificationName: ',specificationName);

    const addNewConfiguraion = await configurationService.addConfiguration(producId,value,specificationName);

    res.render('admin/product/productAddConfiguration', { title: 'Product', layout: 'admin/layout.hbs',value, specificationName, producId });
}

exports.addOptionPage = async (req, res) => {
    const producId = parseInt(req.params.id);

    res.render('admin/product/productAddOption', { title: 'Product', layout: 'admin/layout.hbs', producId });
}

exports.addOption = async (req, res) => {
    const producId = parseInt(req.params.id);
    //
    const { name, price, capacityName} = req.query;

    const addNewOption = await optionService.addOption(producId, name, price, capacityName);

    res.render('admin/product/productAddOption', { title: 'Product', layout: 'admin/layout.hbs', producId });
}


exports.addPicturePage = async (req, res) => {
    const producId = parseInt(req.params.id);
    console.log('id = ', producId);

    res.render('admin/product/productAddPicture', { title: 'Product', layout: 'admin/layout.hbs', producId });
}

exports.addPicture = async (req, res) => {
    const producId = parseInt(req.params.id);
    console.log('id = ', producId);

    const {link} = req.query;

    const addNewPicture = await pictureService.addPicture(producId, link);

    res.render('admin/product/productAddPicture', { title: 'Product', layout: 'admin/layout.hbs', producId });
}
