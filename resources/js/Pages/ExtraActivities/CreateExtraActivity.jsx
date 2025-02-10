import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

function CreateExtraActivity({ resumeId }) {
    
    const [formData, setFormData] = useState({
        initial_date: '',
        end_date: '',
        job_title: '',
        company_name: '',
        description: '',
        current: false,
        departure_reason: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('extraActivity.store', resumeId), formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Initial Date</label>
                <input
                    type="date"
                    name="initial_date"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, initial_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    name="end_date"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    name="job_title"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Job Title"
                    onChange={e => setFormData({ ...formData, job_title: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                    type="text"
                    name="company_name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Company Name"
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    name="place"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Location"
                    onChange={e => setFormData({ ...formData, place: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Job Description"
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="current"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={e => setFormData({ ...formData, current: e.target.checked })}
                />
                <label className="ml-2 block text-sm text-gray-700">Currently Working Here</label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Departure Reason</label>
                <input
                    type="text"
                    name="departure_reason"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Reason for Leaving"
                    onChange={e => setFormData({ ...formData, departure_reason: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Experience
            </button>
        </form>
    );
}

export default CreateExtraActivity;
