import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import EditExperience from './EditExperience';
import ToastMessage from '@/Components/Utils/ToastMessage';

import { Tab, Tabs,Button, Modal } from 'react-bootstrap';

function ShowExperiences({ experiences, setExperiences, resumeId ,refreshPage }) {

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });


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
        try {
            // Make the delete request using Axios
            await axios.delete(route('experiences.destroy', experienceId));

            // Update the local state to remove the deleted experience

            // Show success toast
            setToast({ show: true, message: "Experience deleted successfully!", variant: "success" });

            // Refresh the page
            refreshPage(); // Ensure this function is defined elsewhere
        } catch (error) {
            console.error("Error deleting experience:", error);

            // Show error toast
            setToast({ show: true, message: "Failed to delete experience. Please try again.", variant: "danger" });
        }
    }
};


    return (
        <div className="experiences-list">
                        <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />
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




                        {/* <EditExperience experience={experience} resumeId={resumeId} /> */}
                    </li>
                )) : (
                    <p>No job experiences added yet.</p>
                )}
            </ul>
            <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Experience</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedExperience && (
                                    <EditExperience refreshPage={refreshPage} experience={selectedExperience} resumeId={resumeId} />
                                )}
                            </Modal.Body>
                        </Modal>
        </div>
    );
}

export default ShowExperiences;
