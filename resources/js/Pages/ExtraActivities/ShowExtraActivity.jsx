import React, {useState} from 'react';
import { Inertia } from '@inertiajs/inertia';

import EditExtraActivity from './EditExtraActivity';
import ToastMessage from '@/Components/Utils/ToastMessage';

import { Tab, Tabs,Button, Modal } from 'react-bootstrap';

function ShowExtraActivity({ extraActivity, resumeId,refreshPage }) {

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

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

    // Function to handle the delete action
    const handleDeleteEx = async (experienceId) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            try {
                await axios.delete(route("extraActivity.destroy", experienceId));

                // Show success toast
                setToast({ show: true, message: "Experience deleted successfully!", variant: "success" });

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
                {extraActivity?.length > 0 ? extraActivity.map((experience,index) => (
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
                                    <EditExtraActivity refreshPage={refreshPage} experience={selectedExperience} resumeId={resumeId} />
                                )}
                            </Modal.Body>
                        </Modal>

        </div>
    );
}

export default ShowExtraActivity;
