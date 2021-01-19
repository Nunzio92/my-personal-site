import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarWarComponent } from './star-war.component';


const routes: Routes = [
    { path: '', component: StarWarComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StarWarRoutingModule {
}
