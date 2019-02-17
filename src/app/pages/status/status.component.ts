import { DeleteModalComponent } from './../../shared/components/delete-modal/delete-modal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalStatusComponent } from './modal-status/modal-status.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth]
})

export class StatusComponent implements OnInit {

    @ViewChild(ModalStatusComponent) modalComponent: ModalStatusComponent;
    @ViewChild(DeleteModalComponent) deleteModal: DeleteModalComponent;
    public allStatus;
    public isLoaded = true;
    public filter = '';
    public page = 1;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.getStatus();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    delete(e) {
        this.deleteModal.showModal(e.id, e.nome, 'status');
    }

    getStatus() {
        this.isLoaded = false;
        this.angularFire.list(`status`).valueChanges().subscribe(
            data => {
                this.allStatus = data;
                this.isLoaded = true;
            }
        );
    }

}
