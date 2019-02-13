import { NgForm } from '@angular/forms';
import { EncarregadoManutencao } from './../encarregado-manutencao';
import { ModalDirective } from 'ngx-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-encarregado',
    templateUrl: './modal-encarregado.component.html',
    styleUrls: ['./modal-encarregado.component.scss']
})
export class ModalEncarregadoComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public encarregado = new EncarregadoManutencao;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) { }

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.encarregado = e;
        } else {
            const x = new Date();
            this.encarregado.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
                `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`encarregados/`).set(`${this.encarregado.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.encarregado = new EncarregadoManutencao;
        });
    }

}
