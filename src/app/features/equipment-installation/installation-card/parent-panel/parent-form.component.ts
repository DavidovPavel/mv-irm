import { Component, OnInit } from '@angular/core';
import { bodyExpansion } from '@app/core/animations/bodyExpansion';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  animations: [bodyExpansion],
})
export class ParentFormComponent implements OnInit {
  panelOpenState = true;
  // fields: FormFieldModel<EquipmentInstallationParent>[] = [];
  // dataSource$!: Observable<EquipmentInstallationParent | null>;

  constructor() {}

  ngOnInit(): void {
    // this.store.dispatch(EquipmentInstallationStoreActions.getParent());
    // this.dataSource$ = this.store.select(EquipmentInstallationStoreSelectors.selectParent).pipe(
    //   filter((a) => a !== null),
    //   map((a) => a as EquipmentInstallationParent),
    //   tap((a: EquipmentInstallationParent) => (this.fields = this.service.parse(ParentFieldsData, a)))
    // );
  }
}
