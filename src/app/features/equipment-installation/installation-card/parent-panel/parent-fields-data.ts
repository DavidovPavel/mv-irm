import { checkExist, dateToString } from '@app/core/func/pure';

import { ContractorServiceItemStatusData } from '../../store/status';

export const ParentFieldsData = [
  {
    label: 'ФИО',
    name: 'clientName',
    type: 'label',
  },
  {
    label: 'Адрес',
    name: 'address',
    type: 'label',
    output: (s: EquipmentInstallationParent) => `${s.cityName}, ${s.street}, ${s.house},
    ${checkExist('к.', s.corps)} ${checkExist('стр.', s.building)}
    ${checkExist('подъезд', s.entrance)} ${checkExist('этаж', s.floor)} ${checkExist('кв.', s.flat)}
    `,
  },
  {
    label: 'Номер заявки',
    name: 'couponNumber',
    type: 'link',
    output: (s) => [`/equipment-installation/${s.id}`, s.couponNumber],
  },
  {
    label: 'Сервис Центр',
    name: 'serviceCenterName',
    type: 'label',
  },
  {
    label: '№ заказа СК',
    name: 'serviceCompanyOrderNumber',
    type: 'label',
  },
  {
    label: 'Дата установки',
    name: 'serviceDate',
    type: 'label',
    output: (source) => dateToString(source.serviceDate),
  },
  {
    label: 'Статус',
    name: 'statusString',
    type: 'label',
    output: (s: EquipmentInstallationParent) =>
      ContractorServiceItemStatusData.find((a) => a.Id === s.itemStatus)?.Name || '',
  },
  {
    label: 'Комментарий СК',
    name: 'serviceCompanyComment',
    type: 'label',
    cssClassNames: 'full-width',
  },
];
