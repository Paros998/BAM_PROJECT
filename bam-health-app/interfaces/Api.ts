export interface UserModel {
  userId: string;
  username: string;
  enabled: boolean;
  role: UserRole;
}

export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export interface User extends UserModel, UserCredentials {}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface DoctorModel {
  doctorId: string;
  fullName: string;
  specialization: string;
  yearsOfExperience: number;
  age: number;
  assignedPatients: number;
  assignedPatientIds: string[];
}

export interface AssignedDoctorResponse {
  doctor?: DoctorModel;
}

export interface PatientTestResponse {
  id: string;
  patientId: string;
  testDate: string;
  type: TestType;
  note: string;
  beatsPerMinute?: number[];
  diabetesLevelCases?: number[];
  bloodPressures?: BloodPressure[];
}

export type TestType = "PULSE" | "DIABETES" | "BLOOD_PRESSURE";

export interface BloodPressure {
  bloodPressureOn: number;
  bloodPressureTo: number;
  testOrder: number;
}
