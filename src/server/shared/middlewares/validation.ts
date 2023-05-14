/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';
import { StatusCodes } from 'http-status-codes';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([ field, schema ]) => {
    try {
      schema.validateSync(req[field as TProperty], { abortEarly: false });
    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((err) => {
        if (err.path === undefined) {
          return;
        }

        errors[err.path] = err.message;
      });
      errorsResult[field] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  }

  return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
};
