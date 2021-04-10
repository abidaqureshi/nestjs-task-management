import { TaskStatus } from "../enum/task-status.enum";

export class FilterTaskDto {
  status: TaskStatus;
  search: string;
}
