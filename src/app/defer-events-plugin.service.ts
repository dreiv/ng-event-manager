import { Injectable, Inject, Provider } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EVENT_MANAGER_PLUGINS, EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DeferEventsPluginService {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  manager: EventManager;

  supports(eventName: string): boolean {
    return /debounce|throttle/.test(eventName);
  }

  addEventListener(targetElement, eventName, originalHandler): any {
    const [name, method, milliseconds = 300] = eventName.split('.');

    const innerHandler = (event) =>
      this.manager.getZone().runGuarded(() => originalHandler(event));

    let handler;

    if (method === 'debounce') {
      handler = debounce(innerHandler, milliseconds);
    } else {
      handler = throttle(innerHandler, milliseconds);
    }

    this.manager.getZone().runOutsideAngular(() => {
      targetElement.addEventListener(name, handler);
    });

    return () => {
      targetElement.removeEventListener(name, handler);
      handler = null;
    };
  }

  addGlobalEventListener(
    selector: string,
    eventName: string,
    handler: (event: Event) => void
  ): () => void {
    let element;

    if (selector === 'window') {
      element = this._document.defaultView;
    }
    return this.addEventListener(element, eventName, handler);
  }
}

const debounce = (func, delay) => {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

const throttle = (callback, delay) => {
  let throttleTimeout = null;
  let storedEvent = null;

  const throttledEventHandler = (event) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};

export const DEFER_EVENTS_PLUGINS_PROVIDER: Provider = {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: DeferEventsPluginService,
  deps: [DOCUMENT],
  multi: true
};
