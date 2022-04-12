import { Injectable } from '@angular/core';
import { ServicesProvided } from '@app/models/services-provided';
import { ApiService } from '@irm-ui/common';
import { Observable } from 'rxjs';


const point = '/api/Services/';

@Injectable({
  providedIn: 'root',
})
export class ServicesProvidedService {
  constructor(private api: ApiService) {}

  // getServices(name: string, equ: EquipmentInstallation): Observable<ServicesProvided[]> {
  //   const { shopName: shopNumber, appealType: znuServices } = equ;
  //   if (!znuServices && shopNumber) {
  //     return this.getServicesByLinks(name, shopNumber);
  //   }

  //   if (!shopNumber && znuServices) {
  //     return this.getServicesByProvided(name, znuServices.toString());
  //   }

  //   if (shopNumber && znuServices) {
  //     return this.api.get(`${point}search`, { name, shopNumber, znuServices: znuServices.toString() });
  //   } else {
  //     throw new Error('Недостаточно параметров для запроса получения Услуг');
  //   }
  // }

  getServicesByLinks(name: string, shopNumber: string): Observable<ServicesProvided[]> {
    return this.api.get(`${point}Links/search`, { name, shopNumber });
  }

  getServicesByProvided(name: string, znuServices: string): Observable<ServicesProvided[]> {
    return this.api.get(`${point}Provided/search`, { name, znuServices });
  }
}
