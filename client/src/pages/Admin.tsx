import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

// Define the form schema for courses
const courseFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  level: z.string({
    required_error: "Please select a difficulty level.",
  }),
  duration: z.string().min(2, {
    message: "Please provide the course duration.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the image.",
  }).optional().or(z.literal('')),
  tags: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Admin dashboard component
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Admin credentials
  const ADMIN_EMAIL = "dnvortexai@gmail.com";
  const ADMIN_PASSWORD = "Divine kislon";

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  // Define course type
  interface Course {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    price: number;
    imageUrl: string | null;
    tags: string[] | null;
    enrolledCount: number;
    rating: number;
  }

  // Fetch courses
  const { data: courses = [], isLoading: coursesLoading, refetch: refetchCourses } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    enabled: isLoggedIn
  });

  // Create course mutation
  const { mutate: createCourse, isPending: isCreatingCourse } = useMutation({
    mutationFn: async (course: CourseFormValues) => {
      const processedCourse = {
        ...course,
        // Convert comma-separated tags to array
        tags: course.tags ? course.tags.split(',').map(tag => tag.trim()) : []
      };
      
      return apiRequest('POST', '/api/courses', processedCourse);
    },
    onSuccess: () => {
      toast({
        title: "Course created",
        description: "The course has been successfully created",
      });
      // Reset form and refetch courses
      form.reset();
      // Invalidate the courses query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/courses'] });
    },
    onError: (error) => {
      toast({
        title: "Error creating course",
        description: error.message || "There was a problem creating the course",
        variant: "destructive",
      });
    },
  });

  // Initialize form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "Beginner",
      duration: "",
      price: 0,
      imageUrl: "",
      tags: "",
    },
  });

  // Form submission handler
  const onSubmit = (values: CourseFormValues) => {
    createCourse(values);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 bg-darkBg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto glass-card p-8 rounded-xl"
          >
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // Admin dashboard UI
  return (
    <div className="min-h-screen pt-20 bg-darkBg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="add-course">Add Course</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>
                    View and manage all available courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {coursesLoading ? (
                    <div className="text-center py-10">Loading courses...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course) => (
                        <Card key={course.id} className="overflow-hidden border border-gray-700">
                          {course.imageUrl && (
                            <div className="h-48 overflow-hidden">
                              <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          )}
                          <CardHeader className="p-4">
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <div className="flex items-center text-sm text-gray-400 space-x-4">
                              <span>{course.level}</span>
                              <span>•</span>
                              <span>{course.duration}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-gray-300 text-sm line-clamp-3">
                              {course.description}
                            </p>
                            {course.tags && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {course.tags.map((tag: string, index: number) => (
                                  <span
                                    key={index}
                                    className="bg-primary/10 text-primary-foreground px-2 py-1 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <span className="font-semibold">${course.price}</span>
                            <span className="text-xs text-gray-400">
                              {course.enrolledCount || 0} enrolled
                            </span>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add-course">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Course</CardTitle>
                  <CardDescription>
                    Create a new course for the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Course title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Difficulty Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select difficulty level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 8 weeks" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price ($)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Tags</FormLabel>
                              <FormControl>
                                <Input placeholder="React, Node.js, Firebase (comma separated)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Course description"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={isCreatingCourse}
                          className="bg-primary hover:bg-primary-dark"
                        >
                          {isCreatingCourse ? "Creating..." : "Create Course"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;