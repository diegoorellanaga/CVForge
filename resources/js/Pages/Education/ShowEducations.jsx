import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import EditEducation from './EditEducation';
import { Modal } from 'react-bootstrap';

function ShowEducations({ educations = [], setEducations, resumeId }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    const handleEditOpen = (education) => {
        setSelectedEducation(education);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedEducation(null);
    };

    const handleDeleteEd = async (educationId) => {
        if (window.confirm("Are you sure you want to delete this education?")) {
            Inertia.delete(route('education.destroy', educationId), {
                onSuccess: () => {
                    setEducations((prevEducations) =>
                        prevEducations.filter(edu => edu.id !== educationId)
                    );
                    alert("Education deleted successfully.");
                },
                onError: (errors) => {
                    console.error("Error deleting education:", errors);
                    alert("Failed to delete education. Please try again.");
                }
            });
        }
    };

    return (
        <div className="educations-list">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <ul className="space-y-4">
                {educations.length > 0 ? (
                    educations.map(education => (
                        <li key={education.id} className="education-item border p-4 mb-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold text-lg">
                                {education.degree} at {education.institution}
                            </h3>
                            <p className="text-sm text-gray-600">
                                <strong>Country:</strong> {education.country} 
                                {education.place && `, ${education.place}`}
                            </p>
                            <p><strong>Start Date:</strong> {education.initial_date}</p>
                            <p><strong>Graduation Date:</strong> {education.graduation_date || 'Present'}</p>
                            {education.description && (
                                <p className="mt-2"><strong>Description:</strong> {education.description}</p>
                            )}

                            {/* Buttons Section */}
                            <div className="mt-4">
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mr-2"
                                    onClick={() => handleDeleteEd(education.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEditOpen(education)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </div>

                            {/* Edit Modal */}
                            <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Education</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedEducation && (
                                        <EditEducation education={selectedEducation} resumeId={resumeId} />
                                    )}
                                </Modal.Body>
                            </Modal>
                        </li>
                    ))
                ) : (
                    <p>No education entries added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ShowEducations;
