import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

function AddHeader({ resumeId, existingHeader }) {
    // Set initial form data based on whether an existing header is passed
    const [formData, setFormData] = useState({
        image_url: existingHeader ? existingHeader.image_url : '',
        professional_summary: existingHeader ? existingHeader.professional_summary : '',
        phone: existingHeader ? existingHeader.phone : '',
        email: existingHeader ? existingHeader.email : '',
        location: existingHeader ? existingHeader.location : '',
        personal_site: existingHeader ? existingHeader.personal_site : '',
        name: existingHeader ? existingHeader.name : '',
        professional_title: existingHeader ? existingHeader.professional_title : '',
        current_company: existingHeader ? existingHeader.current_company : '',
        current_position: existingHeader ? existingHeader.current_position : ''
    });

    // Handle form submission, either updating or creating the header
    const handleSubmit = (e) => {
        e.preventDefault();
        if (existingHeader) {
            console.log(route('headers.update', [resumeId, existingHeader.id]));
            // Send a PUT request to update the existing header
            Inertia.put(route('headers.update', [resumeId, existingHeader.id]), formData);

        } else {
            // Send a POST request to create a new header
            Inertia.post(route('headers.store', resumeId), formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{maxHeight:"80vh",overflowY:"scroll"}} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    name="image_url"
                    defaultValue={existingHeader?.image_url}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image URL"
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Summary</label>
                <textarea
                    required
                    name="summary"
                    defaultValue={existingHeader?.professional_summary}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Professional Summary"
                    onChange={e => setFormData({ ...formData, professional_summary: e.target.value })}
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    name="phone"
                    defaultValue={existingHeader?.phone}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone Number"
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    defaultValue={existingHeader?.email}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email Address"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    defaultValue={existingHeader?.location}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Location"
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Personal Website</label>
                <input
                    type="text"
                    name="personal_site"
                    defaultValue={existingHeader?.personal_site}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Personal Website"
                    onChange={e => setFormData({ ...formData, personal_site: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    defaultValue={existingHeader?.name}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                <input
                    required
                    type="text"
                    name="professional_title"
                    defaultValue={existingHeader?.professional_title}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Professional Title"
                    onChange={e => setFormData({ ...formData, professional_title: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Current Company</label>
                <input
                    type="text"
                    name="current_company"
                    defaultValue={existingHeader?.current_company}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Current Company"
                    onChange={e => setFormData({ ...formData, current_company: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Current Position</label>
                <input
                    type="text"
                    name="current_position"
                    defaultValue={existingHeader?.current_position}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Current Position"
                    onChange={e => setFormData({ ...formData, current_position: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               {existingHeader ? 'Edit Header' : 'Add Header'}
            </button>
            {JSON.stringify(formData)}
        </form>
    );
}

export default AddHeader;
