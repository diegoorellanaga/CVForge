import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

import EditLanguage from "./EditLanguages";
import { Modal } from "react-bootstrap";

function ShowLanguages({ languages, setLanguages, resumeId }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleEditOpen = (language) => {
        setSelectedLanguage(language);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedLanguage(null);
    };

    const handleDeleteLanguage = async (languageId) => {
        if (window.confirm("Are you sure you want to delete this language?")) {
            Inertia.delete(route("languages.destroy", languageId), {
                onSuccess: () => {
                    // Update the local state to remove the deleted language
                    setLanguages((prevLanguages) =>
                        prevLanguages.filter((language) => language.id !== languageId)
                    );

                    alert("Language deleted successfully.");
                },
                onError: (errors) => {
                    console.error("Error deleting language:", errors);
                    alert("Failed to delete language. Please try again.");
                },
            });
        }
    };

    return (
        <div className="languages-list">
            <h2 className="text-2xl font-bold mb-4">Languages</h2>
            <ul>
                {languages && languages.length > 0 ? (
                    languages.map((language) => (
                        <li key={language.id} className="language-item border p-4 mb-4 rounded shadow-sm">
                            <h3 className="font-semibold text-lg">{language.language}</h3>
                            <p><strong>Proficiency:</strong> {language.proficiency}</p>
                            <p><strong>Test Taken:</strong> {language.test ? "Yes" : "No"}</p>
                            
                            {/* Delete Button */}
                            <button
                                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                onClick={() => handleDeleteLanguage(language.id)}
                            >
                                Delete
                            </button>

                            {/* Edit Button */}
                            <button
                                onClick={() => handleEditOpen(language)}
                                className="mt-2 ml-2 bg-cyan-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>

                            {/* Edit Modal */}
                            <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Language</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedLanguage && (
                                        <EditLanguage
                                            language={selectedLanguage}
                                            resumeId={resumeId}
                                        />
                                    )}
                                </Modal.Body>
                            </Modal>
                        </li>
                    ))
                ) : (
                    <p>No languages added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ShowLanguages;
