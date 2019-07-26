import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerComponent } from './pages/agendamento/scheduler.component';

const routes: Routes = [
  { path: '', component: SchedulerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
