import { Task } from '../components/TaskModal';

export const updateTaskStatus = (task: Task): Task => {
  if (task.status === 'completed') {
    return task;
  }

  const now = new Date();
  const startDateTime = new Date(`${task.startDate}T${task.startTime}`);
  const deadlineDateTime = new Date(`${task.deadlineDate}T${task.deadlineTime}`);

  let newStatus: Task['status'] = 'upcoming';

  if (now > deadlineDateTime) {
    newStatus = 'overdue';
  } else if (now >= startDateTime && now <= deadlineDateTime) {
    newStatus = 'in-progress';
  } else if (now < startDateTime) {
    newStatus = 'upcoming';
  }

  return { ...task, status: newStatus };
};

export const updateTasksStatus = (tasks: Task[]): Task[] => {
  return tasks.map(updateTaskStatus);
};
