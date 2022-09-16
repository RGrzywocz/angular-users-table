import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './services/authentication.guard';

const routes: Routes = [
  {path:'', component:AdminPanelPageComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
