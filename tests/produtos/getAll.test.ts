import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/* eslint-disable no-undef */
describe('getAll de produtos', () => {
  it('should getAll produtos', async () => {
    const respostaCreated = await testServer
      .post('/produtos')
      .send({
        nome: 'Produto 1',
        fabricante: 'Fabricante 1',
        preco: 5000.00,
      });

    expect(respostaCreated.statusCode).toEqual(StatusCodes.CREATED);

    const respostaGetAll = await testServer
      .get('/produtos');

    expect(Number(respostaGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(respostaGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(respostaGetAll.body.length).toBeGreaterThan(0);
  });
});

