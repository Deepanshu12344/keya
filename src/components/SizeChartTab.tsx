import { useState } from 'react';
import SizeChart from './SizeChart';

const QuickFinderTab = () => {
  const [showQuickFinder, setShowQuickFinder] = useState(false);

  return (
    <>
      {/* Floating vertical tab button */}
      <div className="fixed right-0 top-2/3 transform -translate-y-1/2 z-[9999]">
        <div
          onClick={() => setShowQuickFinder(true)}
          className="bg-yellow-400 text-black w-12 h-40 rounded-l-lg shadow-lg cursor-pointer hover:bg-yellow-300 transition-colors flex items-center justify-center"
        >
          <div className="-rotate-90 text-sm font-semibold whitespace-nowrap">
            Size Chart
          </div>
        </div>
      </div>

      {/* Modal component */}
      {showQuickFinder && (
        <SizeChart onClose={() => setShowQuickFinder(false)} />
      )}
    </>
  );
};

export default QuickFinderTab;
