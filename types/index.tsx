export type makeObj = {
  Make_ID: number;
  Model_Name: string;
  Model_ID: number;
};

export type makeListObj = {
  Make_ID: number;
  Make_Name: string;
};

export type myData = {
  count: number;
  Message: string;
  Results: makeListObj[];
};

export type FormEvent = React.FormEvent<HTMLFormElement>;

export type stringOrNull = string | null;
