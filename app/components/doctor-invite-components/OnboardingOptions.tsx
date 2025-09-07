import { FaRocket, FaLightbulb } from 'react-icons/fa';

interface OnboardingOptionsProps {
  handleQuickStart: () => void;
  handleAssistedEntry: () => void;
  t: (key: string) => string;
}

const OnboardingOptions: React.FC<OnboardingOptionsProps> = ({ 
  handleQuickStart, 
  handleAssistedEntry,
  t
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto mt-10 border border-blue-200"> 
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{t('onboardingOptions.title')}</h2> 
      <div className="grid md:grid-cols-2 gap-4"> 
        <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-white"> 
          <FaRocket className="text-2xl text-blue-600 mb-3" /> 
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('onboardingOptions.quickStart.title')}</h3> 
          <p className="text-gray-600 mb-3 text-sm">{t('onboardingOptions.quickStart.description')}</p> 
          <button 
            onClick={handleQuickStart} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm" 
          > 
            {t('onboardingOptions.quickStart.button')}
          </button> 
        </div> 
        <div className="border-2 border-indigo-200 rounded-xl p-4 hover:border-indigo-400 transition-colors bg-white"> 
          <FaLightbulb className="text-2xl text-indigo-600 mb-3" /> 
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('onboardingOptions.assistedEntry.title')}</h3> 
          <p className="text-gray-600 mb-3 text-sm">{t('onboardingOptions.assistedEntry.description')}</p> 
          <button 
            onClick={handleAssistedEntry} 
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm" 
          > 
            {t('onboardingOptions.assistedEntry.button')}
          </button> 
        </div> 
      </div> 
    </div>
  );
};

export default OnboardingOptions;