import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Orgao } from './../Orgao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-orgao',
    templateUrl: './modal-orgao.component.html',
    styleUrls: ['./modal-orgao.component.scss']
})
export class ModalOrgaoComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public orgao = new Orgao;
    public isEditing = false;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) { }

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.orgao = e;
            this.isEditing = true;
        } else {
            this.isEditing = false;
            const x = new Date();
            this.orgao.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
                `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`orgaos/`).set(`${this.orgao.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.orgao = new Orgao;
        });
    }
}
