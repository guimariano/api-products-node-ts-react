import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/* eslint-disable no-undef */
describe('criação de produtos', () => {
  it('should create a new produto', async () => {
    const resposta = await testServer
      .post('/produtos')
      .send({
        nome: 'Produto 1',
        fabricante: 'Fabricante 1',
        preco: 5000.00,
        createdOn: new Date(),
      });

    expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

