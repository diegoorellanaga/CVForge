import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ToastMessage from '@/Components/Utils/ToastMessage';
function EditSkill({ skill, resumeId ,refreshPage }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [formData, setFormData] = useState({
        skill_name: '',
        skill_category: '',
        proficiency: '',
        year_amount: '',
        certificate: false,
        skill_order: ''  // Added field for skill_order
    });

    // Use useEffect to populate the form with current skill data
    useEffect(() => {
        setFormData({
            skill_name: skill.skill_name || '',
            skill_category: skill.skill_category || '',
            proficiency: skill.proficiency || '',
            year_amount: skill.year_amount || '',
            certificate: skill.certificate || false,
            skill_order: skill.skill_order || ''  // Populate skill_order
        });
    }, [skill]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert the formData fields to the correct types
        const updatedFormData = {
            skill_name: formData.skill_name,
            skill_category: formData.skill_category,
            proficiency: parseInt(formData.proficiency, 10), // Ensure proficiency is a number
            year_amount: parseFloat(formData.year_amount),  // Ensure year_amount is a number
            certificate: formData.certificate === true, // Ensure certificate is a boolean
            skill_order: parseInt(formData.skill_order, 10) // Convert skill_order to integer
        };
    
        try {
            const response = await axios.put(route("skills.update", [resumeId, skill.id]), updatedFormData);
            console.log("Updated successfully", response.data);
    
            setToast({ show: true, message: "Skill edited successfully!", variant: "success" });
    
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error("Error updating:", error);
    
            setToast({ show: true, message: "Failed to edit skill. Please try again.", variant: "danger" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                <input
                    type="text"
                    name="skill_name"
                    value={formData.skill_name}
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
                    value={formData.skill_category}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Skill Category"
                    onChange={e => setFormData({ ...formData, skill_category: e.target.value })}
                />
            </div>

            <div>
    <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
    <select
        name="proficiency"
        value={formData.proficiency}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        onChange={e => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
    >
        <option value={0}>Select Proficiency</option>
        <option value={1}>Beginner</option>
        <option value={2}>Intermediate</option>
        <option value={3}>Expert</option>
    </select>
</div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                    type="number"
                    name="year_amount"
                    value={formData.year_amount}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Years of Experience"
                    onChange={e => setFormData({ ...formData, year_amount: e.target.value })}
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="certificate"
                    checked={formData.certificate}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={e => setFormData({ ...formData, certificate: e.target.checked })}
                />
                <label className="ml-2 block text-sm text-gray-700">Certificate Available</label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Skill Order</label>
                <input
                    type="number"
                    name="skill_order"
                    value={formData.skill_order}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Skill Order"
                    onChange={e => setFormData({ ...formData, skill_order: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Update Skill
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

export default EditSkill;
