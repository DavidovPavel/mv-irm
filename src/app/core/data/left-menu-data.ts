import { AppealStatus } from '@app/features/equipment-installation/store/enums';
import { IRMPermissions } from '@app/models';
import { MenuItem } from '@app/root-store/common/models/menu-item.interface';
import { environment } from '@env/environment';

const linkUrl = environment.linkUrl;
const linkUrlAlt = environment.linkUrlAlt;

const EQUIPMENTINSTALLATION_ROOT_URL = '/equipment-installation';

export const MenuItems: MenuItem[] = [
  { name: 'Главная', url: 'dashboard', icon: 'home' },
  {
    name: 'Установка техники',
    url: `${EQUIPMENTINSTALLATION_ROOT_URL}`,
    outside: true,
    icon: 'kitchen',
    permission: IRMPermissions.InstallationEquipment,
    children: [
      { name: 'Новые', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.New }] },
      { name: 'Приняты в работу', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.InWork }] },
      { name: 'Установка произведена', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.Finished }] },
      { name: 'Отказ от установки', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.Refusal }] },
      { name: 'Брак техники', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.Defect }] },
      { name: 'Архив отказов за полгода', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.ArchiveOfRefusal }] },
      {
        name: 'Архив установок за полгода',
        url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: AppealStatus.ArchiveOfFinished }],
      },
      { name: 'Все заявки', url: [EQUIPMENTINSTALLATION_ROOT_URL, { status: '' }] },
    ],
  },
  {
    name: 'ЦП на выезде',
    url: `${linkUrl}digital-list`,
    outside: true,
    icon: 'router',
    permission: IRMPermissions.DAonAssignment,
  },
  {
    name: 'ЦП в магазине',
    url: `${linkUrl}shop-digital-assistant-list`,
    outside: true,
    icon: 'devices_other',
    permission: IRMPermissions.DAinStore,
  },
  {
    name: 'Утилизация техники',
    url: `${linkUrl}recycling-list`,
    outside: true,
    icon: 'loop',
    permission: IRMPermissions.DisposalEquipment,
  },
  {
    name: 'Глобальный поиск',
    url: `${linkUrl}global-search`,
    outside: true,
    icon: 'search',
    permission: IRMPermissions.GlobalSearch,
  },
  // {
  //   name: 'Очередь установок',
  //   url: 'installation-queue',
  //   icon: 'line_weight',
  //   permission: IRMPermissions.InstallQueue,
  // },
  {
    name: 'Управление квотами',
    url: `${linkUrl}quotas`,
    outside: true,
    icon: 'event',
    permission: IRMPermissions.QuotaManagement,
  },
  {
    name: 'Доступные квоты',
    url: `${linkUrl}view-quotas`,
    outside: true,
    icon: 'event_note',
    permission: IRMPermissions.AvailableQuotas,
  },
  {
    name: 'Резервирование квот',
    url: `${linkUrl}internet-order-reserve`,
    outside: true,
    icon: 'event_available',
    permission: IRMPermissions.QuotaReservation,
  },
  {
    name: 'Запросы в СЦ',
    url: 'incidents',
    icon: 'how_to_vote',
    permission: IRMPermissions.RegisterRequests,
  },
  {
    name: 'Взаиморасчеты',
    url: `${linkUrlAlt}Settlements`,
    outside: true,
    icon: 'account_balance_wallet',
    permission: IRMPermissions.MutualSettlements,
  },
  {
    name: 'Справочник мастеров',
    url: `${linkUrl}service-center-master-list`,
    outside: true,
    icon: 'contact_phone',
    permission: IRMPermissions.HandbookMasters,
  },
  {
    name: 'Утилизация',
    icon: 'local_shipping',
    url: '',
    outside: true,
    permission: IRMPermissions.Recycling,
    children: [
      {
        url: `${linkUrlAlt}Recycling/App#/recycling-main`,
        name: 'Прием утиля в магазине',
        outside: true,
        permission: IRMPermissions.RecyclingMain,
      },
      {
        url: `${linkUrlAlt}Recycling/App#/recycling-service`,
        name: ' Реестр утилизатора',
        outside: true,
        permission: IRMPermissions.RecyclingService,
      },
      {
        url: `${linkUrlAlt}Recycling/App#/recycling-service-item-tm-delivery`,
        name: 'Взаиморасчеты с логистами',
        outside: true,
        permission: IRMPermissions.RecyclingSettlementsWithLogisticians,
      },
      {
        url: `${linkUrlAlt}Recycling/App#/user-list`,
        name: 'Пользователи утилизации',
        outside: true,
        permission: IRMPermissions.RecyclingUsers,
      },
      {
        url: `${linkUrlAlt}Recycling/App#/dictionaries`,
        name: 'Справочники утилизации',
        outside: true,
        permission: IRMPermissions.RecyclingDictionaries,
      },
      {
        url: `${linkUrlAlt}Recycling/App#/service-page`,
        name: 'Сервисная страница утилизации',
        outside: true,
        permission: IRMPermissions.RecyclingServicePage,
      },
    ],
  },

  {
    name: 'Справочники',
    url: `${linkUrl}shop-list`,
    outside: true,
    icon: 'library_books',
    permission: IRMPermissions.AllDirectories,
    children: [
      {
        name: 'Справочник МВЗ',
        url: `${linkUrl}shop-list`,
        outside: true,
        permission: IRMPermissions.DirectoryMVZ,
      },
      {
        name: 'Cервисные компании',
        url: `${linkUrl}service-company-list`, // `service-companies`,
        outside: true,
        permission: IRMPermissions.DirectoryServiceCompany,
      },
      {
        name: 'Справочники IRM',
        url: `${linkUrl}service-provided-dictionaries`,
        outside: true,
        permission: IRMPermissions.DirectoryIRM,
      },
      {
        name: 'Пользователи IRM',
        url: `${linkUrl}user-list`,
        outside: true,
        permission: IRMPermissions.UsersIRM,
      },
      {
        name: 'Сервисная страница IRM',
        url: `${linkUrl}service-page`,
        outside: true,
        permission: IRMPermissions.ServicePageIRM,
      },
    ],
  },

  {
    name: 'Отчеты',
    url: `${linkUrl}reports`,
    outside: true,
    icon: 'equalizer',
    permission: IRMPermissions.Reports,
  },
  {
    name: 'Инфо. материалы',
    url: `${linkUrlAlt}InformationMaterials`,
    outside: true,
    icon: 'info',
    permission: IRMPermissions.InformationMaterials,
  },
];
