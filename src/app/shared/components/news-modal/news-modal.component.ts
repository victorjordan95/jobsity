import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit {

  @ViewChild('createModal') createModal: ModalDirective;
  userId: string;
  usuario: any;

  constructor(private angularFire: AngularFireDatabase, public db: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsuario();
    this.userId = atob(localStorage.getItem('usuario')).split(',')[1];
  }

  showModal() {
    this.createModal.show();
  }

  dismissModal() {
    this.createModal.hide();
  }

  close() {
    console.log(this.userId);
    console.log(this.usuario);
    this.usuario['readNews'] = true;
    console.log(this.usuario);
  //   this.createModal.hide();
  //   this.angularFire.list(`usuarios/`).set(`${this.userId}`, form.value).then((t: any) => {
  //     this.createModal.hide();
  //     this.toastr.success('Usuário editado com sucesso!', 'Sucesso!');
  // });
  }

  getUsuario() {
    this.angularFire.list(`usuarios/${this.userId}`).valueChanges().subscribe(
        data => {
          console.log(data);
            this.usuario = data;
        }
    );
}

}
