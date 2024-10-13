import React from 'react';

export const Button = ({ children, onClick, variant = 'default', className = '', ...props }) => {
    const baseStyle = 'px-4 py-2 rounded font-semibold flex items-center';
    const variantStyles = {
      default: 'bg-blue-500 text-white hover:bg-blue-600',
      outline: 'border border-gray-400 text-gray-900 hover:bg-gray-100',
      black: 'text-gray-600 hover:bg-gray-100',
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
export const Card = ({ children, className = '' }) => (
  <div className={`text-gray-900 bg-white shadow rounded-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const Dialog = ({ open, children, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onOpenChange}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">{children}</div>
    </div>
  );
};

export const DialogContent = ({ children }) => <div>{children}</div>;

export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

export const DialogTitle = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>;

export const DialogDescription = ({ children }) => <p className="text-gray-600">{children}</p>;

export const Table = ({ children, className = '' }) => (
  <table className={`min-w-full bg-white ${className}`}>
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100 border-b">
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableHead = ({ children }) => (
  <th className="py-2 px-4 text-left text-gray-700 font-semibold">{children}</th>
);

export const TableCell = ({ children }) => (
  <td className="py-2 px-4">{children}</td>
);

export const Input = ({ type = 'text', className = '', ...props }) => (
  <input
    type={type}
    className={`border border-gray-300 rounded px-4 py-2 ${className}`}
    {...props}
  />
);

export const Select = ({ children, className = '', ...props }) => (
  <select className={`border border-gray-300 rounded px-4 py-2 ${className}`} {...props}>
    {children}
  </select>
);


export const Alert = ({ children, variant = 'default' }) => {
  const baseClasses = 'p-4 rounded-md mb-4 flex items-start';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h4 className="font-semibold text-lg mr-2">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);