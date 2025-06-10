const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-gray-800 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin-reverse"></div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide opacity-5 animate-fadeIn">
            <span className="text-indigo-600">Tally</span>
            <span className="text-gray-700">Inventory</span>
          </h1>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1.8s ease forwards;
        }
      `}</style>
    </>
  );
};

export default Loading;
