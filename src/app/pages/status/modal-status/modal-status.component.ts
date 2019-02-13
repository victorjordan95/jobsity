import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from '../status';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-status',
    templateUrl: './modal-status.component.html',
    styleUrls: ['./modal-status.component.scss'],
    providers: [AngularFireDatabase]
})
export class ModalStatusComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public status = new Status;
    public isEditing = false;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) { }

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.status = e;
            this.isEditing = true;
        } else {
            this.isEditing = false;
            const x = new Date();
            this.status.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
                `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`status/`).set(`${this.status.id}`, form.value)
        .then((t: any) => {
            this.createModal.hide();
            this.status = new Status;
            this.toastr.success('Status salvo com sucesso!', 'Sucesso!');
        })
        .catch((error) => {
            this.toastr.error('Ocorreu um erro ao adicionar o status!', 'Erro!');
            console.log(`Error: ${error}`);
        });
    }

}
