import { MatPaginatorIntl } from '@angular/material/paginator';

export function GetRussianPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page, pageSize, length) =>
    `${Math.min(1 + pageSize * page, length)} - ${Math.min(pageSize * (page + 1), length)} из ${length}`;
  paginatorIntl.itemsPerPageLabel = 'Элементов на странице: ';
  paginatorIntl.previousPageLabel = 'Предыдущая страница';
  paginatorIntl.nextPageLabel = 'Следующая страница';

  return paginatorIntl;
}
