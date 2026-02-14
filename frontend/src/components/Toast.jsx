import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Toast Notification Component
 * Features: Timed dismissal, different types (success, error, warning, info)
 * Usage: Show toast notifications to users
 */
const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✓',
      iconBg: 'bg-green-200',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕',
      iconBg: 'bg-red-200',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '!',
      iconBg: 'bg-yellow-200',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ',
      iconBg: 'bg-blue-200',
    },
  };

  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`${style.bg} border ${style.border} ${style.text} rounded-lg p-4 shadow-lg flex items-center gap-3 animate-slideUp`}
    >
      <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
        {style.icon}
      </div>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="text-lg hover:opacity-70 transition duration-200"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
