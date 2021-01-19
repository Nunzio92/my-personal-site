import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'landing', component: LandingComponent},
  {
    path: 'star-war',
    loadChildren: () => import('./games/star-war/star-war-routing.module').then(mod => mod.StarWarRoutingModule),
    data: {preload: {dueTime: 2500}}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
