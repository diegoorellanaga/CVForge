import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import EditExperience from './EditExperience';


import { Tab, Tabs,Button, Modal } from 'react-bootstrap';

function ShowExperiences({ experiences, setExperiences, resumeId }) {

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);

    const handleEditOpen = (experience) => {
        setSelectedExperience(experience);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedExperience(null);
    };

    // Function to handle the delete action
    const handleDeleteEx = async (experienceId) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            Inertia.delete(route('experiences.destroy', experienceId), {
                onSuccess: () => {
                    // Update the local state to remove the deleted experience
                    setExperiences((prevExperiences) =>
                        prevExperiences.filter(exp => exp.id !== experienceId)
                    );

                    alert("Experience deleted successfully.");
                },
                onError: (errors) => {
                    console.error("Error deleting experience:", errors);
                    alert("Failed to delete experience. Please try again.");
                }
            });
        }
    };

    return (
        <div className="experiences-list">
            <h2>Job Experiences</h2>
            <ul>
                {experiences.length > 0 ? experiences.map(experience => (
                    <li key={experience.id} className="experience-item border p-4 mb-4 rounded shadow-sm">
                        <h3 className="font-semibold text-lg">{experience.job_title} at {experience.company_name}</h3>
                        <p>{experience.initial_date} - {experience.end_date ? experience.end_date : 'Present'}</p>
                        <p><strong>Description:</strong> {experience.description}</p>
                        <p><strong>Current Job:</strong> {experience.current ? 'Yes' : 'No'}</p>
                        {experience.departure_reason && <p><strong>Reason for leaving:</strong> {experience.departure_reason}</p>}
                        {/* Delete button */}
                        <button 
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            onClick={() => handleDeleteEx(experience.id)}
                        >
                            Delete
                        </button>
                        <button 
                            onClick={() => handleEditOpen(experience)} 
                            className="mt-2 ml-2 bg-cyan-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                              >
                          Edit
                        </button>

                        <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Experience</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedExperience && (
                                    <EditExperience experience={selectedExperience} resumeId={resumeId} />
                                )}
                            </Modal.Body>
                        </Modal>


                        {/* <EditExperience experience={experience} resumeId={resumeId} /> */}
                    </li>
                )) : (
                    <p>No job experiences added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ShowExperiences;
