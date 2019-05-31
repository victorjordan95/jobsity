import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CrudService } from '../../shared/services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    providers: [AngularFireDatabase, CrudService]
})
export class EmailComponent implements OnInit {
    public usuarios;
    public isLoaded: boolean;
    public selectedUsers: string[];
    public subscription: Subscription;

    email: string;
    recipient: string[];
    subject: string;
    text: string;

    constructor(private angularFire: AngularFireDatabase,
        private _crudService: CrudService,
        private toastr: ToastrService,
        private http: HttpClient) { }

    ngOnInit() {
        this.getUsuarios();
        this.email = atob(localStorage.getItem('usuario')).split(',')[0];
    }

    getUsuarios() {
        this.isLoaded = false;
        this.angularFire.list(`usuarios`).valueChanges().subscribe(
            data => {
                this.usuarios = data;
                this.isLoaded = true;
            }
        );
    }

    onSubmit(form: NgForm) {
        this.subscription = this._crudService.saveOption(form.value, 'send').subscribe(
            success => {
                this.toastr.success(`E-mail enviado com sucesso`, 'Enviado');
            },
            err => {
                this.toastr.error(`${err.message}`, 'Error!');
                console.log(err);
            });

    }

}
