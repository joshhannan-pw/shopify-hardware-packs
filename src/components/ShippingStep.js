import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { states } from '../utils/states';

const ShippingStep = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600" />
        </div>
      </div>

      {/* Company Name (Optional) */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name (Optional)
        </label>
        <Field
          type="text"
          id="companyName"
          name="companyName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>

      {/* Address Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
            Street Address <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            id="streetAddress"
            name="streetAddress"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <ErrorMessage name="streetAddress" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        <div>
          <label htmlFor="streetAddress2" className="block text-sm font-medium text-gray-700">
            Street Address 2 (Optional)
          </label>
          <Field
            type="text"
            id="streetAddress2"
            name="streetAddress2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            id="city"
            name="city"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State <span className="text-red-500">*</span>
          </label>
          <Field
            as="select"
            id="state"
            name="state"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="">Select a state</option>
            {states.map(state => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="state" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <Field
            type="text"
            id="zipCode"
            name="zipCode"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
          <ErrorMessage name="zipCode" component="div" className="mt-1 text-sm text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default ShippingStep;
