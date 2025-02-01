import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

function EditLanguage({ resumeId, language }) {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.put(route("languages.update", [language.id,resumeId]), formData, {
            onSuccess: () => {
                alert("Language updated successfully!");
                setErrors({});
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <div className="edit-language">
            <h2 className="text-xl font-bold mb-4">Edit Language</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Language */}
                <div>
                    <label htmlFor="language" className="block font-medium">
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
                    <label htmlFor="proficiency" className="block font-medium">
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
                    <label htmlFor="test" className="font-medium">
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
