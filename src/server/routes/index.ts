import { Router } from 'express';
import { ProdutosController } from '@server/controllers';

const router = Router();

router.get('/', (a_, res) => res.send('Home sweet home.'));
router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:id', ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:id', ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:id', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

export {
  router,
};


