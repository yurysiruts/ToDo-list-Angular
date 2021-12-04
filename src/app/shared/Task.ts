export interface Task {
  id?: number;
  addDate?: number;
  progreeDate?: number;
  doneDate?: number;
  taskName: string;
  taskDescription: string;
  status: string;
}