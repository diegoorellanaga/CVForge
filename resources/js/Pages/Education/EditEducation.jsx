import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

function EditEducation({ education, resumeId }) {
    const [formData, setFormData] = useState({
        initial_date: '',
        graduation_date: '',
        degree: '',
        institution: '',
        country: '',
        place: '',
        description: ''
    });

    useEffect(() => {
        setFormData({
            initial_date: education.initial_date || '',
            graduation_date: education.graduation_date || '',
            degree: education.degree || '',
            institution: education.institution || '',
            country: education.country || '',
            place: education.place || '',
            description: education.description || ''
        });
    }, [education]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('education.update', [resumeId, education.id]), formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Initial Date</label>
                <input
                    type="date"
                    name="initial_date"
                    value={formData.initial_date}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, initial_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                <input
                    type="date"
                    name="graduation_date"
                    value={formData.graduation_date}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, graduation_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, degree: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                    type="text"
                    name="place"
                    value={formData.place}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, place: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Update Education
            </button>
        </form>
    );
}

export default EditEducation;
