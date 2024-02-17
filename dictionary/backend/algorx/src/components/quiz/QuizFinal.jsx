import { CheckCircleIcon } from "@heroicons/react/24/outline";
// import QuizFinalImg from "../../Assets/images/quizStep19IMG.png";
// import Image from "next/image";

export default function QuizFinal() {
  return (
    <div className="bg-transparent px-6 w-full max-w-5xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        {/* Text Information */}
        <div className="md:flex-grow md:max-w-lg">
          <h1 className="text-3xl font-semibold mb-4">Great news!</h1>
          <p className="text-2xl text-neutral-900 font-semibold leading-relaxed mb-4">
            You've completed the initial screening.
          </p>

          <div className="flex items-center text-brand-900 mb-4">
            {/* Mobile View */}
            <div className="bg-white  rounded-lg p-4 py-3 mb-2 max-w-sm mx-auto block sm:hidden">
              <div className="flex items-start">
                <div className="rounded-full mr-3">
                  <CheckCircleIcon className='h-8 w-8 text-brand-900 p-0'/>
                </div>
                <p className="text-gray-800 mb-2 text-sm">
                  Your screening indicates that medicinal cannabis might be the
                  right choice for your wellness journey.
                </p>
              </div>
            </div>
            {/* Desktop View */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 hidden sm:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>{" "}
            <p className="ml-2 text-neutral-600 font-semibold leading-relaxed hidden sm:block">
              Your screening indicates that medicinal cannabis might be the
              right choice for your wellness journey.
            </p>
          </div>
          <hr className="border-t border-neutral-300 sm:border-neutral-500 my-4" />
          <p className="leading-relaxed text-neutral-600 font-semibold mb-4">
            To ensure personalised care and accuracy, there's a one-time
            consultation fee of{" "}
            <span className="font-bold text-neutral-900">$149</span>. This covers
            a comprehensive review by a 420 Medical GP who will tailor your
            treatment plan and guide you through the application process.
          </p>
          <p className="mb-4 text-neutral-600 font-semibold leading-relaxed">
            Ready to take the next step towards relief and well-being?
          </p>
          {/* Redirect Link Button to Payment Page */}
          <button className="w-[200px] bg-brand-900 text-white mt-9 py-2 px-16 rounded-lg focus:outline-none transition-colors">
            Continue
          </button>
        </div>
        {/* Image */}
        <div className="hidden md:block md:w-1/3 md:ml-10">
          {/* Place your image here */}
          <h2>Image Here!</h2>
        </div>
      </div>
    </div>
  );
}
