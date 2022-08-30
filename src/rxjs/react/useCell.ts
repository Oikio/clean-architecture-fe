import { useSyncExternalStore } from 'react';
import type { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

/** Only if you subscribe to BehaviorSubject to avoid undefined return on first render */
export const useCell = <T>(cell: BehaviorSubject<T>) =>
  useSyncExternalStore<T>(
    cb => {
      const subscription = cell.pipe(skip(1)).subscribe(cb);
      return () => subscription.unsubscribe();
    },
    () => cell.getValue()
  );
