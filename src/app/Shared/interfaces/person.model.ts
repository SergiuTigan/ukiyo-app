export interface IPerson {
  id?: string;
  name: string;
  type: string;
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
  children?: IPerson[];
  checked?: boolean;
  expanded?: boolean;
  isChild?: boolean;
}
