import React from 'react';

const Forbidden: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-500">403</h1>
                <p className="text-2xl mt-4">Forbidden</p>
                <p className="mt-2">You do not have permission to view this page.</p>
            </div>
        </div>
    );
};

export default Forbidden;
