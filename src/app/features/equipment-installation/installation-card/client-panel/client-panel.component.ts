import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { bodyExpansion } from '@app/core/animations/bodyExpansion';

import { EquipmentInstallation } from '../../store/equipment-installation.interface';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.scss'],
  animations: [bodyExpansion],
})
export class ClientPanelComponent {
  panelOpenState = true;

  emailValidators = { validators: Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) };

  @Input()
  form!: FormGroup;

  @Input()
  appeal!: EquipmentInstallation;
}
