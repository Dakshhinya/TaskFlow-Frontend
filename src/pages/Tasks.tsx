import { useState, useEffect } from 'react';
import { CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { Task } from '../components/TaskModal';
import { updateAllTasksStatus } from '../utils/taskStatus';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'in-progress' | 'completed' | 'overdue'>('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(updateAllTasksStatus(parsedTasks));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => updateAllTasksStatus(prevTasks));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleComplete = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const getFilteredTasks = () => {
    if (activeTab === 'all') return tasks;
    return tasks.filter((task) => task.status === activeTab);
  };

  const filteredTasks = getFilteredTasks();

  const tabs = [
    { id: 'all', label: 'All Tasks', icon: null, count: tasks.length },
    { id: 'upcoming', label: 'Upcoming', icon: TrendingUp, count: tasks.filter((t) => t.status === 'upcoming').length },
    { id: 'in-progress', label: 'In Progress', icon: Clock, count: tasks.filter((t) => t.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: tasks.filter((t) => t.status === 'completed').length },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: tasks.filter((t) => t.status === 'overdue').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-2">
            All Tasks
          </h1>
          <p className="text-gray-600 text-lg">Manage and track all your tasks in one place</p>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-yellow-100'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-white bg-opacity-30' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  showCompleteButton={task.status !== 'completed'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-6 rounded-full">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No tasks found</h3>
              <p className="text-gray-500">
                {activeTab === 'all'
                  ? 'Create your first task to get started!'
                  : `No ${activeTab.replace('-', ' ')} tasks at the moment.`}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Tasks</h3>
            <p className="text-4xl font-bold text-yellow-600">{tasks.length}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">In Progress</h3>
            <p className="text-4xl font-bold text-blue-600">
              {tasks.filter((t) => t.status === 'in-progress').length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Completed</h3>
            <p className="text-4xl font-bold text-green-600">
              {tasks.filter((t) => t.status === 'completed').length}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Overdue</h3>
            <p className="text-4xl font-bold text-red-600">
              {tasks.filter((t) => t.status === 'overdue').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
