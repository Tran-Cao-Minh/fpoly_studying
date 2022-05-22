export interface Task {
  id: number;
  name: string;
  description: string;
  projectId: number;
  employeeId: number;
  priority: number;
  status: number;
}
