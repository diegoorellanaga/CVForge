import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ToastMessage from '@/Components/Utils/ToastMessage';
function CreateLanguage({ resumeId,refreshPage  }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [formData, setFormData] = useState({
        language: "",
        proficiency: "",
        test: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(route("languages.store", resumeId), formData);
    
            // Show success toast
            setToast({ show: true, message: "Language added successfully!", variant: "success" });
    
            // Reset form data and errors
            setFormData({
                language: "",
                proficiency: "",
                test: false,
            });
            setErrors({});
    
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error("Error adding language:", error);
    
            // Show error toast
            setToast({ show: true, message: "Failed to add language. Please try again.", variant: "danger" });
        }
    };
    

    return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
    <ToastMessage 
        show={toast.show} 
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        message={toast.message} 
        variant={toast.variant} 
    />

    {/* Language */}
    <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
        <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border ${errors.language ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter language"
        />
        {errors.language && (
            <p className="text-red-500 text-xs">{errors.language}</p>
        )}
    </div>

    {/* Proficiency */}
    <div>
        <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">Proficiency</label>
        <select
            id="proficiency"
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full border ${errors.proficiency ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
        >
            <option value="">Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Fluent">Fluent</option>
        </select>
        {errors.proficiency && (
            <p className="text-red-500 text-xs">{errors.proficiency}</p>
        )}
    </div>

    {/* Test */}
    <div className="flex items-center">
        <input
            type="checkbox"
            id="test"
            name="test"
            checked={formData.test}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="test" className="ml-2 text-sm text-gray-700">Test Taken</label>
    </div>

    {/* Submit Button */}
    <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        Add Language
    </button>
</form>

    
    );
}

export default CreateLanguage;
