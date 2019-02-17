import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ModalTecnicoComponent } from './modal-tecnico/modal-tecnico.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-tecnico',
    templateUrl: './tecnico.component.html',
    styleUrls: ['./tecnico.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth]
})
export class TecnicoComponent implements OnInit {

    @ViewChild(ModalTecnicoComponent) modalComponent: ModalTecnicoComponent;
    @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent;
    public tecnicos;
    public isLoaded = true;
    public filter = '';
    public page = 1;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.getTecnicos();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, e.nome, 'tecnicos');
    }

    getTecnicos() {
        this.isLoaded = false;
        this.angularFire.list(`tecnicos`).valueChanges().subscribe(
            data => {
                this.tecnicos = data;
                this.isLoaded = true;
            }
        );
    }

}
