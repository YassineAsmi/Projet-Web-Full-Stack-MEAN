import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';



import { FullComponent } from './layouts/full/full.component';
import { AuthComponent } from './views/auth/auth.component';
import { ClientsComponent } from './views/clients/clients.component';
import { DistributorsComponent } from './views/distributors/distributors.component';
import { InvoicesComponent } from './views/invoices/invoices.component';
import { LoginComponent } from './views/login/login.component';
import { StocksComponent } from './views/stocks/stocks.component';
import { UsersComponent } from './views/users/users.component';

export const Approutes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "clients", component: ClientsComponent },
      { path: "distributos", component: DistributorsComponent },
      { path: "stocks", component: StocksComponent },
      { path: "invoices", component: InvoicesComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'admin', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
