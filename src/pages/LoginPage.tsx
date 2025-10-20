import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { IoPersonOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import LOGO from "@/assets/LOGO.png"
import LoginCarousel from "@/assets/LoginCarousel.png"
import LoginCarousel1 from "@/assets/LoginCarousel1.png"
import LoginBackground from "@/assets/LoginBackgroud.jpg"

interface LoginForm {
  userId: string
  password: string
}

interface FormErrors {
  userId?: string
  password?: string
  general?: string
}

{/* ERROR RESOLVED VERCEL DEPLOYMENT */}
const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({
    userId: "",
    password: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  // Carousel images and motivational content
  const carouselContent = [
    {
      image: LoginCarousel,
      title: "Streamline Your Workflow",
      subtitle: "Transform chaos into clarity with intelligent task management"
    },
    {
      image: LoginCarousel1,
      title: "Achieve More Together",
      subtitle: "Collaborate seamlessly and boost team productivity"
    }
  ]

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselContent.length)
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [carouselContent.length])

  // Handle Esc key to clear form
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormData({
          userId: "",
          password: ""
        })
        setErrors({})
        setShowPassword(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'userId':
        if (!value.trim()) {
          return "Username or Email is required"
        }
        return undefined
      
      case 'password':
        if (!value) {
          return "Password is required"
        } else if (value.length < 8) {
          return "Password must be at least 8 characters"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase, and number"
        }
        return undefined
      
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate User ID (Email)
    const userIdError = validateField('userId', formData.userId)
    if (userIdError) {
      newErrors.userId = userIdError
    }

    // Validate Password
    const passwordError = validateField('password', formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Real-time validation
    const fieldError = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Hard-coded authentication credentials
      if (formData.userId === "admin" && formData.password === "Admin123") {
        // Successful login
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userId", formData.userId)
        navigate("/dashboard")
      } else {
        setErrors({
          general: "Invalid Username/Email or Password. Please check your credentials."
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({
        general: "An unexpected error occurred. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-25 p-4 relative overflow-hidden">
        {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${LoginBackground})`
        }}
      ></div>
      
      {/* Background Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Main Card Container */}
      <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Logo positioned at top-left corner of card */}
        <div className="absolute top-6 left-10.5 z-20">
          <img src={LOGO} alt="ERManager Logo" className="h-12 w-auto drop-shadow-lg" />
        </div>
        
        {/* Tagline positioned under logo */}
        <div className="absolute top-20 left-10.5 z-20">
          <p className="text-sm text-gray-500 font-medium">Seamless Ticketing, Smarter Support</p>
      </div>

        <div className="flex min-h-[500px]">
          {/* Left Section - Login Form */}
          <div className="flex-[1.6] p-8 flex flex-col justify-center relative h-[500px]">
            {/* Grey separator line */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>

            {/* Login Header */}
            <div className="mb-8 mt-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-xs text-gray-500 mt-2">Test credentials: admin / Admin123</p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm">
                <p className="text-red-600 text-sm text-center font-medium">{errors.general}</p>
              </div>
            )}
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6 w-[350px] mx-auto">
              {/* Username/Email Input */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoPersonOutline className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="Email address or mobile number"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm font-normal text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                      errors.userId ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-gray-200"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.userId && (
                  <p className="text-xs text-red-600 mt-1">{errors.userId}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoLockClosedOutline className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-2 border rounded-lg text-sm font-normal text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition-all duration-200 bg-gray-50/50 hover:bg-white ${
                      errors.password ? "border-red-300 focus:border-red-400 focus:ring-red-200" : "border-gray-200"
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    ) : (
                      <IoEyeOutline className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>
              
              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            </div>

          {/* Right Section - Image Carousel */}
          <div className="flex-[1.2] bg-white p-8 flex flex-col items-center relative overflow-visible h-[500px]">
            {/* Carousel Container */}
            <div className="w-full flex flex-col items-center justify-between h-full">
              {/* Carousel Images */}
              <div className="relative w-full max-w-sm h-64 overflow-hidden rounded-xl">
                {carouselContent.map((content, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={content.image}
                      alt={`Carousel slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>

              {/* Motivational Content */}
              <div className="text-center w-full max-w-sm relative h-16">
                {carouselContent.map((content, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1500 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{content.title}</h3>
                    <p className="text-gray-600 text-sm leading-tight px-2">{content.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Carousel Slider Bar */}
              <div className="flex items-center gap-2">
                {carouselContent.map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 h-1.5 bg-blue-500 rounded-full'
                        : 'w-1.5 h-1.5 bg-blue-200 rounded-full'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer - Outside the card at bottom of screen */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white">
        ©2025, Designed and Developed by ERManager Consulting Services. All Rights Reserved.
      </div>
    </div>
  )
}

export default LoginPage

