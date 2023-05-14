import { Router } from 'express';
import { ProdutosController } from '@server/controllers';

const router = Router();

router.post('/create', ProdutosController.create);

export {
  router,
};


