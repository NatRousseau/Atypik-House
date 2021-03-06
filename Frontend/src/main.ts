import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  dsn: "http://a5f91b1eff2d41c4b9758db43d34c1a2@whyz-trap.fr:9000/6",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["https://atypikhouse.art/", "https://sentry.nathan-rousseau.fr/api"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
     platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
   });
