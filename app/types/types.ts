export interface ReportedProblem {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string; 
  location: { latitude: number; longitude: number };
  verified: boolean;
}

export default ReportedProblem;

export type RootStackParamList = {
  Dashboard: undefined;
  ProblemDetail: { problemId: number };
};
