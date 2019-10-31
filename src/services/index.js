//const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');

class ProductService {

  constructor()
  {
    this.collection = 'product_collection';
    this.mongoDb = new MongoConnect();
  }

  async getProducts() {
    //const products = await Promise.resolve(productsMock);
    const products = await this.mongoDb.getAll(this.collection,'');

    return products || [];
  }

  async createProduct({product})
  {
    const productId = await this.mongoDb.create(this.collection,product);

    return productId;
  }

  async updateProduct({product}, id)
  {
    const productId = await this.mongoDb.update(this.collection, id, product);
    return productId;
  }

  async deleteProduct(id)
  {
    const productId = await this.mongoDb.delete(this.collection, id);

    return productId;
  }

}

module.exports = ProductService;
