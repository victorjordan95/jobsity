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

    public layerGroup: any;
    public igrejas: [Igreja];
    public isLoaded = true;
    public map: any;
    private defaultIcon: Icon = icon({
        iconUrl: './../../../assets/leaflet/images/marker-icon.png',
        shadowUrl: './../../../assets/leaflet/images/marker-shadow.png'
    });
    private redIcon: Icon = icon({
        iconUrl: './../../../assets/leaflet/images/marker-icon-red.png',
        shadowUrl: './../../../assets/leaflet/images/marker-shadow.png'
    });
    private greenIcon: Icon = icon({
        iconUrl: './../../../assets/leaflet/images/marker-icon-green.png',
        shadowUrl: './../../../assets/leaflet/images/marker-shadow.png'
    });
    selectedChurch: string[];
    userLat: number;
    userLng: number;

    constructor(private angularFire: AngularFireDatabase) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocale.bind(this));
        } else {
            console.log('Geolocation not supported');
        }
    }

    setLocale(position: any): void {
        this.map.setView([position.coords.latitude, position.coords.longitude], 15);
    }

    ngOnInit() {
        this.getIgrejas();

        this.map = L.map('map', {
            scrollWheelZoom: false,
        }).setView([this.userLng || -23.175477, this.userLat || -45.878163], 15);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    getIgrejas(): void {
        this.isLoaded = false;
        this.angularFire.list(`igrejas`).valueChanges().subscribe(
            (data: [Igreja]) => {
                this.igrejas = data;
                this.isLoaded = true;
                this.addPointsInMap(this.igrejas);
            }
        );
    }

    addPointsInMap(igrejas: [Igreja]) {
        this.layerGroup = L.layerGroup().addTo(this.map);
        this.map.setZoom(14);

        igrejas.forEach((igreja: Igreja) => {
            const popupContent = `
                <h5>${igreja.bairro}</h5>
                <span>Encarregado local de manutenção: ${igreja.tecnico}</span> <br>
                <span>Telefone Contato: ${igreja.numCel}</span>
                ${igreja.ordemServico ? `<br> OS aberta: <b>${igreja.ordemServico.osNumber}</b>` : ``}
                <br><br>
                <a href="https://maps.google.com/maps?daddr=${igreja.lat},${igreja.lng}&amp;ll=" target="_blank" style="margin-top: 16px">
                    Abrir no GPS
                </a>
            `;

            if (igreja.ordemServico !== undefined && igreja.ordemServico.status === 'Agendar') {
                Marker.prototype.options.icon = this.redIcon;
            } else if (igreja.ordemServico !== undefined && igreja.ordemServico.status === 'Agendado') {
                Marker.prototype.options.icon = this.greenIcon;
            } else {
                Marker.prototype.options.icon = this.defaultIcon;
            }

            //  igreja.ordemServico !== undefined && igreja.ordemServico.length >= 1 ? this.redIcon : this.defaultIcon;
            L.marker([igreja.lat || '', igreja.lng || ''])
            .bindPopup(popupContent)
            .openPopup()
            .addTo(this.layerGroup);
        });
    }

    onChange(church: Igreja) {
        this.map.setView([church.lat, church.lng], 13);
        this.layerGroup.clearLayers();
        this.addPointsInMap([church]);
        this.map.setView([church.lat, church.lng], 16);
    }

    onClear() {
        this.addPointsInMap(this.igrejas);
    }

}
