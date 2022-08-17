export interface ClientModel {
  lastName: string;
  name: string;
  middleName?: string;
  date: Date | any;
  phoneNumber: number;
  gender?: string;
  clientGroup: ClientGroup;
  coordinator?: string;
  preventSms: boolean;
}

export enum ClientGroup {
  'Vip Clients',
  'Loyal Clients',
  'New Clients',
}
