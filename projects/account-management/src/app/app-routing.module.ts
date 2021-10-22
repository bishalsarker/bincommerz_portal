import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "signup"
  },
  {
    path: "signup",
    component: RegistrationComponent
  },
  {
    path: "signup-success",
    component: CongratulationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
