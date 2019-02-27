import { DeleteModalComponent } from './../../shared/components/delete-modal/delete-modal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemServicoModalComponent } from './ordem-servico-modal/ordem-servico-modal.component';
import { OrdemServicoModalViewComponent } from './ordem-servico-modal-view/ordem-servico-modal-view.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
    selector: 'app-ordem-servico',
    templateUrl: './ordem-servico.component.html',
    styleUrls: ['./ordem-servico.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth, SharedService]
})
export class OrdemServicoComponent implements OnInit {

    @ViewChild(OrdemServicoModalComponent) modalComponent: OrdemServicoModalComponent;
    @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent;
    @ViewChild(OrdemServicoModalViewComponent) viewModal: OrdemServicoModalViewComponent;
    public orders = [];
    public isLoaded = true;
    public filter = '';
    public page = 1;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, public shared: SharedService) {
    }

    ngOnInit() {
        this.getOrdemServico();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    viewModalOS(e) {
        this.viewModal.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, `${e.numeroOS} da igreja ${e.ccb.bairro}`, 'Ordem de Serviço');
    }

    getOrdemServico() {
        this.isLoaded = false;
        this.angularFire.list(`ordemServico`).valueChanges().subscribe(
            (data: any) => {
                const user = atob(localStorage.getItem('usuario')).split(',');
                if (user[3] === 'ADMIN') {
                    this.orders = data;
                } else {
                    data.forEach(ordem => {
                        if ((ordem.tecnico1Info || ordem.tecnico2Info) && ( ordem.tecnico1Info.nome === user[2] || ordem.tecnico2Info.nome === user[2])) {
                            this.orders.push(ordem);
                        }
                    });
                }
                this.orders.forEach(element => element['ccbName'] = element.ccbinfo['bairro'] );
                this.isLoaded = true;
            }
        );
    }
}
