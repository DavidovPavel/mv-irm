import { EquipmentInstallation } from './../../store/equipment-installation.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { checkExist } from '@app/core/func/pure';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(s: EquipmentInstallation): string {
    return `${s.cityName}, ул.${s.street},
    ${checkExist('ст. метро', s.subway)}
    д.${s.house}, ${checkExist('к.', s.corps)} ${checkExist('стр.', s.building)}
    ${checkExist('подъезд', s.entrance)} ${checkExist('этаж', s.floor)} ${checkExist('кв.', s.flat)}
    ${checkExist('код. ключ', s.codeKey)} ${checkExist('лифт', s.elevator ? 'есть' : 'нет')}
    `;
  }
}
