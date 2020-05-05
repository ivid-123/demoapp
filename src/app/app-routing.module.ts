import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationGuard } from './common/authguard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VideosGraphPageComponent } from './videos-graph-page/videos-graph-page.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent
},
{
  path: 'dashboard',
  children: [
    {
      path: '',
      component: DashboardComponent,
      canActivate: [AuthenticationGuard]
    }
  ]

},
{
  path: 'videos',
  children: [
    {
      path: '',
      component: VideosGraphPageComponent,
      canActivate: [AuthenticationGuard]
    }
  ]

},
{ path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
