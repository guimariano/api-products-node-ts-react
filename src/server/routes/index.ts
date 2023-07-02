import { Router } from 'express';
import { ProdutoRateController, ProdutosController } from '@server/controllers';

const router = Router();

router.get('/', (a_, res) => res.send('Home sweet home.'));
router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:produtoId', ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:produtoId', ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:produtoId', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

router.post('/produto-rate', ProdutoRateController.createValidation, ProdutoRateController.create);
router.get('/produto-rate', ProdutoRateController.getAllValidation, ProdutoRateController.getAll);
router.get('/produto-rate/:produtoId', ProdutoRateController.getByIdValidation, ProdutoRateController.getById);
router.put('/produto-rate/:produtoId', ProdutoRateController.updateByIdValidation, ProdutoRateController.updateById);
router.delete('/produto-rate/:produtoId', ProdutoRateController.deleteByIdValidation, ProdutoRateController.deleteById);

export {
  router,
};


