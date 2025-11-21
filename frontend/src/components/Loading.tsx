export default function FreshLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">

      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>

      <div className="absolute top-20 right-20 w-16 h-16 bg-indigo-200 rounded-lg opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>

      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>

      <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-purple-200 rounded-lg opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Spinner container */}
        <div className="relative">

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

          {/* Outer ring */}
          <div className="relative w-24 h-24 rounded-full border-8 border-purple-100 flex items-center justify-center">

            {/* Spinning arc */}
            <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500 border-r-indigo-500 animate-spin"></div>

            {/* Inner circle */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg animate-pulse">
              <div className="w-6 h-6 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Loading
          </h2>

          {/* Progress bar */}
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: "70%" }}></div>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-2">
            <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50"></div>
    </div>
  );
}
