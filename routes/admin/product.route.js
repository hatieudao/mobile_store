var express = require('express');
var router = express.Router();

const productController = require('../../controllers/admin/admin.product.controller');

router.get('/',productController.productList);
router.get('/addPage',productController.addProductPage);
router.get('/add',productController.addProduct);
router.get('/deleteAll',productController.deleteAllProduct)

router.get('/:id',productController.productItem);

router.get('/:id/update',productController.updateProduct);
router.get('/:id/delete',productController.deleteProduct);


router.get('/:id/addPicturePage',productController.addPicturePage)
router.get('/:id/addPicture',productController.addPicture)





// router.get('/:add', function (req, res, next) {
//   res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs' });
// });


module.exports = router;
