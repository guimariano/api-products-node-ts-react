import * as create from '@server/database/providers/rating/create';
import * as getAll from '@server/database/providers/rating/getAll';
import * as deleteById from '@server/database/providers/rating/deleteById';
import * as getById from '@server/database/providers/rating/getById';
import * as updateById from '@server/database/providers/rating/updateById';
import * as count from '@server/database/providers/rating/count';


export const RatingProvider = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...getById,
  ...count
};
