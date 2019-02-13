import { DeleteModalComponent } from './../../shared/components/delete-modal/delete-modal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalEncarregadoComponent } from './modal-encarregado/modal-encarregado.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-encarregado-manutencao',
    templateUrl: './encarregado-manutencao.component.html',
    styleUrls: ['./encarregado-manutencao.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth]
})
export class EncarregadoManutencaoComponent implements OnInit {
    @ViewChild(ModalEncarregadoComponent) modalComponent: ModalEncarregadoComponent;
    @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent;
    public encarregados;
    public isLoaded = true;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.getEncarregados();
            }
        });
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, e.nome, 'encarregados');
    }

    getEncarregados() {
        this.isLoaded = false;
        this.angularFire.list(`encarregados`).valueChanges().subscribe(
            data => {
                this.encarregados = data;
                this.isLoaded = true;
            }
        );
    }
}
