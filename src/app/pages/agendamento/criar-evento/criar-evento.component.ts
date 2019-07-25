import { ToastrService } from 'ngx-toastr';
import { Agendamento } from './../agendamento';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { EventEmitter } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
    selector: 'app-criar-evento',
    templateUrl: './criar-evento.component.html',
    styleUrls: ['./criar-evento.component.scss'],
    providers: [CrudService]
})
export class CriarEventoComponent implements OnInit {
    @ViewChild('createModal') createModal: ModalDirective;
    @Output() modalAgendamento = new EventEmitter();
    @Input() events;

    public isNew: boolean;
    public weather: string[];

    isCollapsed = true;

    public humidity: number;
    public pressure: number;
    public temp: number;
    public temp_max: number;
    public temp_min: number;

    public subscription: Subscription;

    public allDayAgendamento = false;
    public agendamento = new Agendamento;

    private canSave = true;
    public isViewMode = false;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService, private crudService: CrudService) {
    }

    ngOnInit() {
    }

    showModal(event?): void {
        if (event) {
            this.agendamento = event[0];
            event[0].end === undefined ? this.agendamento.end = event.start : this.agendamento.end = event[0].end;
            this.isViewMode = true;
            this.getWeather(event[0].city, new Date(event[0]).getTime());
        } else {
            this.isViewMode = false;
            this.agendamento = new Agendamento;
            this.agendamento.allDay = true;
            this.agendamento.repeatEvent = false;
            const x = new Date();
            this.agendamento.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        if (this.agendamento.dow) {
            const date = new Date();
            this.agendamento.start = `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${this.agendamento.start}`;
            this.agendamento.end = `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${this.agendamento.end}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.isCollapsed = true;
        this.weather = [];
        this.createModal.hide();
    }


    onSubmit(form: NgForm) {
        form.value.allDay = false;
        this.agendamento.allDay = false;

        form.value.repeatEvent = this.agendamento.repeatEvent;
        form.value.start = `${this.agendamento.startDate}T${this.agendamento.startHour}`;
        form.value.endDate ? form.value.end = `${this.agendamento.endDate}T${this.agendamento.endHour}` : form.value.end = null;

        if (this.agendamento.allDay) {
            form.value.endHour = '23:59';
            form.value.endDate = form.value.startDate;
            form.value.end = `${this.agendamento.startDate}T${form.value.endHour}`;
        }

        if (this.agendamento.repeatEvent) {
            form.value.start = this.agendamento.startHour;
            form.value.end = this.agendamento.endHour;
        }

        this._checkDateAndSave(form.value);
    }

    _checkDateAndSave(event) {
        // this.canSave = true;
        const currentDay = this.events.filter(el => el.startDate === event.startDate);

        if (!currentDay.length) {
            this.canSave = true;
        } else {
            currentDay.forEach(el => {
                if ((event.startHour >= el.startHour && event.endHour >= el.startHour) && (event.startHour >= el.endHour) ||
                    (event.startHour <= el.startHour && event.endHour <= el.startHour) && (event.startHour <= el.endHour)) {
                    return;
                } else {
                    this.canSave = false;
                }
            });
        }

        if (this.canSave || !this.isViewMode) {
            this.angularFire.list(`agendamentos`).set(`${this.agendamento.id}`, event).then((t: any) => {
                this.modalAgendamento.emit(event);
                this.createModal.hide();
                this.allDayAgendamento = false;
            });
        } else {
            this.toastr.error(`Ops! Aparentemente já existe um evento neste horário!`, 'Conflito de Horário!');
        }

    }

    enableEdit() {
        this.isViewMode = false;
    }

    getWeather(city: string, time: number) {
        this.subscription = this.crudService.getWeather(city, time).subscribe(
            (data: any) => {
                this.humidity = data.main.humidity;
                this.pressure = data.main.pressure;
                this.temp = data.main.temp;
                this.temp_max = data.main.temp_max;
                this.temp_min = data.main.temp_min;
                this.weather = data;
            },
            err => console.log(err)
        )
    }

}
