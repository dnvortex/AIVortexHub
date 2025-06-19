import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rememberMe: false
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/login", data);
      toast({
        title: "Login successful!",
        description: "Welcome back to DN VORTEX.",
        variant: "default",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-md mx-auto glass-card rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Link href="/">
              <a className="inline-flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-xl font-bold">DN</span>
                </div>
                <span className="ml-2 text-xl font-inter font-bold">VORTEX</span>
              </a>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input 
                type="text" 
                id="username"
                className={`w-full bg-darkBg border ${errors.username ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-sm text-secondary hover:text-secondary-light">Forgot password?</a>
              </div>
              <input 
                type="password" 
                id="password"
                className={`w-full bg-darkBg border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            
            <div className="flex items-center mb-6">
              <input 
                type="checkbox" 
                id="rememberMe" 
                className="h-4 w-4 rounded border-gray-700 bg-darkBg text-primary focus:ring-primary"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">Remember me</label>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-medium flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span>Signing in...</span>
                  <i className="fas fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-secondary hover:text-secondary-light">Sign up</a>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
