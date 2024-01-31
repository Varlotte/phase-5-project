export type Condition = {
  id: number;
  name: string;
  description: string;
};

export type Medication = {
  id: number;
  nameBrand: string;
  nameGeneric: string;
  class: string;
  prescribedFor: string;
  sideEffects: string;
  image: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  favedMedications: Medication[];
};

/** Current user ID, used with CurrentUserContext */
export type CurrentUser = {
  currentUser: number | null;
  setCurrentUser: (id: number | null) => void;
};
