interface RegistrationOptionProps {
  handleQuickStart: () => void;
}

const RegistrationOption: React.FC<RegistrationOptionProps> = ({ handleQuickStart }) => {
  return (
    <div>
      <p className="text-blue-800 text-sm mb-4">
        Ready to complete your registration? Click below to start the process.
      </p>
      <button
        onClick={handleQuickStart}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Start Registration
      </button>
    </div>
  );
};

export default RegistrationOption;