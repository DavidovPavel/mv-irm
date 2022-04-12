import { filter } from 'rxjs/operators';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export const nonNullable = <T>() => filter((a): a is T => a !== null);

export const dateToString = (value: Moment | string | null, format?: string): string | null => {
  const d = moment(value);
  return d.isValid() ? d.format(format) : null;
};

export const checkExist = (label: string, field: string | number | null) => (field ? `${label} ${field},` : '');

export const clearEmpty = <T>(value: any, source: T): T => {
  return Object.keys(value).reduce<T>(
    (p, c) =>
      Array.isArray(value[c])
        ? value[c].length
          ? { ...p, [c]: value[c] }
          : { ...p }
        : value[c] !== '' && value[c] !== null
        ? { ...p, [c]: value[c] }
        : { ...p },
    source
  );
};
