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

    expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resposta.body).toEqual('number');
  });
  it('should drop error on create a new produto with short name', async () => {
    const resposta = await testServer
      .post('/produtos')
      .send({
        nome: 'Pr',
        fabricante: 'Fabricante 1',
        preco: 5000.00,
        createdOn: new Date(),
      });

    expect(resposta.body).toHaveProperty('errors.body.nome');
  });
});

