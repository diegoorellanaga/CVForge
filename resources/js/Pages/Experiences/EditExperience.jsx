import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ToastMessage from '@/Components/Utils/ToastMessage';
function EditExperience({ experience, resumeId,refreshPage  }) {


    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [formData, setFormData] = useState({
        initial_date: '',
        end_date: '',
        job_title: '',
        company_name: '',
        description: '',
        current: false,
        departure_reason: '',
        place: ''
    });

    // Use useEffect to populate the form with current experience data
    useEffect(() => {
        setFormData({
            initial_date: experience.initial_date || '',
            end_date: experience.end_date || '',
            job_title: experience.job_title || '',
            company_name: experience.company_name || '',
            description: experience.description || '',
            current: experience.current || false,
            departure_reason: experience.departure_reason || '',
            place: experience.place || ''
        });
    }, [experience]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Send the PUT request using Axios
            const response = await axios.put(route('experiences.update', [resumeId, experience.id]), formData);
            
            // Log success
            console.log('Updated successfully', response.data);
            
            // Show success toast
            setToast({ show: true, message: "Experience edited successfully!", variant: "success" });
    
            // Refresh the page after successful update
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error('Error updating:', error);
    
            // Show error toast
            setToast({ show: true, message: "Failed to edit experience. Please try again.", variant: "danger" });
        }
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
                    value={formData.initial_date}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, initial_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
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
                    value={formData.company_name}
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
                    value={formData.place}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Location"
                    onChange={e => setFormData({ ...formData, place: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Job Description"
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="current"
                    checked={formData.current}
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
                    value={formData.departure_reason}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Reason for Leaving"
                    onChange={e => setFormData({ ...formData, departure_reason: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Update Experience
            </button>
        </form>
    );
}

export default EditExperience;
