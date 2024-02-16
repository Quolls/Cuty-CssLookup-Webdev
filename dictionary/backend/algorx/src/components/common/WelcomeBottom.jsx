import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function WelcomeBottom() {
  return (
    <div className="absolute bottom-[10rem] sm:bottom-[168px] w-[625px] hidden lg:flex justify-center items-center p-2 bg-white rounded-lg">
      <ShieldCheckIcon className="h-5 w-5 text-brand-900" aria-hidden="true" />
      <p className="ml-4 text-neutral-700 mb-0">
        If your treatment isn't approved by our medical experts, we'll cancel
        and refund your order
      </p>
    </div>
  );
}
