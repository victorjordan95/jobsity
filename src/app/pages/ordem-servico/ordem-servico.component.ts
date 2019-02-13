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
    public orders;
    public isLoaded = true;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, public shared: SharedService) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.getOrdemServico();
            }
        });
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    viewModalOS(e) {
        this.viewModal.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, `${e.numeroOS} da igreja ${e.ccb.bairro}`, 'ordemServico');
    }

    getOrdemServico() {
        this.isLoaded = false;
        this.angularFire.list(`ordemServico`).valueChanges().subscribe(
            data => {
                this.orders = data;
                this.isLoaded = true;
            }
        );
    }
}
