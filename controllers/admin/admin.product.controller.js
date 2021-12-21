
const productService = require('../../services/admin/admin.product.service');
const brandService = require('../../services/admin/admin.brand.service');
const configurationService = require('../../services/admin/admin.configuration.service');
const optionService = require('../../services/admin/admin.option.service');
const pictureService = require('../../services/admin/admin.picture.service');
const {stack} = require("sequelize/dist/lib/utils");

exports.productList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        productName: data.productName,
        brandName: data.brandName
    }



    const brandNames = await brandService.getAllBrandName(true);

    //Lấy products
    const allProducts = await productService.productList(page,limit, filter);

    //products
    const products = allProducts.rows;
    //Số lượng các products
    const count = allProducts.count;


    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('admin/product/productList', { title: 'Product List', layout: 'admin/layout.hbs', products, pagination, filter, brandNames});
}


exports.deleteProduct = async (req, res) => {
    console.log('Detete Form');
    const id = parseInt(req.params.id);
    console.log('id = ', id);

    await productService.deleteProduct(id);

    res.redirect('/admin/product');
}


exports.addProductPage = async (req, res) => {
    const brandNames = await brandService.getAllBrandName(true);
    res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs', brandNames });
}


exports.addProduct = async (req, res) => {
    const configurations = req.query.configurations;
    const options = req.query.options;
    const { fullName, price, rating, brandName } = req.query;
    const addNewProduct = await productService.addProduct(fullName, price, rating, brandName);
    console.log(addNewProduct);
    const producId = addNewProduct.id;


    for (let configuration of configurations){
        const newConfiguration = await configurationService.addConfiguration(producId, configuration.configurationValue, configuration.specificationName);
        console.log(newConfiguration);
    };

    for (let option of options){
        const newOption = await optionService.addOption(producId, option.optionName, option.optionPrice, option.capacityName);
        console.log(newOption);
    };

    res.redirect('/admin/product/'+ producId);
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

    const deleteOptions = req.query.deleteOptions;
    const deleteConfigurations = req.query.deleteConfigurations;

    await productService.updateProduct(id, fullName, price, rating, brandName);

    const configurations = req.query.configurations;
    const options = req.query.options;

    if(configurations)
    {
        for (let configuration of configurations){
            const newConfiguration = await configurationService.addConfiguration(id, configuration.configurationValue, configuration.specificationName);
            console.log(newConfiguration);
        };
    }
    if(options)
    {
        for (let option of options){
            const newOption = await optionService.addOption(id, option.optionName, option.optionPrice, option.capacityName);
            console.log(newOption);
        };
    }


    if(deleteConfigurations)
    {
        await configurationService.deleteConfigurationByIds(deleteConfigurations);
    }

    if(deleteOptions)
    {
        await optionService.deleteOptionByIds(deleteOptions);
    }


    res.redirect('/admin/product/'+id);

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
