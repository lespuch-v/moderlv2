import { MoodRecordComponent } from './mood-record/mood-record.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { AuthGuard } from './services/authGuards';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stats', component: UserStatsComponent, canActivate: [AuthGuard] },
  { path: 'mood',  component: MoodRecordComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
