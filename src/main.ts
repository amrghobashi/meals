import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import 'zone.js';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './app/reducers';
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimations(), provideStore(reducers, { metaReducers })],
});

