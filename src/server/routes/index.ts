import { Router } from 'express';
import { ProdutosController } from '@server/controllers';

const router = Router();

router.post('/create', ProdutosController.createValidation, ProdutosController.create);

export {
  router,
};


