import { animate, state, style, transition, trigger } from '@angular/animations';

export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const bodyExpansion = trigger('bodyExpansion', [
  state('collapsed, void', style({ height: '0px', overflow: 'hidden' })),
  state('expanded', style({ height: '*', overflow: 'hidden' })),
  transition('expanded <=> collapsed, void => collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
]);
