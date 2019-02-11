import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

var routes: Routes = 
[
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  	{ path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'popover', loadChildren: './popover/popover.module#PopoverPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(){}
}
