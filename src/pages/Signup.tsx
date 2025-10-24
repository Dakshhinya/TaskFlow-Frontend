import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setFormData] = useState({username:'', email:'', password:''})

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setFormData(prev =>({
      ...prev,
      [name] :value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await axios.post(
        'http://localhost:3000/api/auth/signup',form
      );
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify({ username:form.username, email:form.email }));
      navigate('/login')
    }
    catch(err){
      console.log("Err in signup", err);
    }
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-4 rounded-full shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join TaskFlow to start organizing your tasks</p>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  type="text"
                  name= "username"
                  value={form.username}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none transition-colors bg-white"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
