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
  }

  showModal() {
    this.createModal.show();
  }

  dismissModal() {
    this.createModal.hide();
  }

  close() {
    const userUpdated = {
      email: this.usuario[0],
      id: this.usuario[1],
      nome: this.usuario[2],
      readNews: true,
      role: this.usuario[4]
    }
    this.createModal.hide();
    this.angularFire.list(`usuarios/`).set(`${this.userId}`, userUpdated).then((t: any) => {});
  }

  getUsuario() {
    this.userId = atob(localStorage.getItem('usuario')).split(',')[1];
    this.angularFire.list(`usuarios/${this.userId}`).valueChanges().subscribe(
        data => {
          this.usuario = data;
        }
    );
}

}
