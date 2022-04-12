export enum IRMPermissions {
  // left menu
  InstallationEquipment = 'installation_equipment',
  DAonAssignment = 'da_on_assignment',
  DAinStore = 'da_in_store',
  DisposalEquipment = 'disposal_equipment',
  GlobalSearch = 'global_search',
  QuotaManagement = 'quota_management',
  AvailableQuotas = 'available_quotas',
  QuotaReservation = 'quota_reservation',
  MutualSettlements = 'mutual_settlements',
  AllDirectories = 'all_directories',
  DirectoryMVZ = 'directory_MVZ',
  DirectoryIRM = 'directory_IRM',
  UsersIRM = 'users_IRM',
  ServicePageIRM = 'service_page_IRM',
  Reports = 'reports',
  InformationMaterials = 'information_materials',
  RegisterRequests = 'register_of_requests', // Запросы в СЦ
  DirectoryServiceCompany = 'service-company-list',
  HandbookMasters = 'handbook-masters',
  InstallQueue = 'install-queue', // Очередь установок

  Recycling = 'Recycling',
  RecyclingMain = 'RecyclingMain', // Прием утиля в магазине',
  RecyclingService = 'RecyclingService', // Реестр утилизатора',
  RecyclingSettlementsWithLogisticians = 'RecyclingSettlementsWithLogisticians', // Взаиморасчеты с логистами',
  RecyclingUsers = 'RecyclingUsers', // Пользователи утилизации',
  RecyclingDictionaries = 'RecyclingDictionaries', // Справочники утилизации',
  RecyclingServicePage = 'RecyclingServicePage', // Сервисная страница утилизации',

  // left menu end

  // dashboard
  InstallationEquipmentDescription = 'installation_equipment_description',
  RegisterRequestsDescription = 'register_of_requests_description',
  // dashboard end

  Incident_cancel = 'incident_cancel',
  Incident_complete = 'incident_complete',
  Incident_sendToSC = 'incident_send_to_SC',
  IncidentEdit_incidentNumber = 'incident_edit_incidentNumber',
  IncidentEdit_clientName = 'incident_edit_clientName', // ФИО клиента
  IncidentEdit_clientPhone = 'incident_edit_clientPhone', // Телефон клиента
  IncidentEdit_incidentCreationReasonType = 'incident_edit_incidentCreationReasonType', // Причина создания
  IncidentEdit_problemEssence = 'incident_edit_problemEssence', // Суть проблемы/обращения
  IncidentEdit_expectedSolution = 'incident_edit_expectedSolution', // Ожидаемое решение
  IncidentEdit_responsibleEmployeeMail = 'incident_edit_responsibleEmployeeMail', // Почта отв. сотрудника
  IncidentEdit_blameServiceCenterType = 'incident_edit_blameServiceCenterType', // Вина СЦ
  IncidentEdit_departureDate = 'incident_edit_departureDate', // Дата выезда
  IncidentEdit_comments = 'incident_edit_comments', // Комментарии
  IncidentEdit_requestFiles = 'incident_edit_requestFiles', // Файл запроса
  IncidentEdit_commentFiles = 'incident_edit_commentFiles', // Файл комментари
  IncidentEdit_serviceCenter = 'choose_another_serviceCenter', // Редактировать сервисный центр
  ExpirationEdit_scores = 'expiration_edit_scores',
  ExpirationEdit_comments = 'expiration_edit_comments',
  ExpirationYellow = 'will_expire_incidents',
  ExpirationRed = 'expired_incidents',
  ViewIncidentHistory = 'show_request_history'
}
