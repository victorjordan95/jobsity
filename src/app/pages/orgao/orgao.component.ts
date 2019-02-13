import { DeleteModalComponent } from './../../shared/components/delete-modal/delete-modal.component';
import { ModalOrgaoComponent } from './modal-orgao/modal-orgao.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-orgao',
    templateUrl: './orgao.component.html',
    styleUrls: ['./orgao.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth]
})
export class OrgaoComponent implements OnInit {

    @ViewChild(ModalOrgaoComponent) modalComponent: ModalOrgaoComponent;
    @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent;
    public orgaos;
    public isLoaded = true;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.getOrgaos();
            }
        });
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, e.marca, 'orgaos');
    }

    getOrgaos() {
        this.isLoaded = false;
        this.angularFire.list(`orgaos`).valueChanges().subscribe(
            data => {
                this.orgaos = data;
                this.isLoaded = true;
            }
        );
    }

}
