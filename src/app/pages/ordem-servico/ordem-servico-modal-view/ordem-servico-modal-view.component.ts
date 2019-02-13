import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ordem-servico-modal-view',
  templateUrl: './ordem-servico-modal-view.component.html',
  styleUrls: ['./ordem-servico-modal-view.component.scss']
})
export class OrdemServicoModalViewComponent implements OnInit {
  @ViewChild('createModal') createModal: ModalDirective;
  public OS;
  constructor() { }

  ngOnInit() {
  }

  showModal(e?) {
    this.OS = e;
    this.createModal.show();
  }

  print() {
    window.print();
  }

  dismissModal() {
    this.createModal.hide();
  }

}
