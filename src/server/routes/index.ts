import { Router } from 'express';
import { ProdutosController } from '@server/controllers';

const router = Router();

router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);

router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);

router.get('/produtos/:id', ProdutosController.getByIdValidation, ProdutosController.getById);

router.delete('/produtos/:id', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

router.put('/produtos/:id', ProdutosController.updateByIdValidation, ProdutosController.updateById);

export {
  router,
};


