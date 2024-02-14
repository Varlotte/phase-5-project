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

/** User info from db. This is different than the User we get from Firebase. */
export type User = {
  uid: string;
  name: string;
  email: string;
  faves: Fave[];
};
