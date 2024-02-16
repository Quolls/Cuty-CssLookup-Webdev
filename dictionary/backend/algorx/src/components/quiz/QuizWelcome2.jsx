import { usePatientQuizFlow } from '../../lib/store/patientquizflow';

const QuizWelcome2 = () => {
  const { firstName } = usePatientQuizFlow();

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0 gap-4">
      <h1 className="text-3xl font-semibold mb-4 text-left sm:text-center">
        Welcome {firstName} !
      </h1>
      <p className="mb-8 text-left sm:text-center max-w-2xl text-neutral-900 sm:text-neutral-600 text-2xl font-semibold">
        Let’s get started! We are going to ask you some questions about your
        health and lifestyle to help us determine the customised treatment for
        you.
      </p>
    </div>
  );
};

export default QuizWelcome2;
