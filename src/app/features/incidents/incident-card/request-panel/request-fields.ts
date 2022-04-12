import { IRMPermissions } from '@app/models';

export const RequestFields = [
  {
    name: 'incidentNumber',
    label: 'Номер инцидента/претензии',
    permission: IRMPermissions.IncidentEdit_incidentNumber,
  },
  {
    name: 'numberZNU',
    label: 'Номер ЗНУ',
  },
  {
    name: 'incidentRequestStatusType',
    label: 'Статус запроса',
  },
  {
    name: 'clientName',
    label: 'ФИО клиента',
    permission: IRMPermissions.IncidentEdit_clientName,
  },
  {
    name: 'clientPhone',
    label: 'Телефон клиента',
    permission: IRMPermissions.IncidentEdit_clientPhone,
  },
  {
    name: 'serviceCompanyName',
    label: 'Сервисная компания',
  },
  {
    name: 'serviceCenterName',
    label: 'Сервисный центр',
    permission: IRMPermissions.IncidentEdit_serviceCenter,
  },
  {
    name: 'blameServiceCenterType',
    label: 'Вина СЦ',
    permission: IRMPermissions.IncidentEdit_blameServiceCenterType,
  },
  {
    name: 'incidentCreationReasonId',
    label: 'Причина создания',
    permission: IRMPermissions.IncidentEdit_incidentCreationReasonType,
  },
  {
    name: 'responsibleEmployeeMail',
    label: 'Почта отв. сотрудника',
    permission: IRMPermissions.IncidentEdit_responsibleEmployeeMail,
    cssClassNames: 'full-width',
  },
  {
    name: 'problemEssence',
    label: 'Суть проблемы/обращения',
    permission: IRMPermissions.IncidentEdit_problemEssence,
    cssClassNames: 'full-width',
  },
  {
    name: 'expectedSolution',
    label: 'Ожидаемое решение',
    permission: IRMPermissions.IncidentEdit_expectedSolution,
    cssClassNames: 'full-width',
  },
  {
    name: 'requestFiles',
    label: 'Файлы запроса',
    type: 'file',
    cssClassNames: 'full-width',
    permission: IRMPermissions.IncidentEdit_requestFiles,
  },
];
