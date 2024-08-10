import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { CartReducer } from './_store/Cart/Cart.Reducer';
import { CartEffects } from './_store/Cart/Cart.Effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({'cart': CartReducer}), provideAnimations(),
    provideEffects(CartEffects)
  ]
};
