import { RouterModule, Routes } from "@angular/router";
import { ApartmentDetailComponent } from "../apartment-detail/apartment-detail.component";
import { ApartmentsListComponent } from "../apartments-list/apartments-list.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { PublicHomeComponent } from "../public-home/public-home.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PublicHomeComponent
    },
    {
        path: 'apartments',
        component: ApartmentsListComponent
    },
    {
        path: 'apartment',
        component: ApartmentDetailComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },

]

export const MainRoutingModule = RouterModule.forChild(routes);