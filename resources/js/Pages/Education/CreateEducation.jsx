import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ToastMessage from '@/Components/Utils/ToastMessage';
function AddEducation({ resumeId }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [formData, setFormData] = useState({
        initial_date: '',
        graduation_date: '',
        degree: '',
        institution: '',
        country: '',
        place: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('education.store', resumeId), formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
                      <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />
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
                <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                <input
                    type="date"
                    name="graduation_date"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, graduation_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                    type="text"
                    name="degree"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, degree: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                    type="text"
                    name="institution"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                    type="text"
                    name="country"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                    type="text"
                    name="place"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, place: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Education
            </button>
        </form>
    );
}

export default AddEducation;
