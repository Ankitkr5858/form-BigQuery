import React, { useState, useEffect } from 'react';
import { FormData, UTMParams } from '../types';
import { getUTMParams } from '../utils/utm';
import { Phone } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    referrer: '',
    submissionDate: new Date().toISOString(),
    ...formatUTMParams(getUTMParams()),
  });

  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      referrer: document.referrer,
    }));
  }, []);

  function formatUTMParams(params: UTMParams) {
    return {
      utmSource: params.utm_source,
      utmMedium: params.utm_medium,
      utmCampaign: params.utm_campaign,
      utmTerm: params.utm_term,
      utmContent: params.utm_content,
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your BigQuery endpoint
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Phone className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 ml-2">Contact Us</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        {/* Hidden UTM fields */}
        <input type="hidden" name="utmSource" value={formData.utmSource || ''} />
        <input type="hidden" name="utmMedium" value={formData.utmMedium || ''} />
        <input type="hidden" name="utmCampaign" value={formData.utmCampaign || ''} />
        <input type="hidden" name="utmTerm" value={formData.utmTerm || ''} />
        <input type="hidden" name="utmContent" value={formData.utmContent || ''} />
        <input type="hidden" name="referrer" value={formData.referrer} />
        <input type="hidden" name="submissionDate" value={formData.submissionDate} />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowDebug(!showDebug)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
          
          {showDebug && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Information:</h3>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                {JSON.stringify({
                  utmParams: {
                    utmSource: formData.utmSource,
                    utmMedium: formData.utmMedium,
                    utmCampaign: formData.utmCampaign,
                    utmTerm: formData.utmTerm,
                    utmContent: formData.utmContent,
                  },
                  referrer: formData.referrer,
                  submissionDate: formData.submissionDate,
                }, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}