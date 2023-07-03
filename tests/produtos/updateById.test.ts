import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

/* eslint-disable no-undef */
describe('update by id', () => {
  it('should update product that does not exist by id', async () => {
    const respostaUpdated = await testServer
      .get('/produtos/99999')
      .send();

    expect(respostaUpdated.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(respostaUpdated.body).toHaveProperty('errors.default');
  });
  it('should update product', async () => {
    const respostaCreated = await testServer
      .post('/produtos')
      .send({
        nome: 'Produto 1',
        categoria: 'categoria 1',
        preco: 5000.00,
      });

    expect(respostaCreated.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof respostaCreated.body).toEqual('number');

    console.log(respostaCreated.body);

    const respostaUpdated = await testServer
      .put(`/produtos/${respostaCreated.body}`)
      .send({
        nome: 'Produto 2',
        categoria: 'categoria 2',
        preco: 5001.00,
      });

    expect(respostaUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});

