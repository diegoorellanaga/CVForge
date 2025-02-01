import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const CreateReference = ({ resumeId }) => {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name: "",
        position: "",
        relation: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/references`, { ...formData, resume_id: resumeId }, {
            onError: (err) => {
                setErrors(err);
            },
            onSuccess: () => {
                setFormData({
                    name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    company_name: "",
                    position: "",
                    relation: "",
                });
                setErrors({});
            },
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add a New Reference</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="company_name" className="block text-sm font-medium">
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.company_name && <p className="text-sm text-red-500">{errors.company_name}</p>}
                    </div>
                    <div>
                        <label htmlFor="position" className="block text-sm font-medium">
                            Position
                        </label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                    </div>
                    <div>
                        <label htmlFor="relation" className="block text-sm font-medium">
                            Relation
                        </label>
                        <input
                            type="text"
                            id="relation"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.relation && <p className="text-sm text-red-500">{errors.relation}</p>}
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
                    >
                        Add Reference
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReference;
