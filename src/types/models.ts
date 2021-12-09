export type User = {
  id: number;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
};

export type RunRecord = {
  id: number;
  distance: number;
  time: number;
  date: Date;
  userId: number;
}

export type Image = {
  id: number;
  userId: number;
  link: string;
  key: string;
}