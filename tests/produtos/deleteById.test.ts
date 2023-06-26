import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/* eslint-disable no-undef */
describe('delete de produtos', () => {
  it('should delete a product that do not exists on the database', async () => {
    const resposta = await testServer
      .delete('/produtos/99999')
      .send();

    expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resposta.body).toHaveProperty('errors.default');
  });
  it('should delete a product', async () => {
    const respostaCreated = await testServer
      .post('/produtos')
      .send({
        nome: 'Produto 1',
        fabricante: 'Fabricante 1',
        preco: 5000.00,
        createdOn: new Date(),
      });

    expect(respostaCreated.statusCode).toEqual(StatusCodes.CREATED);

    const respostaDeleted = await testServer
      .delete(`/produtos/${respostaCreated.body}`)
      .send();

    expect(respostaDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});

