const { models } = require('../../models');

exports.findBrandByName = (name) => models.brands.findOne({
        where: ({ name: name })
    })

exports.createBrand =  (name) =>  {
    const brand = models.brands.create({name: name});
    return brand;
}

exports.getBrandByName = async (name) => {
    const brand = await this.findBrandByName(name);
    if (!brand){
        const newBrand = await this.createBrand(name);
        console.log('newBrand',newBrand);
        console.log('newBrand.id',newBrand.id);
        console.log('newBrand.name',newBrand.name);
        return newBrand;
    }
    return brand;
}
