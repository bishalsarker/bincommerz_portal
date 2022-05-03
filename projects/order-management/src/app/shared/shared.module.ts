import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { RouterModule } from "@angular/router";
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [DataTableComponent, LayoutComponent, BreadcrumbComponent, AuthCallbackComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent, DataTableComponent, BreadcrumbComponent, LoaderComponent],
})
export class SharedModule {}
