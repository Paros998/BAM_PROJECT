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

export interface PatientModel {
  patientId: string;
  fullName: string;
  phoneNumber: string;
  nationalId: number;
  age: number;
}

export interface AssignedPatient extends PatientModel {
  patientTests: PatientTestResponse[];
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

export interface TestRequest {
  patientId: string;
  dateOfTest?: string;
}

export interface AddPulseTestRequest extends TestRequest {
  beatsPerMinute: number[];
}

export interface AddDiabetesTestRequest extends TestRequest {
  diabetesLevelCases: number[];
}

export interface AddBloodPressureTestRequest extends TestRequest {
  bloodPressuresCases: BloodPressure[];
}
