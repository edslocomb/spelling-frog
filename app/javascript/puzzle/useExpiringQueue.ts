import { useState } from "react";

interface QueueItemType<T> {
  id: number;
  value: T;
  timerId: number;
}

export function useExpiringQueue<T>(
  delay = 1000
): [T[], (value: T) => void, (id: number) => void] {
  const initialState = {
    items: [] as QueueItemType<T>[],
    nextId: 0,
  };

  const [state, setState] = useState(initialState);

  const add = (value: T) =>
    setState((currentState) => {
      const { items, nextId } = currentState;
      const timerId = setTimeout(() => remove(nextId), delay);
      const newItem = { id: nextId, value, timerId };

      return {
        items: [...items, newItem],
        nextId: nextId + 1,
      };
    });

  const remove = (id: number) =>
    setState((currentState) => {
      const { items, nextId } = currentState;

      return {
        items: items.filter((n) => n.id !== id),
        nextId,
      };
    });

  return [state.items.map((i) => i.value), add, remove];
}

export default useExpiringQueue;
