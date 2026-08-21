import { Routes } from '@angular/router';
import { StartPage } from './components/start-page/start-page';
import { GamePage } from './components/game-page/game-page';
import { VictoryPage } from './components/victory-page/victory-page';

export const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: 'start', component: StartPage },
    { path: 'game', component: GamePage },
    { path: 'victory', component: VictoryPage },
];
