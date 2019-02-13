import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from './data';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public data = new Data;

    constructor(private angularFire: AngularFireDatabase, public db: AngularFirestore, private toastr: ToastrService) { }

    ngOnInit() {
    }

    showModal(id, name, route) {
        this.data.id = id;
        this.data.nome = name;
        this.data.route = route;
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    remove() {
        this.angularFire.list(`${this.data.route}`).remove(`${this.data.id}`).then(
            res => {
                this.createModal.hide();
                this.toastr.success(`Removido com sucesso!`, 'Sucesso!');
            },
            err => {
                this.toastr.error(`Ocorreu um erro ao remover ${this.data.route}!`, 'Erro!');
                console.log(err);
            }
        );
    }
}
