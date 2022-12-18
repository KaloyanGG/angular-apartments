import { RouterModule, Routes } from "@angular/router";
import { NonauthGuard } from "src/app/shared/nonauth.guard";
import { ApartmentDetailComponent } from "../apartment-detail/apartment-detail.component";
import { ApartmentsListComponent } from "../apartments-list/apartments-list.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { PublicHomeComponent } from "../public-home/public-home.component";
import { RentalsComponent } from "../rentals/rentals.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PublicHomeComponent,
        canActivate: [NonauthGuard]
    },
    {
        path: 'apartments',
        component: ApartmentsListComponent
    },
    {
        path: 'apartments/:id',
        component: ApartmentDetailComponent
    },
    {
        path: 'rentals',
        component: RentalsComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },

]

export const MainRoutingModule = RouterModule.forChild(routes);