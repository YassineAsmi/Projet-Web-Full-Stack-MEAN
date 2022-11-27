import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

import { HomeComponent } from "./views/home/home.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardModeratorComponent } from "./board-moderator/board-moderator.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { ClientsComponent } from "./views/admin/clients/clients.component";
import { UsersComponent } from "./views/admin/users/users.component";
import { StocksComponent } from "./views/admin/stocks/stocks.component";
import { DistributorsComponent } from "./views/admin/distributors/distributors.component";
import { InvoicesComponent } from "./views/admin/invoices/invoices.component";
/*const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "index", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];*/
const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "Clients", component: ClientsComponent },
      { path: "users", component: UsersComponent },
      { path:"stocks",component: StocksComponent},
      { path: "distributors", component: DistributorsComponent },
      { path: "invoices", component: InvoicesComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
