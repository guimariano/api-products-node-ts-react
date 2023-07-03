import * as create from '@server/controllers/rating/create';
import * as getAll from '@server/controllers/rating/getAll';
import * as deleteById from '@server/controllers/rating/deleteById';
import * as getById from '@server/controllers/rating/getById';
import * as updateById from '@server/controllers/rating/updateById';


export const RatingController = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
};
