import { IRMPermissions } from '@app/models';
import { environment } from '@env/environment';

import { Tile } from './state/models/dashboard-tile.interface';
import { EquipmentInstallationComponent } from './widgets/equipment-installation/equipment-installation.component';
import { IncidentWidgetComponent } from './widgets/incident-widget/incident-widget.component';

const linkUrl = environment.linkUrl;
const linkUrlAlt = environment.linkUrlAlt;

export const DashboardTileData: Tile[] = [
  {
    name: 'equipment-installation',
    url: `${linkUrl}installation-list`,
    title: 'Установка техники',
    component: EquipmentInstallationComponent,
    description: {
      text: 'Реестр заявок на установку бытовой техники',
      permission: IRMPermissions.InstallationEquipmentDescription,
    },
    permission: IRMPermissions.InstallationEquipment,
  },
  {
    name: 'digital-assistant-shop',
    url: `${linkUrl}shop-digital-assistant-list`,
    title: 'ЦП в магазине',
    description: 'Реестр заявок на услуги по обслуживанию цифровой техники в розничных магазинах',
    permission: IRMPermissions.DAinStore,
  },
  {
    name: 'quotas-managements',
    url: `${linkUrl}quotas`,
    title: 'Управление квотами',
    description: 'Просмотр и установка квот для сервисных центров',
    permission: IRMPermissions.QuotaManagement,
  },
  {
    name: 'mutual-settlements',
    url: `${linkUrlAlt}Settlements`,
    title: 'Взаиморасчеты',
    description: 'Создание и согласование отчетов о выполненных установках',
    permission: IRMPermissions.MutualSettlements,
  },
  {
    name: 'available-quotas',
    url: `${linkUrl}view-quotas`,
    title: 'Доступные квоты',
    description: 'Доступные квоты по услугам установки на дату',
    permission: IRMPermissions.AvailableQuotas,
  },
  {
    name: 'incidents',
    url: '/incidents',
    title: 'Запросы в СЦ',
    component: IncidentWidgetComponent,
    description: {
      text: 'Обращения в СЦ для решения инцидентов клиентов',
      permission: IRMPermissions.RegisterRequestsDescription,
    },
    inside: true,
    permission: IRMPermissions.RegisterRequests,
  },
  {
    name: 'junk-acceptance-in-store',
    url: `${linkUrlAlt}Recycling/App#/recycling-main`,
    title: 'Прием утиля в магазине',
    description: 'Прием и регистрация утиля от клиентов в розничных магазинах',
    permission: IRMPermissions.Recycling,
  },
];
