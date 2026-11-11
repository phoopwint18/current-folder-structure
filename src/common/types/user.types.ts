export type NamedValue = {
  name?: string | null;
};

export type UserTownship = {
  name?: string | null;
  division?: NamedValue | null;
};

export type User = {
  id?: string | number;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  name?: string | null;
  employeeNumber?: string | null;
  profileUrl?: string | null;
  image?: string | null;
  imgUrl?: string | null;
  position?: string | null;
  rank?: string | null;
  employmentType?: string | null;
  workLocation?: string | null;
  workRegion?: string | null;
  team?: string | null;
  joinedDate?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  address1?: string | null;
  phoneNumber?: string | null;
  phone?: string | null;
  contactNumber?: string | null;
  township?: UserTownship | null;
};
