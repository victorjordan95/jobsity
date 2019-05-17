import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Icon, icon, Marker, marker } from 'leaflet';
import { Igreja } from '../igrejas/igreja';
declare let L;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth],
})
export class MapaComponent implements OnInit {

    public igrejas;
    public isLoaded = true;
    private defaultIcon: Icon = icon({
        iconUrl: './../../../assets/leaflet/images/marker-icon.png',
        shadowUrl: './../../../assets/leaflet/images/marker-shadow.png'
    });

    map;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.getIgrejas();

        Marker.prototype.options.icon = this.defaultIcon;
        this.map = L.map('map', {
            scrollWheelZoom: false,
        }).setView([-23.175477, -45.878163], 15);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    getIgrejas() {
        this.isLoaded = false;
        this.angularFire.list(`igrejas`).valueChanges().subscribe(
            data => {
                this.igrejas = data;
                this.isLoaded = true;
                this.addPointsInMap(this.igrejas);
            }
        );
    }

    addPointsInMap(igrejas: [Igreja]) {
        igrejas.forEach(igreja => {
            const popupContent = `
                <h5>${igreja.bairro}</h5>
                <span>Encarregado local de manutenção: ${igreja.tecnico}</span> <br>
                <span>Telefone Contato: ${igreja.numCel}</span> <br>
                <a href="https://maps.google.com/maps?daddr=${igreja.lat},${igreja.lng}&amp;ll=">Abrir no GPS</a>
            `;

            L.marker([igreja.lat || '', igreja.lng || ''])
            .bindPopup(popupContent)
            .openPopup()
            .addTo(this.map);
        });
    }

}
