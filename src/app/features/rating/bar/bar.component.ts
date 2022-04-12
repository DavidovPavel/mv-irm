import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MarkResponse } from '@app/features/dashboard/state/models/mark-response.interface';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

import { MarkChart, RatingService } from './../rating.service';

enum MetricName {
  '%' = '% оценок',
  'amt' = 'Кол-во оценок',
}

@Component({
  selector: 'app-bar',
  template: '',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit, AfterViewInit, OnDestroy {
  labelPadding = 4;
  width = 300;
  height = 120;
  margin = { top: 10, right: 30, bottom: 20, left: 25 };
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, null> | null = null;

  citySubscribtion!: Subscription;

  data: MarkChart[] = [];

  @HostBinding('id') idValue = `bar${Date.now()}`;

  @Input() marks!: MarkResponse[];

  constructor(private service: RatingService, private el: ElementRef) {}

  ngOnInit(): void {
    this.width = this.el.nativeElement.offsetWidth;
    this.citySubscribtion = this.service.city$.subscribe((city) => this.reactionToCityChange(city));
  }

  ngAfterViewInit(): void {
    this.reactionToCityChange(this.service.City);
  }

  ngOnDestroy(): void {
    this.citySubscribtion.unsubscribe();
  }

  reactionToCityChange(city: string): void {
    const percentData = this.marks.filter((c) => c.city === city && c.metricName === MetricName['%']);
    const countData = this.marks.filter((a) => a.city === city && a.metricName === MetricName.amt);
    if (city) {
      this.data = new Array(5).fill(null).map((a, i) => ({
        mark: `${i + 1}`,
        count: countData.find((b) => b.mark === i + 1)?.valuePerCity || 0,
        value: percentData.find((b) => b.mark === i + 1)?.valuePerCity || 1,
      }));
    } else {
      this.data = new Array(5).fill(null).map((a, i) => ({
        mark: `${i + 1}`,
        count:
          this.marks.filter((c) => c.metricName === MetricName.amt).find((b) => b.mark === i + 1)?.valuePerCompany || 0,
        value:
          this.marks.filter((c) => c.metricName === MetricName['%']).find((b) => b.mark === i + 1)?.valuePerCompany || 1,
      }));
    }

    if (!this.svg) {
      this.initBar();
    }
    this.drawBar();
  }

  initBar(): void {
    this.svg = d3.select(`app-bar#${this.idValue}`).append('svg').attr('width', this.width).attr('height', this.height);
  }

  drawBar(): void {
    const color = ['#e82020', '#ff8127', '#fff200', '#b7e61e', '#25af4e'];

    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.mark))
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.3);

    const xAxis = (g: d3.Selection<SVGGElement, unknown, HTMLElement, null>) =>
      g.attr('transform', `translate(0,${this.height - this.margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0));

    const y = d3
      .scaleLog()
      .domain([1, d3.max(this.data, (s) => s.value) as number])
      .nice()
      .rangeRound([this.height - this.margin.bottom, this.margin.top]);

    const yAxis = (g: d3.Selection<SVGGElement, unknown, HTMLElement, null>) =>
      g
        .attr('transform', `translate(${this.margin.left},0)`)
        .call(
          d3
            .axisLeft(y)
            .tickFormat((d) => d.valueOf().toString())
            .ticks(2)
        )
        .call((a) => a.select('.domain').remove());

    if (this.svg) {
      this.svg.selectAll('g').remove();
      this.svg.append('g').call(xAxis);
      this.svg.append('g').call(yAxis);

      this.svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('font-size', 11)
        .attr('x', this.width)
        .attr('y', this.height - 5)
        .text('Оценка');

      const bars = this.svg.append('g').selectAll('g').data(this.data).join('g');

      bars
        .append('rect')
        .attr('x', (d) => x(d.mark) as number)
        .attr('y', (d) => y(d.value))
        .attr('width', x.bandwidth())
        .transition()
        .delay(10)
        .attr('height', (d) => y(1) - y(d.value))
        .attr('fill', (d, i) => color[i]);

      bars
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data((d) => [d])
        .join('text')
        .filter((d) => d.value !== 1)
        .text((d) => d.value + '%')
        .attr('dy', '-0.35em')
        .attr('x', (d) => (x(d.mark) as number) + x.bandwidth() / 2)
        .attr('y', (d) => y(d.value));

      bars
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data((d) => [d])
        .join('text')
        .filter((d) => d.count !== 0)
        .text((d) => d.count + 'шт.')
        .attr('dy', '-0.35em')
        .attr('x', (d) => (x(d.mark) as number) + x.bandwidth() / 2)
        .attr('y', () => y(1))
        .clone(true)
        .lower()
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', this.labelPadding);
    }
  }
}
