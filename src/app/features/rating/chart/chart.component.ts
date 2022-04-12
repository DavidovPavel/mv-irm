import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { MetricResponse } from '@app/features/dashboard/state/models/metrics-response.interface';
import * as d3 from 'd3';

import { RatingService, WeekData } from './../rating.service';

export const WEEK_COUNT = 4;

@Component({
  selector: 'app-chart',
  template: '',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  labelPadding = 6;
  width = 300;
  height = 140;
  margin = { top: 25, right: 30, bottom: 35, left: 30 };
  legend = {
    height: 10,
    labelPadding: 10,
  };

  columns = ['CSI', 'Инциденты', 'Возвраты'];
  colors = ['#25af4e', '#fff200', '#e82020'];
  series: { column: string; week: number; value: number }[][] = [];

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, null> | null = null;

  citySubscribtion!: Subscription;

  @HostBinding('id') idValue = `chart${Date.now()}`;

  @Input() metrics!: MetricResponse[];

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
    const value = this.getWeekData(city);
    if (value.length) {
      this.series = this.columns.map((column) => value.map((a) => ({ column, week: a.week, value: a[column] })));
      if (!this.svg) {
        this.initChart();
      }
      this.drawChart(value);
    }
  }

  getWeekData(city: string): WeekData[] {
    if (city) {
      return this.metrics
        .filter((a) => a.city === city)
        .map((a) => ({
          week: a.weekNumber,
          CSI: a.weekCsiPerCity || 1,
          Инциденты: a.weekIncPerCity || 1,
          Возвраты: a.weekRetPerCity || 1,
        }))
        .sort((a, b) => b.week - a.week)
        .slice(0, WEEK_COUNT)
        .reverse();
    } else {
      const first = this.metrics[0];
      if (first) {
        city = first.city;
        return this.metrics
          .filter((a) => a.city === city)
          .map((a) => ({
            week: a.weekNumber,
            CSI: a.weekCsiPerCompany || 1,
            Инциденты: a.weekIncPerCompany || 1,
            Возвраты: a.weekRetPerCompany || 1,
          }))
          .sort((a, b) => b.week - a.week)
          .slice(0, WEEK_COUNT)
          .reverse();
      } else {
        return [];
      }
    }
  }

  initChart(): void {
    this.svg = d3
      .select(`app-chart#${this.idValue}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.append('text').attr('font-weight', 'bold').attr('font-size', 13).attr('x', 10).attr('y', 10).text('%');

    this.columns.forEach((_, i) => {
      if (this.svg) {
        const opt = [0, 50, 70];
        const left = this.width / 2 - opt.reduce((p, c) => p + c, 0) / 2 - this.legend.labelPadding * opt.length;

        this.svg
          .append('circle')
          .attr('cx', opt[i] * i + left)
          .attr('cy', this.height - this.legend.height)
          .attr('r', 4)
          .style('fill', this.colors[i]);

        this.svg
          .append('text')
          .attr('x', opt[i] * i + left + this.legend.labelPadding)
          .attr('y', this.height - this.legend.height)
          .text(this.columns[i])
          .style('font-size', 11)
          .attr('alignment-baseline', 'middle');
      }
    });
  }

  drawChart(data: WeekData[]): void {
    const line = d3
      .line()
      .x((d: unknown) => x((d as WeekData).week))
      .y((d: unknown) => y((d as WeekData).value));

    const x = d3
      .scaleLinear()
      .domain([data[0].week, data[data.length - 1].week])
      .range([this.margin.left, this.width - this.margin.right]);

    const xAxis = (g: d3.Selection<SVGGElement, unknown, HTMLElement, null>) =>
      g.attr('transform', `translate(0,${this.height - this.margin.bottom - this.legend.height})`).call(
        d3
          .axisBottom(x)
          .ticks(WEEK_COUNT)
          .tickFormat((d) => 'W' + d)
      );

    const y = d3
      .scaleLog()
      .domain([1, d3.max(this.series, (s) => d3.max(s, (d) => d.value)) as number])
      .range([this.height - this.margin.bottom - this.legend.height, this.margin.top]);

    const z = d3.scaleOrdinal(this.columns, this.colors);

    if (this.svg) {
      this.svg.selectAll('g').remove();
      this.svg.append('g').call(xAxis);

      const serie = this.svg.append('g').selectAll('g').data(this.series).join('g');

      serie
        .append('path')
        .transition()
        .delay(50)
        .ease(d3.easeLinear)
        .attr('fill', 'none')
        .attr('stroke', (d) => z(d[0].column))
        .attr('stroke-width', 1.5)
        .attr('d', (line as unknown) as string);

      serie
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data((d) => d)
        .join('text')
        .text((d) => (d.value === 1 ? 0 : d.value) + '%')
        .attr('dy', '0.35em')
        .attr('x', (d) => x(d.week))
        .attr('y', (d) => y(d.value))
        .clone(true)
        .lower()
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', this.labelPadding);
    }
  }
}
