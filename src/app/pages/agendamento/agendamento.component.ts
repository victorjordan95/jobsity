import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';

@Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class AgendamentoComponent implements OnInit {
    @ViewChild(CriarEventoComponent) modalComponent: CriarEventoComponent;

    public calendarIsLoaded = true;
    public userId;
    public rooms;
    public selectedRoom;
    public readNews: string;

    public user: String;
    public calendarOptions: any = {
        height: 'parent',
        fixedWeekCount: false,
        allDayDefault: true,
        defaultDate: new Date(),
        defaultView: window.innerWidth > 768 ? 'month' : 'list',
        editable: true,
        eventLimit: true,
        displayEventTime: true,
        events: [],
        eventClick: (event, jsEvent, view) => {
            const clickedEvent = this.calendarOptions.events.filter(element => element.id === event.id);
            this.showModal(clickedEvent);
        },
        dayClick: function (date, jsEvent, view) {
            alert('Clicked on: ' + date.format());
        },
        timeFormat: 'HH:mm',
        eventOverlap: false,
        allDaySlot: true
    };

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
        if (window.innerWidth > 768) {
            this.calendarOptions.header = {
                left: 'prev,next today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay, list'
            };
            this.calendarOptions.buttonText = {
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                list: 'List'
            };
        } else {
            this.calendarOptions.header = {
                left: 'prev,next today',
                center: 'title',
                right: 'listMonth, listWeek, list'
            };
            this.calendarOptions.buttonText = {
                today: 'Today',
                listMonth: 'Month',
                listWeek: 'Week',
                list: 'Day',
            };
        }
    }

    ngOnInit() {
        this.getEvents();
    }

    showModal(event?) {
        this.modalComponent.showModal(event);
    }

    getEvents() {
        this.calendarIsLoaded = false;
        this.angularFire.list(`agendamentos`).valueChanges().subscribe(
            events => {
                let teste = [];
                teste = events;
                this.calendarOptions.events = teste;
                this.calendarIsLoaded = true;
            }
        );
    }

    updateSchedules(e) {
        this.toastr.success(`Evento "${e.title}" foi cadastrado com sucesso `, 'Sucesso!');
        this.getEvents();
    }

}
