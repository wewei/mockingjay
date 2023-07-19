import { useEffect, useState } from "react";

export type Observable<T> = (observer?: () => void) => [T, () => void];

export function observable<T>(initial: T): [Observable<T>, (updater: (v: T) => T) => void] {
    let value = initial;
    let observers = new Set<() => void>();

    function update(updater: (v: T) => T) {
        const obs = observers;
        observers = new Set<() => void>();
        value = updater(value);
        obs.forEach((ob) => ob());
    }

    function observe(observer?: () => void): [T, () => void] {
        if (observer) {
            observers.add(observer);
        }
        return [value, () => {
            if (observer) {
                observers.delete(observer);
            }
        }];
    }

    return [observe, update];
}

export function useOb<T>(observable: Observable<T>): T {
    const [, setC] = useState(0);
    const [value, unobserve] = observable(() => setC(c => (c + 1) & 0x7fffffff));
    useEffect(() => unobserve, [unobserve])
    return value;
}
