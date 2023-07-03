import { Router } from 'express';
import { ProdutosController } from '@server/controllers';
import { RatingController } from '@server/controllers/rating';

const router = Router();

router.get('/', (a_, res) => res.send('Home sweet home.'));
router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:produtoId', ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:produtoId', ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:produtoId', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

router.post('/rating', RatingController.createValidation, RatingController.create);
router.get('/rating', RatingController.getAllValidation, RatingController.getAll);
router.get('/rating/:ratingId', RatingController.getByIdValidation, RatingController.getById);
router.put('/rating/:ratingId', RatingController.updateByIdValidation, RatingController.updateById);
router.delete('/rating/:ratingId', RatingController.deleteByIdValidation, RatingController.deleteById);

export {
  router,
};


