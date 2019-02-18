import { Tecnico } from '../tecnico/tecnico';

export class Igreja {
    id: any;
    codCCB: any;
    nomeIgreja: String;
    rua: String;
    numero: number;
    bairro: String;
    cep: number;
    cidade: String;
    uf: any;
    tecnico: String = '';
    numCel:  number = null;
    marca: String = '';
    modelo: String = '';
    numeroOrgao: any = '';
    numeroPatrimonio: any = '';
    acessorio?: any = '';
    numeroSerieAcessorio?: any = '';
}
