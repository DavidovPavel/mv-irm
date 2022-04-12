export type NumberItem = {
  id: number;
  name: string;
};

export type StringItem = {
  id: string;
  name: string;
};

export type BaseItem = NumberItem | StringItem;

export type baseItem<T extends number | string> = T extends number ? NumberItem : StringItem;
