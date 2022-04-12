export interface PaginatedQuery {
  pageIndex: number;
  pageSize: number;
}

export interface QueryResult<T> {
  data: T[];
  paginatedQuery: PaginatedQuery;
  totalSize: number;
}
