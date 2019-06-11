import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CrudService } from '../../shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../usuarios/Usuario';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    providers: [AngularFireDatabase, CrudService]
})
export class EmailComponent implements OnInit {
    public usuarios: any;
    public isLoaded: boolean;
    public selectedUsers: string[];
    public subscription: Subscription;

    public email: string;
    public recipient: string[];
    public subject: string;
    public text: string;

    constructor(private angularFire: AngularFireDatabase, private _crudService: CrudService, private toastr: ToastrService) { }

    ngOnInit() {
        this.getUsuarios();
        this.email = atob(localStorage.getItem('usuario')).split(',')[0];
    }

    getUsuarios() {
        this.isLoaded = false;
        this.angularFire.list(`usuarios`).valueChanges().subscribe(
            (data: any) => {
                data = [
                    {'email': 'USER', 'id': 'USER'},
                    {'email': 'MINISTERIO', 'id': 'MINISTERIO'},
                    {'email': 'ADMIN', 'id': 'ADMIN'},
                    ...data
                ];
                this.usuarios = data;
                this.isLoaded = true;
            }
        );
    }

    onSubmit(form: NgForm) {
        this.isLoaded = false;

        if (form.value.recipient[0] === 'USER' || form.value.recipient[1] === 'USER' || form.value.recipient[2] === 'USER') {
            this.usuarios.filter((user: Usuario) => {
                if (user.role === 'USER') {
                    form.value.recipient = [...form.value.recipient, user.email];
                }
            });
        }
        if (form.value.recipient[0] === 'MINISTERIO' ||
            form.value.recipient[1] === 'MINISTERIO' ||
            form.value.recipient[2] === 'MINISTERIO') {
            this.usuarios.filter((user: Usuario) => {
                if (user.role === 'MINISTERIO') {
                    form.value.recipient = [...form.value.recipient, user.email];
                }
            });
        }
        if (form.value.recipient[0] === 'ADMIN' || form.value.recipient[1] === 'ADMIN' || form.value.recipient[2] === 'ADMIN') {
            this.usuarios.filter((user: Usuario) => {
                if (user.role === 'ADMIN') {
                    form.value.recipient = [...form.value.recipient, user.email];
                }
            });
        }
        form.value.recipient = form.value.recipient.filter(email => {
            if (email !== 'ADMIN' && email !== 'MINISTERIO' && email !== 'USER') {
                return email;
            }
        });

        this.subscription = this._crudService.saveOption(form.value, 'send').subscribe(
            () => {
                this.isLoaded = true;
                this.toastr.success(`E-mail enviado com sucesso`, 'Enviado');
                this.subject = '';
                this.recipient = [];
                this.text = '';
            },
            err => {
                this.toastr.error(`${err.message}`, 'Error!');
                this.isLoaded = true;
                console.log(err);
            });

    }

}
