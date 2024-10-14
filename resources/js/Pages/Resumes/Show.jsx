// resources/js/Pages/Resumes/Show.jsx
import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
//import ShowExperiences from '@/Components/Experiences/ShowExperiences'; // Component you created
import ShowExperiences from '../Experiences/ShowExperiences';
import AddExperience from '../Experiences/CreateExperience';
import ShowHeader from '../Headers/ShowHeader';
import AddHeader from '../Headers/CreateHeader';
import Modal from '@/Components/Modal';

function Show({ resume, user }) {
    const [experiences, setExperiences] = useState(resume.experiences);
    const [isAddExperienceModalOpen, setAddExperienceModalOpen] = useState(false); // State for modal
   

    const handleAddExperienceOpen = () => {
        setAddExperienceModalOpen(true);
    };

    const handleAddExperienceClose = () => {
        setAddExperienceModalOpen(false);
    };

    return (
        <AuthenticatedLayout user={user}>
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{resume.title}</h1>
                <p><strong>Style:</strong> {resume.style}</p>

                {/* Display the experiences related to this resume */}

               { resume.header ? <ShowHeader header={resume.header}/>:"no header"}
                <AddHeader resumeId={resume.resume_id} existingHeader={resume.header}/>
                <ShowExperiences experiences={experiences} setExperiences={setExperiences} resumeId={resume.resume_id} />
                {/* <AddExperience resumeId={resume.resume_id}/> */}
                <button 
                    onClick={handleAddExperienceOpen}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Add Experience
                </button>

                {/* Add Experience Modal */}
                <Modal show={isAddExperienceModalOpen} onClose={handleAddExperienceClose}>
                    <AddExperience resumeId={resume.resume_id} />
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;