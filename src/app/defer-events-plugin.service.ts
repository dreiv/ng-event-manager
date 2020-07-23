import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DeferEventsPluginService {
  constructor() {}

  manager: EventManager;

  supports(eventName: string): boolean {
    return /debounce|throttle/.test(eventName);
  }

  addEventListener(element, eventName, originalHandler): Function {
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
      element.addEventListener(name, handler);
    });

    return () => {
      element.removeEventListener(name, handler);
      handler = null;
    };
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
