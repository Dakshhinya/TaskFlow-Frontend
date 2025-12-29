import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Task } from '../components/TaskModal';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    // const token = localStorage.getItem()/
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter((t) => t.status === 'overdue').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 text-lg">Manage your account and view your productivity stats</p>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-6 rounded-full shadow-lg">
                <User className="w-20 h-20 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name || 'User'}</h2>
                <p className="text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-semibold">Member Since</h3>
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-semibold">Total Tasks</h3>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-amber-500" />
              Productivity Statistics
            </h2>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-semibold">Completion Rate</span>
                <span className="text-2xl font-bold text-amber-600">{completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border-2 border-green-200 text-center">
                <p className="text-3xl font-bold text-green-600 mb-1">{completedTasks}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border-2 border-blue-200 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">{inProgressTasks}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 border-2 border-red-200 text-center">
                <p className="text-3xl font-bold text-red-600 mb-1">{overdueTasks}</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-4 border-2 border-yellow-200 text-center">
                <p className="text-3xl font-bold text-yellow-600 mb-1">
                  {tasks.filter((t) => t.status === 'upcoming').length}
                </p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Keep Up the Great Work!</h3>
            <p className="text-gray-700 text-lg">
              You're doing amazing! Continue tracking your tasks and watch your productivity soar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
