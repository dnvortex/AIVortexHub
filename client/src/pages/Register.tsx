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
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptTerms: false
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = data;
    
    try {
      await apiRequest("POST", "/api/register", userData);
      toast({
        title: "Registration successful!",
        description: "Welcome to DN VORTEX. You can now log in.",
        variant: "default",
      });
      setLocation("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "This username or email might already be taken. Please try again.",
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
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-400">Join DN VORTEX to start your AI journey</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                className={`w-full bg-darkBg border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter your full name"
                {...register("fullName")}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input 
                type="text" 
                id="username"
                className={`w-full bg-darkBg border ${errors.username ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Choose a username"
                {...register("username")}
              />
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                className={`w-full bg-darkBg border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="your.email@example.com"
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input 
                type="password" 
                id="password"
                className={`w-full bg-darkBg border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Create a password"
                {...register("password")}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                className={`w-full bg-darkBg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="flex items-center mb-6">
              <input 
                type="checkbox" 
                id="acceptTerms" 
                className="h-4 w-4 rounded border-gray-700 bg-darkBg text-primary focus:ring-primary"
                {...register("acceptTerms")}
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="#" className="text-secondary hover:text-secondary-light">Terms of Service</a> and <a href="#" className="text-secondary hover:text-secondary-light">Privacy Policy</a>
              </label>
              {errors.acceptTerms && <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-white font-medium flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span>Creating account...</span>
                  <i className="fas fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <i className="fas fa-user-plus"></i>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-secondary hover:text-secondary-light">Sign in</a>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
