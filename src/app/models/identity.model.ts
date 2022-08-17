export interface IdentityModel {
  docType: DocumentType;
  series?: string;
  number: number;
  issuedBy: string;
  dateOfIssue: Date | any;
  file: string;
}

export enum DocumentType {
  passport,
  birthCertificate,
  drivingLicense,
}
