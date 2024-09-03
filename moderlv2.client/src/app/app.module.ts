import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { HomeComponent } from './home/home.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MoodRecordComponent } from './mood-record/mood-record.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';
import { StatJournalCounterComponent } from './stat-journal-counter/stat-journal-counter.component';
import { StatJournalCurrentMoodComponent } from './stat-journal-current-mood/stat-journal-current-mood.component';
import { StatJournalCurrentStreakComponent } from './stat-journal-current-streak/stat-journal-current-streak.component';
import { StatJournalMoodForecastComponent } from './stat-journal-mood-forecast/stat-journal-mood-forecast.component';
import { StatJournalWordCountComponent } from './stat-journal-word-count/stat-journal-word-count.component';
import { StatsComponent } from './stats/stats.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    StatsComponent,
    UserStatsComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, DarkModeToggleComponent, AppComponent, LoginModalComponent, MoodRecordComponent, StatJournalCounterComponent, StatJournalCurrentMoodComponent, NavbarComponent, RegistrationModalComponent, StatJournalMoodForecastComponent, StatJournalCurrentStreakComponent, StatJournalWordCountComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
