import { Tecnico } from './../tecnico/tecnico';
import { Igreja } from '../igrejas/igreja';

export class OrdemServico {
    id: any;
    numeroOS: number;
    ccb: Igreja = new Igreja;
    motivo: String = '';
    solucao?: String = '';
    tecnico1: Tecnico = new Tecnico;
    tecnico2: Tecnico = new Tecnico;
    status: String = '';
    dataCadastro: any;
    dataAtendimento?: any = '';
    observacoes?: String = '';
    horaEntrada?: any;
    horaSaida?: any;
    quilometros?: any;
    valorGas?: number;
    consumoMedio?: number;
}
