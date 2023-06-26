import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/* eslint-disable no-undef */
describe('get product by id', () => {
  it('should get product da does not exist by id', async () => {
    const respostaGet = await testServer
      .get('/produtos/99999')
      .send();

    expect(respostaGet.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(respostaGet.body).toHaveProperty('errors.default');
  });
  it('should get product', async () => {
    const respostaCreated = await testServer
      .post('/produtos')
      .send({
        nome: 'Produto 1',
        fabricante: 'Fabricante 1',
        preco: 5000.00,
        createdOn: new Date(),
      });

    expect(respostaCreated.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof respostaCreated.body).toEqual('number');

    const respostaGet = await testServer
      .get(`/produtos/${respostaCreated.body}`)
      .send();

    expect(respostaGet.statusCode).toEqual(StatusCodes.OK);
    expect(respostaGet.body).toHaveProperty('nome');
  });
});

