import { DeferEventsPluginService } from './defer-events-plugin.service';
import { BrowserModule } from '@angular/platform-browser';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    {
      multi: true,
      provide: EVENT_MANAGER_PLUGINS,
      useClass: DeferEventsPluginService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
