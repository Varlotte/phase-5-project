export type Condition = {
  id: number;
  name: string;
  description: string;
};

export type Medication = {
  id: number;
  nameBrand: string;
  nameGeneric: string;
  drugClass: string;
  prescribedFor: string;
  sideEffects: string;
  image: string;
};

export type Fave = {
  favedOn: Date;
  medication: Medication;
};

export type User = {
  uid: string;
  name: string;
  email: string;
  faves: Fave[];
};
