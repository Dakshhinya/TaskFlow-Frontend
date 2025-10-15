import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-8 max-w-3xl">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-6 rounded-full shadow-2xl">
              <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-7xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
            TaskFlow
          </h1>

          <p className="text-2xl text-gray-700 font-light">
            Organize your life, one task at a time
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay on top of your goals with our intuitive task management system.
            Track priorities, manage deadlines, and achieve more every day.
          </p>

          <div className="pt-8">
            <button
              onClick={() => navigate('/login')}
              className="group relative px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">Smart</div>
              <p className="text-gray-600">Intelligent priority management</p>
            </div>
            <div className="p-6 bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">Fast</div>
              <p className="text-gray-600">Quick task creation and updates</p>
            </div>
            <div className="p-6 bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">Simple</div>
              <p className="text-gray-600">Clean and intuitive interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
