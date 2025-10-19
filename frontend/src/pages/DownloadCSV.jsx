import React, { useEffect, useState } from 'react';
import { reportsAPI } from '../utils/api';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DownloadCSV = () => {
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('Generating CSV and sending email...');
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        await reportsAPI.sendCSV();
        setStatus('success');
        setMessage('Your CSV report is on its way to your registered email!');
        // Auto-redirect back after a delay
        setTimeout(() => navigate(-1), 3000);
      } catch (error) {
        console.error('Send CSV error', error);
        setStatus('error');
        setMessage(
          error?.response?.data?.message || 'Failed to send CSV report. Please try again later.'
        );
      }
    };

    sendRequest();
  }, [navigate]);

  const renderIcon = () => {
    if (status === 'loading') return <Loader2 className="w-12 h-12 animate-spin text-primary-600" />;
    if (status === 'success') return <CheckCircle2 className="w-12 h-12 text-green-600" />;
    return <XCircle className="w-12 h-12 text-red-600" />;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
      {renderIcon()}
      <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100 max-w-md">
        {message}
      </p>
    </div>
  );
};

export default DownloadCSV;