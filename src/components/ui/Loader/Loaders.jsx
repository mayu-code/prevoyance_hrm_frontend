export const PulseLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
};

export const BouncingDotsLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export const BarsLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="h-8 w-2 bg-blue-500 animate-pulse"></div>
        <div className="h-8 w-2 bg-blue-500 animate-pulse delay-150"></div>
        <div className="h-8 w-2 bg-blue-500 animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export const RippleLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export const CircularDotsLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative h-12 w-12">
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 right-0 w-3 h-3 bg-blue-500 rounded-full animate-spin delay-150"></div>
        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full animate-spin delay-300"></div>
        <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-500 rounded-full animate-spin delay-450"></div>
      </div>
    </div>
  );
};

export const WaveLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-6 w-2 bg-blue-500 rounded animate-pulse`}
            style={{ animationDelay: `${index * 150}ms` }}
          ></div>
        ))}
      </div>
    </div>
  );
};
