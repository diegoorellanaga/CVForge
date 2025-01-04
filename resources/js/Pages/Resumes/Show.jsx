// resources/js/Pages/Resumes/Show.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowExperiences from '../Experiences/ShowExperiences';
import AddExperience from '../Experiences/CreateExperience';
import ShowSkills from '../Skills/ShowSkill';  // Import ShowSkills
import AddSkill from '../Skills/CreateSkill';  // Import AddSkill
import ShowHeader from '../Headers/ShowHeader';
import AddHeader from '../Headers/CreateHeader';
import Modal from '@/Components/Modal';
import { Tab, Tabs, Button } from 'react-bootstrap';

function Show({ resume, user, activeTab }) {
    const [experiences, setExperiences] = useState(resume.experiences);
    const [skills, setSkills] = useState(resume.skills);  // State for skills
    const [isAddExperienceModalOpen, setAddExperienceModalOpen] = useState(false);
    const [isAddSkillModalOpen, setAddSkillModalOpen] = useState(false);  // Modal for adding skills
    const [isAddHeaderModalOpen, setAddHeaderModalOpen] = useState(false);

    const handleAddExperienceOpen = () => setAddExperienceModalOpen(true);
    const handleAddExperienceClose = () => setAddExperienceModalOpen(false);
    const handleAddSkillOpen = () => setAddSkillModalOpen(true);  // Handle Add Skill modal
    const handleAddSkillClose = () => setAddSkillModalOpen(false);  // Close Add Skill modal
    const handleAddHeaderOpen = () => setAddHeaderModalOpen(true);
    const handleAddHeaderClose = () => setAddHeaderModalOpen(false);

    return (
        <AuthenticatedLayout user={user}>
            {JSON.stringify(resume)}
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{resume.title}</h1>
                <p><strong>Style:</strong> {resume.style}</p>

                {/* React Bootstrap Tabs */}
                <Tabs defaultActiveKey={activeTab} id="resume-tabs" className="mb-3">
                    {/* Header Tab */}
                    <Tab eventKey="header" title="Header">
                        <Button 
                            onClick={handleAddHeaderOpen}
                            variant="primary"
                        >
                            {resume.header ? "Edit Header" : "Add Header"}
                        </Button>
                        {resume.header ? <ShowHeader header={resume.header} /> : "No header available"}

                        <Modal show={isAddHeaderModalOpen} onClose={handleAddHeaderClose}>
                            <AddHeader resumeId={resume.resume_id} existingHeader={resume.header} />
                        </Modal>
                    </Tab>

                    {/* Experiences Tab */}
                    <Tab eventKey="experiences" title="Experiences">
                        <Button 
                            onClick={handleAddExperienceOpen}
                            variant="primary"
                        >
                            Add Experience
                        </Button>
                        <ShowExperiences 
                            experiences={experiences} 
                            setExperiences={setExperiences} 
                            resumeId={resume.resume_id} 
                        />

                        <Modal show={isAddExperienceModalOpen} onClose={handleAddExperienceClose}>
                            <AddExperience resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>

                    {/* Skills Tab */}
                    <Tab eventKey="skills" title="Skills">
                        <Button 
                            onClick={handleAddSkillOpen}
                            variant="primary"
                        >
                            Add Skill
                        </Button>
                        <ShowSkills 
                            skills={skills} 
                            setSkills={setSkills} 
                            resumeId={resume.resume_id} 
                        />

                        <Modal show={isAddSkillModalOpen} onClose={handleAddSkillClose}>
                            <AddSkill resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
