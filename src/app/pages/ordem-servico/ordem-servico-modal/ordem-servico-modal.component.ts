import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrdemServico } from '../OrdemServico';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
    selector: 'app-ordem-servico-modal',
    templateUrl: './ordem-servico-modal.component.html',
    styleUrls: ['./ordem-servico-modal.component.scss'],
    providers: [AngularFireDatabase, SharedService]
})
export class OrdemServicoModalComponent implements OnInit {
    @ViewChild('createModal') createModal: ModalDirective;
    public ordemServico: OrdemServico = new OrdemServico;
    public isEditing = false;
    public churches;
    public allStatus;
    public roleUser;
    public tecnicos;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService, public shared: SharedService) { }

    ngOnInit() {
        this.roleUser = this.shared.getUserRole();
        this.getChurches();
        this.getStatus();
        this.getTecnicos();
    }

    showModal(e?) {
        if (e) {
            this.ordemServico = e;
            this.isEditing = true;
        } else {
            this.ordemServico = new OrdemServico;
            this.isEditing = false;
            const x = new Date();
            this.ordemServico.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
            this.ordemServico.dataCadastro = `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
            this.ordemServico.numeroOS = this.ordemServico.id;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        let ccbinfo = this.churches.filter(id => id.id === form.value.ccb);
        let t1 = this.tecnicos.filter(id => id.id === form.value.tecnico1);
        let t2 = this.tecnicos.filter(id => id.id === form.value.tecnico2);

        ccbinfo = ccbinfo[0];
        t1 = {'nome': t1[0].nome, 'celular': t1[0].celular ? t1[0].celular : ''};
        t2 = {'nome': t2[0].nome, 'celular': t2[0].celular ? t2[0].celular : ''};

        this.ordemServico['ccbinfo'] = (ccbinfo);
        this.ordemServico['tecnico1Info'] = t1;
        this.ordemServico['tecnico2Info'] = t2;


        this.angularFire.list(`ordemServico/`).set(`${this.ordemServico.id}`, this.ordemServico)
            .then((t: any) => {
                this.createModal.hide();
                this.ordemServico = new OrdemServico;
                this.toastr.success('Status salvo com sucesso!', 'Sucesso!');
            })
            .catch((error) => {
                this.toastr.error('Ocorreu um erro ao adicionar o ordemServico!', 'Erro!');
                console.log(`Error: ${error}`);
            });
    }

    private getChurches() {
        this.angularFire.list(`igrejas`).valueChanges().subscribe(
            data => this.churches = data
        );
    }

    private getStatus() {
        this.angularFire.list(`status`).valueChanges().subscribe(
            data => this.allStatus = data
        );
    }

    private getTecnicos() {
        this.angularFire.list(`tecnicos`).valueChanges().subscribe(
            data => this.tecnicos = data
        );
    }

}
