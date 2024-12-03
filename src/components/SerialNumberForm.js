import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import VerificationStep from './VerificationStep';
import ShippingStep from './ShippingStep';

const SerialNumberForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [serialProducts, setSerialProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedValues, setSavedValues] = useState({
    serialNumbers: ['']
  });

  const serialNumberSchema = Yup.object({
    serialNumbers: Yup.array()
      .of(
        Yup.string()
          .matches(/^[A-Z0-9]{2}-[A-Z0-9]{6}$/, 'Must be format XX-XXXXXX')
          .required('Required')
      )
      .min(1, 'At least one serial number is required')
  });

  const shippingSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    firstName: Yup.string()
      .required('First name is required')
      .max(50, 'First name must be 50 characters or less')
      .matches(/^[A-Za-z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    lastName: Yup.string()
      .required('Last name is required')
      .max(50, 'Last name must be 50 characters or less')
      .matches(/^[A-Za-z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
    companyName: Yup.string()
      .max(100, 'Company name must be 100 characters or less'),
    streetAddress: Yup.string()
      .required('Street address is required')
      .max(100, 'Street address must be 100 characters or less'),
    streetAddress2: Yup.string()
      .max(100, 'Street address 2 must be 100 characters or less'),
    city: Yup.string()
      .required('City is required')
      .max(50, 'City must be 50 characters or less')
      .matches(/^[A-Za-z\s-']+$/, 'City can only contain letters, spaces, hyphens, and apostrophes'),
    state: Yup.string()
      .required('State is required'),
    zipCode: Yup.string()
      .required('ZIP code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'ZIP code must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)')
  });

  const getCurrentValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return serialNumberSchema;
      case 3:
        return shippingSchema;
      default:
        return Yup.object();
    }
  };

  const formatSerialNumber = (value, previousValue) => {
    if (previousValue && previousValue.length === 3 && value.length === 2) {
      return value.slice(0, 2);
    }
    value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    return value.slice(0, 9);
  };

  const verifySerialNumbers = async (serialNumbers) => {
    setIsLoading(true);
    try {
      const response = await new Promise((resolve) => setTimeout(() => {
        resolve(serialNumbers.map(serial => ({
          serialNumber: serial,
          product: {
            name: `Product for ${serial}`,
            description: 'Sample product description',
            status: 'Valid'
          }
        })));
      }, 1000));
      
      setSerialProducts(response);
      setSavedValues(prev => ({
        ...prev,
        serialNumbers
      }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error verifying serial numbers:', error);
      alert('Error verifying serial numbers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentStep === 1) {
        await verifySerialNumbers(values.serialNumbers);
      } else if (currentStep === 3) {
        console.log('Final form submission:', values);
        // Add your API call here
      }
      setSavedValues(values);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {currentStep === 2 ? (
        <VerificationStep 
          products={serialProducts}
          onBack={handleBack}
          onContinue={() => {
            console.log('Moving to shipping step');
            setCurrentStep(3);
          }}
        />
      ) : (
        <Formik
          initialValues={savedValues}
          validationSchema={getCurrentValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {currentStep === 1 && (
                <FieldArray name="serialNumbers">
                  {({ push, remove }) => (
                    <div>
                      {values.serialNumbers.map((serialNumber, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                          <div className="flex-1">
                            <Field name={`serialNumbers.${index}`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="XX-XXXXXX"
                                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  onChange={(e) => {
                                    const formatted = formatSerialNumber(
                                      e.target.value,
                                      field.value
                                    );
                                    setFieldValue(`serialNumbers.${index}`, formatted);
                                  }}
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`serialNumbers.${index}`}
                              component="div"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="mb-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Add Serial Number
                      </button>
                    </div>
                  )}
                </FieldArray>
              )}

              {currentStep === 3 && (
                <>
                  <ShippingStep />
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      Submit Order
                    </button>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isSubmitting || isLoading ? 'Verifying...' : 'Verify Serial Numbers'}
                </button>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SerialNumberForm;