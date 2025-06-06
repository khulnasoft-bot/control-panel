import { snakeToCamelCase } from './strings';
import { RequiredDeep, SnakeToCamelCaseDeep } from './types';

export function requiredDeep<T>(value: T): RequiredDeep<T> {
  return value as RequiredDeep<T>;
}

export function hasProperty<T, K extends keyof T>(property: K, value: T[K] | null | undefined) {
  return (obj: T) => obj[property] === value;
}

function getter<P extends PropertyKey>(property: P) {
  return <T extends { [key in P]: V }, V>(obj: T): V => obj[property];
}

export const getId = getter('id');
export const getName = getter('name');

export function keys<K extends PropertyKey>(obj: Record<K, unknown>) {
  return Object.keys(obj) as K[];
}

export function entries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function toObject<T, K extends PropertyKey, V>(
  array: readonly T[],
  getKey: (item: T, index: number) => K,
  getValue: (item: T, index: number) => V,
): Record<K, V> {
  return array.reduce(
    (obj, item, index) => ({
      ...obj,
      [getKey(item, index)]: getValue(item, index),
    }),
    {} as Record<K, V>,
  );
}

export function trackChanges<T extends object>(object: T, onChange: (path: string, value: unknown) => void) {
  return new Proxy(object, {
    get(target, property) {
      const value = target[property as keyof T];

      if (typeof value === 'object' && value !== null) {
        return trackChanges(value, (key, value) => onChange(`${String(property)}.${key}`, value));
      } else {
        return value;
      }
    },
    set(target, property, value, receiver) {
      if (target[property as keyof T] !== value) {
        onChange(String(property), value);
      }

      return Reflect.set(target, property, value, receiver);
    },
  });
}

export function snakeToCamelDeep<T>(obj: T): SnakeToCamelCaseDeep<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj as SnakeToCamelCaseDeep<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamelDeep) as SnakeToCamelCaseDeep<T>;
  }

  return Object.entries(obj).reduce(
    (obj, [key, value]) => ({ ...obj, [snakeToCamelCase(key)]: snakeToCamelDeep(value) }),
    {} as SnakeToCamelCaseDeep<T>,
  );
}
