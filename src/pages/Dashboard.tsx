import { useState, useEffect } from 'react';
import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import TaskModal, { Task } from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import { updateTaskStatus, updateAllTasksStatus } from '../utils/taskStatus';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState('User');



  useEffect(()=>{

    const fetchTask=async()=>{
      try{
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')?.replace(/"/g, '');

        if(storedUser){
          const user = JSON.parse(storedUser)
          setUserName(user.name || 'User')
        }

        if(!token){
          console.error("No token found");
          return;
        }
console.log("Token from localStorage:", token);

        const response = await axios.get("${import.meta.env.VITE_API_URL}/api/task/list", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
console.log("TOKEN SENT:", token);

        const fetchedData = response.data.tasks
        console.log("Fetched tasks: ", fetchedData)

        setTasks(updateAllTasksStatus(fetchedData))
      }catch (error){
        console.log("Error fetching tasks: ", error)
      }
    }
    fetchTask();
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => updateAllTasksStatus(prevTasks));
    }, 60000);

    return () => clearInterval(interval);
  }, []);



  const handleSaveTask = (newTask: Task) => {
    const updatedTask = updateTaskStatus(newTask);
    const updatedTasks = [...tasks, updatedTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (taskId: string) => {
    const updatedTask = tasks.map(task =>
      task.taskId === taskId ? {...task, status: "completed"} :task
    )
    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask))
  };

  const upcomingTasks = tasks.filter((task) => task.status === 'upcoming');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const overdueTasks = tasks.filter((task) => task.status === 'overdue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">{userName}</span>!
          </h1>
          <p className="text-gray-600 text-lg">Here's your task overview for today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">In Progress</h3>
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-4xl font-bold text-blue-600">{inProgressTasks.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Completed</h3>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-4xl font-bold text-green-600">{completedTasks.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Upcoming</h3>
              <TrendingUp className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-4xl font-bold text-yellow-600">{upcomingTasks.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-semibold">Overdue</h3>
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-4xl font-bold text-red-600">{overdueTasks.length}</p>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Task</span>
          </button>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-amber-500" />
            Upcoming Tasks
          </h2>

          {upcomingTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTasks.map((task) => (
                <TaskCard key={task.taskId} task={task} onToggleComplete={handleToggleComplete} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No upcoming tasks. Create one to get started!</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Tasks In Progress ({inProgressTasks.length})
            </h3>
            {inProgressTasks.length > 0 ? (
              <div className="space-y-4">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.taskId} task={task} onToggleComplete={handleToggleComplete} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tasks in progress</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Overdue Tasks ({overdueTasks.length})
            </h3>
            {overdueTasks.length > 0 ? (
              <div className="space-y-4">
                {overdueTasks.map((task) => (
                  <TaskCard key={task.taskId} task={task} onToggleComplete={handleToggleComplete} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No overdue tasks</p>
            )}
          </div>
        </div>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} />
    </div>
  );
};

export default Dashboard;
