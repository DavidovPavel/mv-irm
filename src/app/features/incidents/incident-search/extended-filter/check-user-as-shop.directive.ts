import { Directive, Host, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { Subscription } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { FLAG_SHOP_PARAM, IncidentStore, SHOP_PARAM } from './../../store/incident.store';
import { FilterAutocompleteComponent } from './../filter-autocomplete/filter-autocomplete.component';

@Directive({
  selector: '[appCheckUserAsShop]',
})
export class CheckUserAsShopDirective implements OnInit, OnDestroy {
  stream$!: Subscription;

  constructor(
    private readonly store: IncidentStore,
    @Host() private control: FilterAutocompleteComponent,
    private storage: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stream$ = this.store.profile$
      .pipe(
        pluck('shopNumber'),
        filter((a): a is string => !!a),
        tap((name) => this.store.fetchDictionary({ name: 'shopId', params: { name } })),
        switchMap((name) =>
          this.store.shops$.pipe(
            filter((result) => result.length === 1 && !!result[0].id),
            map(([a]) => a.id as number),
            filter((a) => !!a),
            tap((shopId) => {
              if (this.storage.getItem(FLAG_SHOP_PARAM) !== `${shopId}`) {
                const params = this.route.snapshot.params;
                const exist = params[SHOP_PARAM];
                if (shopId && !exist) {
                  this.control.collector.form.get(SHOP_PARAM)?.setValue(shopId);
                  this.storage.setItem(SHOP_PARAM, shopId.toString());
                  this.storage.setItem(FLAG_SHOP_PARAM, '');

                  this.control.formControl.setValue({ id: shopId, name });
                  this.store.loadOne({ name: SHOP_PARAM, data: { id: shopId, name } });
                  this.store.addChip({
                    label: `Магазин: ${name}`,
                    key: SHOP_PARAM,
                  });
                  this.control.changed.emit();
                }
              }
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.stream$.unsubscribe();
  }
}
