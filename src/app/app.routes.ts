import { Routes } from '@angular/router';
import { StartPage } from './components/start-page/start-page';

export const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: 'start', component: StartPage },
];
