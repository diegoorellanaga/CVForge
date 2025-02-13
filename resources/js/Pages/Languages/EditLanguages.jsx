import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ToastMessage from '@/Components/Utils/ToastMessage';
function EditLanguage({ resumeId, language,refreshPage  }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    const [formData, setFormData] = useState({
        language: language.language || "",
        proficiency: language.proficiency || "",
        test: language.test || false,
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
            const response = await axios.put(route("languages.update", [language.id, resumeId]), formData);
    
            // Show success toast
            setToast({ show: true, message: "Language updated successfully!", variant: "success" });
    
            setErrors({}); // Reset errors
    
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error("Error updating language:", error);
    
            // Show error toast
            setToast({ show: true, message: "Failed to update language. Please try again.", variant: "danger" });
        }
    };

    return (
        <div className="edit-language">
                        <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />
            <h2 className="text-xl font-bold mb-4">Edit Language</h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
                {/* Language */}
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Language
                    </label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className={`w-full p-2 border ${
                            errors.language ? "border-red-500" : "border-gray-300"
                        } rounded`}
                        placeholder="Enter language"
                    />
                    {errors.language && (
                        <p className="text-red-500 text-sm">{errors.language}</p>
                    )}
                </div>

                {/* Proficiency */}
                <div>
                    <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">
                        Proficiency
                    </label>
                    <select
                        id="proficiency"
                        name="proficiency"
                        value={formData.proficiency}
                        onChange={handleChange}
                        className={`w-full p-2 border ${
                            errors.proficiency ? "border-red-500" : "border-gray-300"
                        } rounded`}
                    >
                        <option value="">Select Proficiency</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Fluent">Fluent</option>
                    </select>
                    {errors.proficiency && (
                        <p className="text-red-500 text-sm">{errors.proficiency}</p>
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
                        className="mr-2"
                    />
                    <label htmlFor="test" className="block text-sm font-medium text-gray-700">
                        Test Taken
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Language
                </button>
            </form>
        </div>
    );
}

export default EditLanguage;
