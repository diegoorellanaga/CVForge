import React from 'react';

function ShowHeader({ header }) {
    return (
        <div className="header-details max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Header Information</h2>
            

            <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Name: </p>
                <p className="text-lg">{header.name}</p>
            </div>

            <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Professional Title: </p>
                <p className="text-lg">{header.professional_title}</p>
            </div>

            {header.current_company && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Current Company: </p>
                    <p className="text-lg">{header.current_company}</p>
                </div>
            )}

            {header.current_position && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Current Position: </p>
                    <p className="text-lg">{header.current_position}</p>
                </div>
            )}

            {header.professional_summary && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Summary: </p>
                    <p>{header.professional_summary}</p>
                </div>
            )}

            {header.phone && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Phone: </p>
                    <p>{header.phone}</p>
                </div>
            )}

            {header.email && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Email: </p>
                    <p>{header.email}</p>
                </div>
            )}

            {header.location && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Location: </p>
                    <p>{header.location}</p>
                </div>
            )}

            {header.personal_site && (
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Personal Site: </p>
                    <a href={header.personal_site} target="_blank" className="text-blue-500 hover:underline">
                        {header.personal_site}
                    </a>
                </div>
            )}
        </div>
    );
}

export default ShowHeader;
