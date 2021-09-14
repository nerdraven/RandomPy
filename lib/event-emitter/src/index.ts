/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

function noop(): void {}

interface IEmitter {
  subscribe: (
    name: string,
    cb: (d: any) => void
  ) => { unsubscribe: () => void };
  emit: (name: string, data: any) => void;
}

function EventEmitter(): IEmitter {
  const events: Record<string, [(d: any) => void]> = {};
  return {
    subscribe: (name: string, cb: (d: any) => void) => {
      (events[name] || (events[name] = [noop])).push(cb);
      return {
        unsubscribe: () => {
          events[name] && events[name].splice(events[name].indexOf(cb), 1);
        },
      };
    },
    emit: (name: string, data: any) => {
      (events[name] || []).forEach((fn) => fn(data));
    },
  };
}

export default EventEmitter;
