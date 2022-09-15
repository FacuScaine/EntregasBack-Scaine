import { Router } from 'express';
import faker from 'faker';

faker.locale = 'es';

const {commerce} = faker;
const router = Router();

router.get('/test', async(req,res)=>{
    let testProducts = [];
    for (let i = 0; i < 5; i++) {
        testProducts.push({
            Nombre:commerce.productName(),
            Precio:commerce.price(),
            Descripcion:commerce.productDescription()
        })
    }
    res.send(testProducts)
})

export default router