import { MensagemView } from './../views/MensagemView';
import { Negociacao, NegociacaoParcial } from '../models/index';
export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        return fetch('http://localhost:8080/dadoxs')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível carrgar as negociações!');
            });
    }
}

export interface HandlerFunction {

    (res: Response): Response
}