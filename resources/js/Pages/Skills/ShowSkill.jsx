import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import EditSkill from './EditSkill';
import { Tab, Tabs, Button, Modal } from 'react-bootstrap';
import ToastMessage from '@/Components/Utils/ToastMessage';
function ShowSkills({ skills, resumeId, refreshPage }) {

        const [toast, setToast] = useState({
            show: false,
            message: "",
            variant: "success",
        });

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const proficiencyLevels = {
        0: "Select Proficiency",
        1: "Beginner",
        2: "Intermediate",
        3: "Expert"
    };

    const handleEditOpen = (skill) => {
        setSelectedSkill(skill);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedSkill(null);
    };

    // Function to handle the delete action
    const handleDeleteSkill = async (skillId) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await axios.delete(route("skills.destroy", skillId));
    
                // Show success toast
                setToast({ show: true, message: "Skill deleted successfully!", variant: "success" });
    
                refreshPage(); // Ensure this function is defined elsewhere
            } catch (error) {
                console.error("Error deleting skill:", error);
    
                // Show error toast
                setToast({ show: true, message: "Failed to delete skill. Please try again.", variant: "danger" });
            }
        }
    };

    return (
        <div className="skills-list">
                        <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />
            <h2>Skills</h2>
   
            <ul>
                {skills && skills.length > 0 ? skills.map(skill => (
                    <li key={skill.id} className="skill-item border p-4 mb-4 rounded shadow-sm">
                        <h3 className="font-semibold text-lg">{skill.skill_name} - {skill.skill_category}</h3>
                        <p><strong>Proficiency:</strong> {proficiencyLevels[skill.proficiency]}</p>
                        <p><strong>Years of Experience:</strong> {skill.year_amount} years</p>
                        <p><strong>Certificate:</strong> {skill.certificate ? 'Yes' : 'No'}</p>
                        {/* Delete button */}
                        <button 
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            onClick={() => handleDeleteSkill(skill.id)}
                        >
                            Delete
                        </button>
                        <button 
                            onClick={() => handleEditOpen(skill)} 
                            className="mt-2 ml-2 bg-cyan-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>



                    </li>
                )) : (
                    <p>No skills added yet.</p>
                )}
            </ul>
            <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Skill</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedSkill && (
                                    <EditSkill refreshPage={refreshPage} skill={selectedSkill} resumeId={resumeId} />
                                )}
                            </Modal.Body>
                        </Modal>
        </div>
    );
}

export default ShowSkills;
