import { Router } from 'express';
import {
  ProdutosController,
  RatingController,
  UsuarioController
} from '@server/controllers';

const router = Router();

router.get('/', (a_, res) => res.send('Home sweet home.'));

router.post('/produtos', ProdutosController.createValidation, ProdutosController.create);
router.get('/produtos', ProdutosController.getAllValidation, ProdutosController.getAll);
router.get('/produtos/:produtoId', ProdutosController.getByIdValidation, ProdutosController.getById);
router.put('/produtos/:produtoId', ProdutosController.updateByIdValidation, ProdutosController.updateById);
router.delete('/produtos/:produtoId', ProdutosController.deleteByIdValidation, ProdutosController.deleteById);

router.post('/usuarios', UsuarioController.createValidation, UsuarioController.create);
router.get('/usuarios', UsuarioController.getAllValidation, UsuarioController.getAll);
router.get('/usuarios/:usuarioId', UsuarioController.getByIdValidation, UsuarioController.getById);
router.put('/usuarios/:usuarioId', UsuarioController.updateByIdValidation, UsuarioController.updateById);
router.delete('/usuarios/:usuarioId', UsuarioController.deleteByIdValidation, UsuarioController.deleteById);


router.post('/rating', RatingController.createValidation, RatingController.create);
router.get('/rating', RatingController.getAllValidation, RatingController.getAll);
router.get('/rating/:ratingId', RatingController.getByIdValidation, RatingController.getById);
router.put('/rating/:ratingId', RatingController.updateByIdValidation, RatingController.updateById);
router.delete('/rating/:ratingId', RatingController.deleteByIdValidation, RatingController.deleteById);

export {
  router,
};


