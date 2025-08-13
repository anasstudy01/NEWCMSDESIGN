import React from 'react';

const ReferEarn: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">Refer & Earn</h3>
          <p className="text-sm text-gray-600 mt-1">Share and get rewarded</p>
        </div>
        
        {/* Content with Scroll */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-500">
              Invite your friends to join our platform and earn rewards for
              each successful referral.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value="https://demo.newcmsdesign.com/referral/abc123"
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition whitespace-nowrap"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://demo.newcmsdesign.com/referral/abc123"
                  );
                }}
              >
                Copy
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-1 text-sm flex-1 min-w-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.09c0 .34.04.67.1.99C8.09 8.9 4.84 7.13 2.67 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.12 2.94 3.99 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.29-.04-1.92-.12A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" />
                </svg>
                <span className="hidden sm:inline">Twitter</span>
              </button>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-1 text-sm flex-1 min-w-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
                </svg>
                <span className="hidden sm:inline">Facebook</span>
              </button>

              <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-1 text-sm flex-1 min-w-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.346 3.678 1.327c-.98.98-1.196 2.093-1.255 3.374C2.013 5.741 2 6.151 2 12c0 5.849.013 6.259.072 7.539.059 1.281.275 2.394 1.255 3.374.98.98 2.093 1.196 3.374 1.255C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.394-.275 3.374-1.255.98-.98 1.196-2.093 1.255-3.374.059-1.28.072-1.69.072-7.539 0-5.849-.013-6.259-.072-7.539-.059-1.281-.275-2.394-1.255-3.374-.98-.98-2.093-1.196-3.374-1.255C15.668.013 15.259 0 12 0z" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </button>

              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-1 text-sm flex-1 min-w-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;
