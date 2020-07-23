import { EVENT_DELEGATION_PLUGINS_PROVIDER } from './event-delegation';
import { OUTSIDE_ZONE_PLUGINS_PROVIDER } from './outside-zone';
import { DEFER_EVENTS_PLUGINS_PROVIDER } from './defer-events-plugin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    DEFER_EVENTS_PLUGINS_PROVIDER,
    OUTSIDE_ZONE_PLUGINS_PROVIDER,
    EVENT_DELEGATION_PLUGINS_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
