import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { EXPANSION_PANEL_ANIMATION_TIMING } from '@app/core/animations/bodyExpansion';
import { LocalStorageService } from '@app/core/services/local-storage.service';

import { Region } from '../../store/models';
import { InstallationQueueStore, QUEUE_SERVICECENTER_ID } from './../../store/installation-queue.store';

const LIMIT_WIDTH = 66;
const PADDING_LEFT = 16;

const REGION_HEIGHT = 23;
const DATA_LINE_HEIGHT = 21;
const PADDING_BOTTOM = 10;
const INTERVAL_HEIGHT = 17;

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent {
  player!: AnimationPlayer;

  days$ = this.store.settings$;

  @Input() quotaGroupId!: number;
  @Input() regions!: Region[];

  @Input() set isExpanded(value: boolean | undefined) {
    const height = value ? this.height() : '0';
    this.expand(height);
  }

  constructor(
    private el: ElementRef,
    private ab: AnimationBuilder,
    private ren: Renderer2,
    private readonly store: InstallationQueueStore,
    private storage: LocalStorageService
  ) {}

  height(): string {
    const length = this.regions.reduce(
      (p, c) => p + (c.intervals && c.expand ? REGION_HEIGHT + c.intervals.length * INTERVAL_HEIGHT : REGION_HEIGHT),
      0
    );
    return length + DATA_LINE_HEIGHT + PADDING_BOTTOM + 'px';
  }

  expand(height: string): void {
    this.ab
      .build([animate(EXPANSION_PANEL_ANIMATION_TIMING, style({ height }))])
      .create(this.el.nativeElement)
      .play();
  }

  show(item: Region): void {
    item.expand = !item.expand;
    const serviceCenterId = this.storage.getItem(QUEUE_SERVICECENTER_ID);
    if (serviceCenterId && !item.intervals) {
      const param = { serviceCenterId: +serviceCenterId, quotaGroupId: this.quotaGroupId, regionId: item.id };
      this.store.fetchServiceCenterRegionLimits(param);
    } else {
      this.expand(this.height());
    }
  }

  toRight(e: Event, container: HTMLDivElement, leftBtn: HTMLButtonElement, days: number): void {
    const parent = container.parentElement;
    if (parent) {
      const dw = days * LIMIT_WIDTH + PADDING_LEFT - parent.offsetWidth;
      if (dw > 0) {
        this.player = this.create(`-${dw}px`, container);
        this.process(leftBtn, e.currentTarget);
      } else {
        this.ren.setStyle(e.currentTarget, 'display', 'none');
      }
    }
  }

  toLeft(e: Event, container: HTMLDivElement, rightBtn: HTMLButtonElement): void {
    this.player = this.create('0', container);
    this.process(rightBtn, e.currentTarget);
  }

  create(dx: string, container: HTMLElement): AnimationPlayer {
    return this.ab.build(animate('800ms', style({ left: dx }))).create(container);
  }

  process(showButton: HTMLButtonElement, hideButton: EventTarget | null): void {
    this.player.play();
    this.ren.setStyle(showButton, 'display', 'block');
    this.hideButton(hideButton);
  }

  stop(e: Event): void {
    if (this.player) {
      this.player.pause();
      this.hideButton(e.currentTarget);
    }
  }

  hideButton(a: EventTarget | null): void {
    this.player.onDone(() => this.ren.setStyle(a, 'display', 'none'));
  }
}
