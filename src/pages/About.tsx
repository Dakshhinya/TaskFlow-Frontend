import Navbar from '../components/Navbar';
import { CheckCircle2, Target, Zap, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-6 rounded-full shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-4">
              About TaskFlow
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your personal productivity companion designed to help you achieve more every day
            </p>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              TaskFlow was created with a simple yet powerful vision: to make task management effortless and enjoyable.
              We believe that staying organized shouldn't be complicated. That's why we've built an intuitive platform
              that helps you focus on what matters most—getting things done.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're managing personal projects, work tasks, or daily errands, TaskFlow provides the tools
              you need to stay on track and achieve your goals with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-3 rounded-xl w-fit mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Priority Management</h3>
              <p className="text-gray-600">
                Organize tasks by priority levels and let our intelligent system help you focus on what needs your
                attention first.
              </p>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-3 rounded-xl w-fit mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Status Updates</h3>
              <p className="text-gray-600">
                Tasks automatically update their status based on start times and deadlines, keeping you informed
                without manual intervention.
              </p>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-3 rounded-xl w-fit mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">User-Friendly Interface</h3>
              <p className="text-gray-600">
                Clean, modern design that makes task management a breeze. No clutter, no confusion—just pure
                productivity.
              </p>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-3 rounded-xl w-fit mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Built with Care</h3>
              <p className="text-gray-600">
                Every feature is thoughtfully designed to enhance your productivity and make your day more manageable
                and less stressful.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TaskFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">Simple</div>
                <p className="text-gray-700">Intuitive interface that anyone can use</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">Efficient</div>
                <p className="text-gray-700">Save time with automated status tracking</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">Reliable</div>
                <p className="text-gray-700">Your tasks, always secure and accessible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
