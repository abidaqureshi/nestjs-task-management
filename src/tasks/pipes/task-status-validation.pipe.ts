import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { TaskStatus } from '../enum/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowStatuses = [
      TaskStatus.IN_PROGRESS,
      TaskStatus.OPEN,
      TaskStatus.DONE,
    ];

    transform(value: any, metaData: ArgumentMetadata) {
        console.log(value, metaData);
        value = value.toUpperCase();
        if (!this.isValidStatus(value)) {
        throw new BadRequestException(`"${value}" invalid status`);
        }
        return value;
    }

    private isValidStatus(status: any): boolean {
        const id = this.allowStatuses.indexOf(status);

        return id !== -1;
    }
}
