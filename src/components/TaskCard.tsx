import { Calendar, Clock, Flag, CheckCircle } from 'lucide-react';
import { Task } from './TaskModal';

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  showCompleteButton?: boolean;
}

const TaskCard = ({ task, onToggleComplete, showCompleteButton = true }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border-2 border-amber-100">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{task.taskname}</h3>
        {showCompleteButton && task.status !== 'completed' && (
          <button
            onClick={() => onToggleComplete?.(task.taskId!)}
            className="ml-2 p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors duration-300"
            title="Mark as completed"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getPriorityColor(task.priority)}`}>
          <Flag className="w-3 h-3 inline mr-1" />
          {task.priority.toUpperCase()}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-amber-500" />
          <span className="font-medium">Start:</span>
          <span className="ml-2">{task.startDate} at {task.startTime}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-amber-500" />
          <span className="font-medium">End:</span>
          <span className="ml-2">{task.endDate} at {task.endTime}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
