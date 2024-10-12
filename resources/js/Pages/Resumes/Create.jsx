import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Create({  user }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        style: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('resumes.store'));
    };

    return (

        <AuthenticatedLayout
user={user}
//header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
>
    <Head title="Add a New Resume" />

    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
    <Head title="Add Resume" />
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add a New Resume</h1>

    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
            </label>
            <input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.title && <div className="text-red-600 text-sm mt-2">{errors.title}</div>}
        </div>

        <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">
                Style
            </label>
            <input
                id="style"
                type="text"
                value={data.style}
                onChange={(e) => setData('style', e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.style && <div className="text-red-600 text-sm mt-2">{errors.style}</div>}
        </div>

        <button
            type="submit"
            disabled={processing}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Add Resume
        </button>
    </form>
</div>

</AuthenticatedLayout>
    );
}



