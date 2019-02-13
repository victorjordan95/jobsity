import { Tecnico } from './../tecnico/tecnico';
import { Igreja } from '../igrejas/igreja';

export class OrdemServico {
    id: any;
    numeroOS: number;
    ccb: Igreja;
    motivo: String;
    solucao: String;
    tecnico1: Tecnico;
    tecnico2: Tecnico;
    status: String;
    dataCadastro: any;
    dataAtendimento: any;
    observacoes: String;
}
