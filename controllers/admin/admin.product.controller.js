
const productService = require('../../services/admin/admin.product.service');
const brandService = require('../../services/admin/admin.brand.service');
const configurationService = require('../../services/admin/admin.configuration.service');
const optionService = require('../../services/admin/admin.option.service');
const pictureService = require('../../services/admin/admin.picture.service');
const {stack} = require("sequelize/dist/lib/utils");
const fs = require('fs');

exports.productList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        productId: data.productId,
        productName: data.productName,
        brandId: data.brandId,
        brandName: data.brandName,
        status: ((data.status) === '0') ? undefined : data.status,
        minRating: data.minRating,
        maxRating: data.maxRating,
        minCreatedDate: data.minCreatedDate || new Date(2021, 0, 1),
        maxCreatedDate: data.maxCreatedDate || new Date(),
        // minUpdatedDate: data.minUpdatedDate || new Date(2021, 0, 1),
        // maxUpdatedDate: data.maxUpdatedDate || new Date()
    }



    const brandNames = await brandService.getAllBrandName(true);

    //Lấy products
    const allProducts = await productService.productList(page,limit, filter, true);

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

exports.restoreProduct = async (req, res) => {
    console.log('Restore Form');
    const id = parseInt(req.params.id);
    console.log('id = ', id);

    await productService.restoreProduct(id);

    res.redirect('/admin/product');
}


exports.deleteAllProduct = async (req, res) => {
    const deleteAll = req.query.deleteAll;

    if(deleteAll){
        for (let productId of deleteAll)
        {
            await productService.deleteProduct(productId);
        }
    }

    res.redirect('/admin/product');
}

exports.addProductPage = async (req, res) => {
    const brandNames = await brandService.getAllBrandName(true);
    res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs', brandNames });
}


exports.addProduct = async (req, res) => {
    const configurations = req.body.configurations;
    const options = req.body.options;
    const pictureFiles = req.files;
    // const pictures = req.query.pictures;

    const { fullName, price, rating, brandName } = req.body;
    try{
        const addNewProduct = await productService.addProduct(fullName, price, rating, brandName);
        console.log(addNewProduct);
        const producId = addNewProduct.id;

        if(configurations)
        {
            for (let configuration of configurations){
                if(configuration)
                {
                    const newConfiguration = await configurationService.addConfiguration(producId, configuration.configurationValue, configuration.specificationName);
                    console.log(newConfiguration);
                }
            };
        }

        if(options)
        {
            for (let option of options){
                if(option)
                {
                    const newOption = await optionService.addOption(producId, option.optionName, option.optionPrice, option.capacityName);
                    console.log(newOption);
                }
            };
        }


        if (pictureFiles) {
            for (let pictureFile of pictureFiles) {
                let path = pictureFile.path.replace(/\\/g, "/");
                let link = path.replace('public', "");
                const addNewPicture = await pictureService.addPicture(producId, link);
            }
        }

        res.redirect('/admin/product/'+ producId);
    }catch (e) {
        return false;
    }
}

exports.productItem = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id = ', id);

    //Tìm kiếm products theo ID
    // const data = await productService.findProductInforById(id);
    const product = await productService.findProductInforById(id, true);

    //Tìm kiếm  configurations, options, pictures dựa trên product
    const configurations = await configurationService.getConfigurationsInforByProductId(id);
    const options = await optionService.getOptionsInforByProductId(id);
    const pictures = await pictureService.getPicturesInforByProductId(id);
    const brandNames = await brandService.getAllBrandName(true);
    const isRemove = (product.status === "remove");

    res.render('admin/product/productItem', { title: 'Product', layout: 'admin/layout.hbs', product, configurations, options, pictures, brandNames, isRemove });
}

exports.updateProduct = async (req, res) => {

    const id = parseInt(req.params.id);
    const {fullName, price, rating, brandName} = req.body;

    const deleteOptions = req.body.deleteOptions;
    const deleteConfigurations = req.body.deleteConfigurations;
    const deletePictures = req.body.deletePictures;
    const deletePictureLinkInput = req.body.deletePictureLinks;

    await productService.updateProduct(id, fullName, price, rating, brandName);

    const configurations = req.body.configurations;
    const options = req.body.options;
    const pictureFiles = req.files;

    if (configurations) {
        for (let configuration of configurations) {
            if(configuration){
                const newConfiguration = await configurationService.addConfiguration(id, configuration.configurationValue, configuration.specificationName);
                console.log(newConfiguration);
            }
        }
        ;
    }
    if (options) {
        for (let option of options) {
            if(option){
                const newOption = await optionService.addOption(id, option.optionName, option.optionPrice, option.capacityName);
                console.log(newOption);
            }
        }
        ;
    }
    if (pictureFiles) {
        for (let pictureFile of pictureFiles) {
            let path = pictureFile.path.replace(/\\/g, "/");
            let link = path.replace('public', "");
            const addNewPicture = await pictureService.addPicture(id, link);
        }
    }


    if (deleteConfigurations) {


        await configurationService.deleteConfigurationByIds(deleteConfigurations);
    }

    if (deleteOptions) {
        await optionService.deleteOptionByIds(deleteOptions);
    }

    if (deletePictures) {

        if (deletePictureLinkInput) {
            await removePicturePaths(deletePictureLinkInput);
        }

        await pictureService.deletePictureByIds(deletePictures);
    }

    res.redirect('/admin/product/' + id);
}

removePicturePaths = async function (deletePictureLinkInput){
    for (let link of deletePictureLinkInput) {
        console.log("deletePictureLinkInput: ", link);
        try {
            fs.unlinkSync("./public" + link);
        } catch (e) {
            return false;
        }

    }
}
