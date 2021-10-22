import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { SharedModule } from "./shared/shared.module";
import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatGridListModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule,
  MatRadioModule,
  MatTableModule,
  MatCardModule,
  MatSnackBarModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from "@angular/material";
import { CongratulationsComponent } from './components/congratulations/congratulations.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent, CongratulationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      closeButton: true,
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
