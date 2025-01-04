import React, {useState} from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ resumes, user }) {


    const [showModal, setShowModal] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        Inertia.delete(route('resumes.destroy', id), {
            onSuccess: () => setShowModal(false),
        });
    };

    const openModal = (id) => {
        setResumeToDelete(id);
        setShowModal(true);
    };



    return (

        <AuthenticatedLayout
        user={user}
      //  header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Your Resumes" />

            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <Head title="Your Resumes" />
    
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Resumes</h1>

                <Link
                    href={route('resumes.create')}
                    className="inline-block mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add New Resume
                </Link>

                <ul className="space-y-4">
                    {resumes.map((resume) => (
                        <li
                            key={resume.resume_id}
                            className="flex justify-between items-center p-4 border border-gray-300 rounded-md shadow-sm"
                        >
                            <Link href={route('resumes.show', [resume.resume_id,"header"])} className="text-gray-700 font-medium hover:underline">
                                {resume.title} - <span className="italic text-gray-500">{resume.style}</span>
                            </Link>
                            <button
                                onClick={() => openModal(resume.resume_id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this resume?</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleDelete(resumeToDelete)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>



    );
}
