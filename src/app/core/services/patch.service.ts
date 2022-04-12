import { Injectable } from '@angular/core';
import { OperationType } from '@app/features/equipment-installation/store/enums';
import { Operation } from '@app/features/equipment-installation/store/models';


@Injectable({
  providedIn: 'root',
})
export class PatchService {
  parse<T extends { [key: string]: any }>(source: T, update: T, op: OperationType, path: string = ''): Operation[] {
    const props = Object.keys(update).filter((key) => source[key] !== update[key]);
    return props.map((key) => ({ op, path: `${path}/${key}`.replace('//', '/'), value: update[key] }));
  }
}
