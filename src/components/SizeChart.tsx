import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface SizeChartModalProps {
  onClose: () => void
}

export default function SizeChart({ onClose}: SizeChartModalProps) {
  const modal = (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 pr-16">{title}</h2> */}
          
          <div className="flex justify-center">
            <img
              src="/images/sizeChart.jpg"
              alt="Size Chart"
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}