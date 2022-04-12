import { AppealAdditionalInfo, FileInfo, Resolver } from '../store/models';
import { AppealStatus, PaymentStatus, ServiceStatus } from './enums';


export interface EquipmentInstallation {
  id: number;
  checkId: number;
  checkNumber: number;
  couponNumber: string;
  saleDate: string;
  appealDate: string | null;
  productName: string | null;
  productCode: string | null;
  serviceName: string | null;
  servicePrice: number;
  startDate: string;
  endDate: string;
  deliveryDateStart: string | null;
  deliveryDateEnd: string | null;
  deliveryTimeStart: string | null;
  deliveryTimeEnd: string | null;
  demandBaseId: string | null;
  repeatReasonText: string | null;
  subway: string | null;
  street: string | null;
  house: string;
  corps: string | null;
  building: string | null;
  flat: string | null;
  entrance: string | null;
  codeKey: string | null;
  elevator: boolean;
  floor: string | null;
  homePhone: string | null;
  mobilePhone: string | null;
  workPhone: string | null;
  email: string | null;
  shopComment: string | null;
  isRefund: boolean;
  refundCheckDate: string | null;
  checkDeleted: boolean;
  status: ServiceStatus; // [ 0, 1, 2, 10, 11 ];
  crmId: string | null;
  created: string;
  deliveryDate: string | null;
  serviceDesiredDate: string | null;
  internetOrderNumber: string | null;
  shopId: number;
  projectTypeId: number;
  cityId: number | null;
  cityName: string | null;
  isPaid: boolean | null;
  appealType: number[]; // AppealType; // [ 0, 1, 2, 3, 4, 5 ]
  orderNumber: string | null;
  serviceDate: string | null;
  resolverComment: string | null;
  wareCode: string | null;
  manufacturer: string | null;
  model: string | null;
  serial: string | null;
  paymentStatus: PaymentStatus; // [ 0, 1, 2, 3, 4 ]
  bsiStatus: AppealStatus; // [ 0, 1, 2, 3, 4, 5, 6, 7 ]
  warrantyPeriod: string | null;
  warrantyConditions: string | null;
  serviceCenterPhone: string | null;
  servicePeriod: string | null;
  agreementConditions: string | null;
  trans95Updated: boolean | null;
  resolverId: number | null;
  resolver: Resolver;
  deliveryDemandNumber: string | null;
  checkWaresList: string | null;
  tsOrderNumber: string | null;
  shipmentObject: string | null;
  clientName: string | null;
  clientFirstName: string | null;
  clientLastName: string | null;
  clientMiddleName: string | null;
  parentId: number | null;
  quotaId: string | null;
  zndZoneId: string | null;
  deliveryDependency: number[]; // DeliveryDependency; // [ 0, 1, 2, 3, 4 ]
  appealSource: number[]; // AppealSource; // [ 0, 1, 2, 3, 4, 5 ]
  appealAdditionalInfos: AppealAdditionalInfo[] | null;
  files: FileInfo[] | null;
}
