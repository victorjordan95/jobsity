import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [SharedService, AngularFireAuth],
    animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                opacity: '0'
            })),
            state('active', style({
                height: '*',
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ],
})
export class HeaderComponent implements OnInit {

    constructor(private sharedService: SharedService, private afAuth: AngularFireAuth, private router: Router) {
    }

    ngOnInit() {
    }

    closeMenu() {
    }

    logout() {
    }
}
