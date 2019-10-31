const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();

  app.use(express.json());
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json({data:storeProducts,message:'products listed'});
  });

  router.post('/products', async(req, res, next )=>{
    const {body:product} = req;
    try {
  
      const productCreatedId = await productService.createProduct({product});
      res.status(201).json({
        data:productCreatedId,
        message: 'producto recived'
      });  
    } catch (error) {
      next(error);
    }
  });

  router.put('/products/:productId',async(req,res,next)=>{
        const {productId} = req.params;
        const {body:product} = req;
        try {
          const productUpdatedId = await productService.updateProduct(productId, product);
          res.status(201).json({data:productUpdatedId,
                               message:'product updated'});
        } catch (error) {
          next(error);
        }
  });

  router.delete('/products/:productId',(req, res, next)=>{
    const{productId} = req.params;

    try {
      const productDeletedId = productService.deleteProduct(productId);
      res.status(201).json({
        data:productDeletedId,
        message:'product deleted'
      });
    } catch (error) {
      next(error);
    }
  });
  

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;