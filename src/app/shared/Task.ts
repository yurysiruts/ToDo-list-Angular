export interface Task {
  id?: string;
  addDate?: number;
  progreeDate?: number;
  doneDate?: number;
  taskName: string;
  taskDescription: string;
  status: string;
}