const mobileService = require('../services/mobileService')
const configurationService = require('../services/configurationService')
const specificationService = require('../services/specificationService')
const optionService = require('../services/optionService')
const capacityService = require('../services/capacityService')
const commentService = require('../services/commentService')
const brandService = require('../services/brandService')
const { models } = require('../config/database')
const pictureService = require('../services/pictureService')
const paginateHelper = require('express-handlebars-paginate');

exports.list = async (req, res) => {
  const mobiles = await mobileService.list()
  res.json(mobiles)
}

exports.listMobilePage = async (req, res) => {
  if ((req.query.page == null) || isNaN(req.query.page)){
    req.query.page = 1;
  }
  if ((req.query.limit == null) || isNaN(req.query.limit)){
    req.query.limit = 12;
  }
  if ((req.query.brandId == null) || isNaN(req.query.brandId)){
    req.query.brandId = 0;
  }
  if ((req.query.price == null) || isNaN(req.query.price)){
    req.query.price = 0;
  }
  if ((req.query.sort == null) || isNaN(req.query.sort)){
    req.query.sort = 0;
  }

  const {page, limit, brandId, price, sort, search} = req.query;

  const filter = {
    brandId: brandId,
    price: price,
    sort: sort,
    search: search
  }

  const oriUrl = req.originalUrl;
  const splitIndex = oriUrl.lastIndexOf("page=");
  const url1 = splitIndex > -1 ? oriUrl.slice(0,splitIndex-1) : oriUrl;
  const url2 = splitIndex > -1 ? oriUrl.slice(splitIndex + 6, oriUrl.length) : '';
  const selectPage = url1.lastIndexOf('page') > -1 ? '&page=' : '?page=';

  const mobiles = await mobileService.getListMobileAPage(page || 1, limit || 12, filter);
  const brands = await brandService.list();

  const countMobile = await mobileService.countMobiles(page || 1, limit || 12, filter);


  const countMobileValue = countMobile.count;
  const curPage = parseInt(page) || 1;
  const curLimit = parseInt(limit) || 12

  const countPage = Math.ceil(countMobileValue/curLimit);

  const pagination = {
    curPage: curPage,
    prevPageLink: curPage > 1 ? url1 + selectPage + (curPage - 1) + url2 : url1 + selectPage + curPage + url2,
    nextPageLink: curPage < countPage ? url1 + selectPage + (curPage + 1)  + url2 : url1 + selectPage + curPage + url2,
    limit: parseInt(limit) || 12
  }

  res.locals.mobiles = mobiles.rows;
  res.locals.brands = brands;
  res.locals.pagination = pagination;
  res.render('product/index');
}

exports.detailMobile = async (req, res) => {
  const { id } = req.params;
  const mobile_id = parseInt(id) || 1;
  const mobile = (await mobileService.getMobileById(mobile_id))[0]
  const { configurations } = mobile
  const details = []
  for (const [pos, configuration] of Object.entries(configurations)) {
    const { specification_id, value } = configuration
    const { name } = (await specificationService.getSpecificationById(specification_id))[0]
    details.push({ name, value })
  }
  const mb = mobile.toJSON()
  mb.configurations = details
  //res.json(mb)
  const { page, limit } = req.query;
  const lastedProduct = await mobileService.getLatestProduct(page || 1, limit || 10);
  const relatedProduct = await mobileService.getMobileByBrandId( mb.brand_id,page || 1, limit || 5);
  res.render('product/productDetail', { mb, lastedProduct, relatedProduct });
}

exports.filterMobileByBrand = async (req, res) => {
  const { name } = req.params
  const { page, limit } = req.query
  const mobiles = await mobileService.getMobileByBrand(name, page, limit || 10)
  res.json(mobiles)
}
