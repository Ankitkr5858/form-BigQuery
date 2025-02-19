import { FormData } from '../types';

export async function sendToBigQuery(data: FormData): Promise<{ success: boolean; message: string }> {
  // This is a mock function that simulates sending data to BigQuery
  // In production, this would be replaced with an actual API call to your backend
  
  // Log the data that would be sent to BigQuery
  console.log('Form Data to be sent to BigQuery:', {
    table: 'contact_submissions',
    data: {
      ...data,
      // Add additional metadata
      environment: 'development',
      browser: navigator.userAgent,
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href
    }
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate successful submission
  return {
    success: true,
    message: 'Form submitted successfully! (Development Mode - Check console for data)'
  };
}