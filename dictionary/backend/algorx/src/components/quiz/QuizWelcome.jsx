import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function QuizWelcome() {
  return (
    <div className="flex flex-col justify-center gap-6 sm:gap-8">
      <h1 className="font-semibold text-2xl sm:text-3xl text-left sm:text-center px-3 sm:px-0 text-neutral-900">
        Hi, before we get started...{" "}
      </h1>
      <p className="font-medium text-neutral-600 text-left sm:text-center p-3 sm:p-0 max-w-xl">
        We are going to ask questions about your health to best inform our
        practitioners of your journey so far. Our healthcare team will review
        your answers before the consult so they can provide the best care
        possible.
      </p>
      <div className="flex sm:hidden justify-center">
        <div className="flex sm:hidden bg-white rounded-lg p-4 mx-2">
          <div>
            <ShieldCheckIcon
              className="h-5 w-5 text-brand-900 p-0"
              aria-hidden="true"
            />
          </div>
          <p className="ml-4 p-0 text-neutral-700">
            If your treatment isn't approved by our medical experts, we'll
            cancel and refund your order
          </p>
        </div>
      </div>
    </div>
  );
}
