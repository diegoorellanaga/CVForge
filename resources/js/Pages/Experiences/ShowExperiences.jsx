import React from 'react';

function ShowExperiences({ experiences }) {
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
                    </li>
                )) : (
                    <p>No job experiences added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ShowExperiences;