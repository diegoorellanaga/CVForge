// resources/js/Pages/Resumes/Show.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowExperiences from '../Experiences/ShowExperiences';
import AddExperience from '../Experiences/CreateExperience';
import ShowSkills from '../Skills/ShowSkill';
import AddSkill from '../Skills/CreateSkill';
import CreateReference from '../References/CreateReferences';
import ShowHeader from '../Headers/ShowHeader';
import AddHeader from '../Headers/CreateHeader';
import ShowEducations from '../Education/ShowEducations';
import ShowReferences from '../References/ShowReferences';
import AddEducation from '../Education/CreateEducation';
import Modal from '@/Components/Modal';
import MyPdfDocument from '@/Components/PDF/MyPdfDocument';
import PdfPreviewer from '@/Components/PDF/PdfPreviewer';
import ShowLanguages from '../Languages/ShowLanguages';
import { Inertia } from '@inertiajs/inertia';


import { Tab, Tabs, Button, Row, Col } from 'react-bootstrap';

import CreateLanguage from '../Languages/CreateLanguages';


import { router } from '@inertiajs/react';
import axios from "axios";




function Show({ resume, user, activeTab }) {


    const refreshPage = () => {

        console.log("refreshing!! ")
        router.reload({
            preserveState: false,
            preserveScroll: false,
        });


        // Inertia.visit(window.location.pathname, {
        //     only: ['testLazy']
        // });

        //router.reload({ preserveState: true , preserveScroll: true });
    };
console.log("resume referece", resume.references)
const references = resume.references

    const [experiences, setExperiences] = useState(resume.experiences);
    const [skills, setSkills] = useState(resume.skills);
    const [educations, setEducations] = useState(resume.educations);
   // const [references, setReferences] = useState(resume.references);
    const [languages, setLanguages] = useState(resume.languages);

    const [isAddExperienceModalOpen, setAddExperienceModalOpen] = useState(false);
    const [isAddSkillModalOpen, setAddSkillModalOpen] = useState(false);
    const [isAddEducationModalOpen, setAddEducationModalOpen] = useState(false);
    const [isAddHeaderModalOpen, setAddHeaderModalOpen] = useState(false);
    const [isAddReferenceModalOpen, setAddReferenceModalOpen] = useState(false);
    const [isAddLanguageModalOpen, setAddLanguageModalOpen] = useState(false);

    const handleAddExperienceOpen = () => setAddExperienceModalOpen(true);
    const handleAddExperienceClose = () => setAddExperienceModalOpen(false);
    const handleAddSkillOpen = () => setAddSkillModalOpen(true);
    const handleAddSkillClose = () => setAddSkillModalOpen(false);
    const handleAddEducationOpen = () => setAddEducationModalOpen(true);
    const handleAddEducationClose = () => setAddEducationModalOpen(false);
    const handleAddHeaderOpen = () => setAddHeaderModalOpen(true);
    const handleAddHeaderClose = () => setAddHeaderModalOpen(false);

    const handleAddReferenceOpen = () => setAddReferenceModalOpen(true);
    const handleAddReferenceClose = () => setAddReferenceModalOpen(false);

    const handleAddLanguageOpen = () => setAddLanguageModalOpen(true);
    const handleAddLanguageClose = () => setAddLanguageModalOpen(false);

    return (
        <AuthenticatedLayout user={user}>
            <Row>
                <Col>
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{resume.title}</h1>
                <p><strong>Style:</strong> {resume.style}</p>

                {/* React Bootstrap Tabs */}
                <Tabs defaultActiveKey={activeTab} id="resume-tabs" className="mb-3">
                    {/* Header Tab */}
                    <Tab eventKey="header" title="Header">
                        <Button onClick={handleAddHeaderOpen} variant="primary">
                            {resume.header ? "Edit Header" : "Add Header"}
                        </Button>
                        {resume.header ? <ShowHeader header={resume.header} /> : "No header available"}
                        <Modal show={isAddHeaderModalOpen} onClose={handleAddHeaderClose}>
                            <AddHeader resumeId={resume.resume_id} existingHeader={resume.header} />
                        </Modal>
                    </Tab>

                    {/* Experiences Tab */}
                    <Tab eventKey="experiences" title="Experiences">
                        <Button onClick={handleAddExperienceOpen} variant="primary">
                            Add Experience
                        </Button>
                        <ShowExperiences experiences={experiences} setExperiences={setExperiences} resumeId={resume.resume_id} />
                        <Modal show={isAddExperienceModalOpen} onClose={handleAddExperienceClose}>
                            <AddExperience resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>

                    {/* Skills Tab */}
                    <Tab eventKey="skills" title="Skills">
                        <Button onClick={handleAddSkillOpen} variant="primary">
                            Add Skill
                        </Button>
                        <ShowSkills skills={skills} setSkills={setSkills} resumeId={resume.resume_id} />
                        <Modal show={isAddSkillModalOpen} onClose={handleAddSkillClose}>
                            <AddSkill resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>

                    {/* Education Tab */}
                    <Tab eventKey="education" title="Education">
                        <Button onClick={handleAddEducationOpen} variant="primary">
                            Add Education
                        </Button>
                        <ShowEducations educations={educations} setEducations={setEducations} resumeId={resume.resume_id} />
                        <Modal show={isAddEducationModalOpen} onClose={handleAddEducationClose}>
                            <AddEducation resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>
                    <Tab eventKey="references" title="References">
                        <Button onClick={handleAddReferenceOpen} variant="primary">
                            Add Reference
                        </Button>
                        <ShowReferences refreshPage={refreshPage} references={references} resumeId={resume.resume_id} />
                        <Modal show={isAddReferenceModalOpen} onClose={handleAddReferenceClose}>
                            <CreateReference resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>

                    <Tab eventKey="languages" title="Languages">
                        <Button onClick={handleAddLanguageOpen} variant="primary">
                            Add Language
                        </Button>
                        <ShowLanguages languages={languages} setLanguages={setLanguages} resumeId={resume.resume_id} />

                        <Modal show={isAddLanguageModalOpen} onClose={handleAddLanguageClose}>
                            <CreateLanguage resumeId={resume.resume_id} />
                        </Modal>
                    </Tab>



                </Tabs>
            </div>
            </Col>
            <Col>
            <PdfPreviewer  header={resume.header} experiences={resume.experiences} skills={resume.skills} education={resume.educations}/>
            </Col>
            </Row>
        </AuthenticatedLayout>
    );
}

export default Show;
