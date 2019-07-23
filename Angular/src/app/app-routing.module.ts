import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

//This is my case 
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "student-details/:id", component: StudentDetailsComponent },
  { path: "**", redirectTo:"''" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
