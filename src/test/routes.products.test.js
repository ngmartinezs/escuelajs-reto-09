const assert  = require('assert');
const proxyquire = require('proxyquire');

const {productsMock, ProductServicesMock} = require('../utils/mocks');
const testServer = require('../utils/testServer');

describe('routes - products',function(){
    const route = proxyquire('../routes/index',{
        '../services':ProductServicesMock
    });

    const request = testServer(route);

    describe('GET /products', function(){
        it('should respond with status 200', function(done)
        {
            request.get('/api/products').expect(200,done);
        });

        it('should respond with the list of movies',function(done){
            request.get('/api/products').end((err,res)=>{
                assert.deepEqual(res.body,{
                    data:productsMock,
                    message:'products listed'
                });
            })
            done();
        });
    });

    describe('POST /products',function(){
        it('should respond with status 201',function(done){
            request.post('/api/products').expect(201,done);
        })
    });

    describe('PUT /products',function(){
        it('should respond with status 201',function(done){
            request.put('/api/products/1545454').expect(201,done);
        })   
    });

    describe('DELETE /products',function()
    {
        it('should respond with status 201', function(done)
        {
            request.delete('/api/products/1545454').expect(201,done);
        });
    });

});