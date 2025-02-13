import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ToastMessage from '@/Components/Utils/ToastMessage';
function AddSkill({ resumeId ,refreshPage }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    
    const [formData, setFormData] = useState({
        skill_name: '',
        skill_category: '',
        skill_order: 0,
        year_amount: 0,
        proficiency: 0, // Integer, representing the proficiency level
        certificate: false // Boolean, whether the skill has a certificate
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(route("skills.store", resumeId), formData);
            console.log("Created successfully", response.data);
    
            setToast({ show: true, message: "Skill created successfully!", variant: "success" });
    
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error("Error creating skill:", error);
    
            setToast({ show: true, message: "Failed to create skill. Please try again.", variant: "danger" });
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                    type="text"
                    name="skill_name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Skill Name"
                    onChange={e => setFormData({ ...formData, skill_name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Category</label>
                <input
                    type="text"
                    name="skill_category"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Skill Category"
                    onChange={e => setFormData({ ...formData, skill_category: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Order</label>
                <input
                    type="number"
                    name="skill_order"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Skill Order"
                    onChange={e => setFormData({ ...formData, skill_order: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                    type="number"
                    name="year_amount"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Years of Experience"
                    onChange={e => setFormData({ ...formData, year_amount: parseFloat(e.target.value) })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                <select
                    name="proficiency"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    onChange={e => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                >
                    <option value={0}>Select Proficiency</option>
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Expert</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={e => setFormData({ ...formData, certificate: e.target.checked })}
                />
                <label className="ml-2 block text-sm text-gray-700">Has Certificate</label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Skill
            </button>
            <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />
        </form>
    );
}

export default AddSkill;
