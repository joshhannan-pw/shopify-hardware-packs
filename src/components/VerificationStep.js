import React from 'react';

const VerificationStep = ({ products, onBack, onContinue }) => {
  const handleContinue = (e) => {
    e.preventDefault();
    console.log('Continue button clicked');
    onContinue();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Verify Products</h2>
      
      <div className="space-y-4 mb-6">
        {products.map((item, index) => (
          <div 
            key={index}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">
                  Serial Number: {item.serialNumber}
                </p>
                <p className="text-gray-600">
                  Product: {item.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.product.description}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                item.product.status === 'Valid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.product.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
        >
          Back to Editing
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Continue to Shipping
        </button>
      </div>
    </div>
  );
};

export default VerificationStep;
