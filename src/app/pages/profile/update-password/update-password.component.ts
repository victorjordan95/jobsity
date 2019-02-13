import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
    providers: [AngularFireAuth, AngularFireDatabase, ToastrService]
})

export class UpdatePasswordComponent implements OnInit {

    public id;
    public oldPassword;
    public newPassword;
    public confirmNewPassword;
    public passIsDifferent = false;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,  private toastr: ToastrService) { }

    ngOnInit() {
        const user = atob(localStorage.getItem('usuario')).split(',');
        this.id = user[1];
    }

    passChange(e) {
        this.newPassword = e;
        this.newPassword !== this.confirmNewPassword ? this.passIsDifferent = true : this.passIsDifferent = false;
    }

    confirmPassChange(e) {
        this.confirmNewPassword = e;
        this.newPassword !== this.confirmNewPassword ? this.passIsDifferent = true : this.passIsDifferent = false;
    }

    onSubmit(form: NgForm) {
        const auth = firebase.auth;
        const user = auth().currentUser;

        const newPass = form.value.newPassword;

        user.updatePassword(newPass).then((t) => {
            this.toastr.success('Senha alterada com sucesso!', 'Sucesso!');
            const credentials = firebase.auth.EmailAuthProvider.credential(user.email, newPass);
            user.reauthenticateWithCredential(credentials).then(() => console.log('reauth ok'));
        })
        .catch((error) => {
            this.toastr.error('Ocorreu um erro ao alterar a senha!', 'Erro!');
            console.log(`Error: ${error}`);
        });
    }

}
