import { useState } from 'react';
import { X, Calendar, Clock, Flag } from 'lucide-react';
import axios from 'axios';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export interface Task {
  taskId?: string;
  taskname: string;
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'overdue';
  createdAt?: string;
}

const TaskModal = ({ isOpen, onClose, onSave }: TaskModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     const token = localStorage.getItem("token");
      if (!token) {
      alert("Please login first!");
      return;
  }
    const newTask: Task = {
      taskname: taskName,
      priority,
      startDate,
      startTime,
      endDate,
      endTime,
      status: 'upcoming', 

      
    };

     
     try{
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task/create`,
        {
          taskname: newTask.taskname,
          priority: newTask.priority,
          start_date: newTask.startDate,
          start_time: newTask.startTime,
          end_date: newTask.endDate,
          end_time: newTask.endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Task created:", res.data);

       onSave({
    taskId: res.data.taskid,  
  taskname: res.data.taskname,
  priority: res.data.priority,
  startDate: res.data.start_date,
  startTime: res.data.start_time,
  endDate: res.data.end_date,
  endTime: res.data.end_time,
  status: "upcoming",
});
    resetForm();
      // navigate('/dasboard')
    }
    catch(err:any){
      console.error("Task creation failed:", err.response?.data || err.message);
    }
   
  };
  const resetForm = () => {
    setTaskName('');
    setPriority('medium');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Task</h2>
          <button
            onClick={resetForm}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
              placeholder="Enter task name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Flag className="w-4 h-4 inline mr-1" />
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPriority('low')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  priority === 'low'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300'
                }`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setPriority('medium')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  priority === 'medium'
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-300'
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority('high')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  priority === 'high'
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
                }`}
              >
                High
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Deadline Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Deadline Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

