import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setFormData] = useState({
    email:"",
    password:""
})

const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const {name, value}=e.target;
    setFormData(prev =>({
      ...prev,
      [name] :value
    }))
    
}

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}api/auth/login",
      form
    );

    const { token, username, email, userId } = response.data;
    if (!token || !email || !userId) {
      console.log("Invalid login response");
      return;
    }
    
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ userId, username, email })
    );

    navigate("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 p-4 rounded-full shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to TaskFlow</p>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
