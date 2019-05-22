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
  public gpsLink: string;
  constructor() { }

  ngOnInit() {
  }

  showModal(e?: any) {
    console.log(e);
    this.gpsLink = `https://maps.google.com/maps?daddr=${e.ccbinfo.lat},${e.ccbinfo.lng}&amp;ll=`;
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
