import { Component, HostBinding, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IncidentStore } from '../store/incident.store';

const ErrorMessageData: { [key: string]: string } = {
  serviceCenterId: 'Сервисный центр не найден',
  shopId: 'Магазин не найден',
  brand: 'Бренд не найден',
};

@Component({
  selector: 'app-incident-request',
  templateUrl: './incident-request.component.html',
  styleUrls: ['./incident-request.component.scss'],
})
export class IncidentRequestComponent implements OnInit {
  @HostBinding('class') class = 'page-container';
  checkSuccess = false;
  reserveControl = this.fb.array([]);
  disabled = false;

  form = this.fb.group({
    numberZNU: ['', Validators.required],
    shopName: ['', Validators.required],
    serviceCenterName: ['', Validators.required],
    incidentNumber: ['', Validators.required],
    clientName: ['', Validators.required],
    clientPhone: ['', Validators.required],
    problemEssence: ['', Validators.required],
    responsibleEmployeeMail: ['', [Validators.required, Validators.email]],
    incidentCreationReasonId: [null, Validators.required],
    expectedSolution: ['', Validators.required],
    shopId: ['', Validators.required],
    serviceCenterId: ['', Validators.required],
    brand: ['', Validators.required],
    serviceName: ['', Validators.required],
    returnUrl: [{ value: '', disabled: true }],
    appealType: 0,
    internetOrderNumber: '',
    tsOrderNumber: '',
  });

  createReasonProp$ = this.store.createReasonProp$;
  serviceCenters$ = this.store.serviceCenters$.pipe(tap((a) => this.form.get('serviceCenterId')?.setValue(a[0].id)));
  shops$ = this.store.shops$.pipe(tap((a) => this.form.get('shopId')?.setValue(a[0].id)));
  numInCRM$ = this.store.numInCRM$.pipe(
    tap(({ brand }) => {
      this.checkSuccess = !!brand;
      this.form.get('brand')?.setValue(brand);
    })
  );

  createResult$ = this.store.createResult$.pipe(
    map((a) => {
      if (a.errCode === '--') {
        this.checkSuccess = true;
      } else {
        window.location.href = this.form.get('returnUrl')?.value;
      }
      return a;
    })
  );

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private readonly store: IncidentStore) {}

  ngOnInit(): void {
    const params = this.fillFormFields();
    const { shopName, serviceCenterName } = params;
    if (shopName && serviceCenterName) {
      this.store.fetchDictionary({
        name: 'serviceCenterId',
        params: {
          name: serviceCenterName,
          'pagination.pageIndex': '0',
          'pagination.pageSize': '1000',
        },
      });
      this.store.fetchDictionary({
        name: 'shopId',
        params: { name: shopName, 'pagination.pageIndex': '0', 'pagination.pageSize': '1000' },
      });
    }
  }

  fillFormFields(): { shopName: string | null; serviceCenterName: string | null } {
    const params = this.route.snapshot.queryParamMap;
    params.keys
      .map<[AbstractControl | null, string | null]>((key) => [this.form.get(key), params.get(key)])
      .filter((a): a is [AbstractControl, string | null] => a[0] !== null)
      .forEach((a) => a[0].setValue(a[1] && a[1] !== 'null' ? a[1] : ''));

    return { shopName: params.get('shopName'), serviceCenterName: params.get('serviceCenterName') };
  }

  check(): void {
    const { incidentNumber, numberZNU } = this.form.value;
    if (incidentNumber && numberZNU) {
      this.store.fetchNumInCRM({ numberZNU, incidentNumber });
    } else {
      this.form.updateValueAndValidity();
      this.form.markAllAsTouched();
    }
    this.store.fetchCreateReasonProp();
  }

  save(): void {
    if (this.form.valid) {
      this.checkSuccess = false;
      this.store.createRequest({
        request: {
          ...this.form.value,
          appealType: +this.form.value.appealType,
          incidentCreationReasonType: +this.form.value.incidentCreationReasonType,
        },
        requestFiles: this.reserveControl.value,
      });
    } else {
      this.form.updateValueAndValidity();
      this.form.markAllAsTouched();

      const errMessage = Object.keys(this.form.controls)
        .map((key) => (this.form.controls[key].invalid ? ErrorMessageData[key] : ''))
        .filter((a) => a)
        .join('; ');

      this.createResult$ = of({ errCode: '--', errMessage });
    }
  }

  back(): void {
    window.history.back();
  }
}
