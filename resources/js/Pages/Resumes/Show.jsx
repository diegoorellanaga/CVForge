// resources/js/Pages/Resumes/Show.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
//import ShowExperiences from '@/Components/Experiences/ShowExperiences'; // Component you created
import ShowExperiences from '../Experiences/ShowExperiences';
import AddExperience from '../Experiences/CreateExperience';
import ShowHeader from '../Headers/ShowHeader';
import AddHeader from '../Headers/CreateHeader';

function Show({ resume, user }) {
    return (
        <AuthenticatedLayout user={user}>
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{resume.title}</h1>
                <p><strong>Style:</strong> {resume.style}</p>

                {/* Display the experiences related to this resume */}

               { resume.header ? <ShowHeader header={resume.header}/>:"no header"}
                <AddHeader resumeId={resume.resume_id} existingHeader={resume.header}/>
                <ShowExperiences experiences={resume.experiences} />
                <AddExperience resumeId={resume.resume_id}/>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;