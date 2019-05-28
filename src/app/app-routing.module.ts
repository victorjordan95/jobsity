import { RoleGuardService } from './shared/services/role-guard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { IgrejasComponent } from './pages/igrejas/igrejas.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { EncarregadoManutencaoComponent } from './pages/encarregado-manutencao/encarregado-manutencao.component';
import { TecnicoComponent } from './pages/tecnico/tecnico.component';
import { OrgaoComponent } from './pages/orgao/orgao.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { StatusComponent } from './pages/status/status.component';
import { UpdatePasswordComponent } from './pages/profile/update-password/update-password.component';
import { OrdemServicoComponent } from './pages/ordem-servico/ordem-servico.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { EmailComponent } from './pages/email/email.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: AgendamentoComponent, canActivate: [RoleGuardService], data: { expectedRole: ['USER', 'ADMIN']} },
  { path: 'igreja', component: IgrejasComponent, canActivate: [RoleGuardService], data: { expectedRole: ['USER', 'ADMIN']} },
  { path: 'ordem-servico', component: OrdemServicoComponent, canActivate: [RoleGuardService], data: { expectedRole: ['USER', 'ADMIN']} },
  { path: 'alterar-senha', component: UpdatePasswordComponent, canActivate: [AuthGuardService] },
  { path: 'encarregado-manutencao', component: EncarregadoManutencaoComponent, canActivate: [RoleGuardService],
      data: { expectedRole: ['USER', 'ADMIN'] }
  },
  { path: 'tecnico', component: TecnicoComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN'] }},
  { path: 'orgao', component: OrgaoComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN'] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN'] } },
  { path: 'status', component: StatusComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN'] } },
  { path: 'mapa', component: MapaComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN', 'MINISTERIO', 'USER'] } },
  { path: 'enviar-mensagem', component: EmailComponent, canActivate: [RoleGuardService], data: { expectedRole: ['ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
