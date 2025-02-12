import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import EditReference from "./EditReference";
import { Modal } from "react-bootstrap";

import { router } from '@inertiajs/react';
import ToastMessage from '@/Components/Utils/ToastMessage';

const refreshPage = () => {
    router.reload({ preserveState: true , preserveScroll: true });
};

// router.reload({
//     only: ['resume'], // Specify the props to refresh
//     preserveState: true,
// });

//router.visit(window.location.pathname, { preserveState: true });


function ShowReferences({ references, setReferences, resumeId, refreshPage }) {
    console.log("anychange upper", references)
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);

    const handleEditOpen = (reference) => {
        setSelectedReference(reference);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
        setSelectedReference(null);
    };

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "success",
    });

// Inertia.delete(route('skills.destroy', skillId), {
    const handleDeleteReference = async (referenceId) => {
        console.log(referenceId)
        if (window.confirm("Are you sure you want to delete this reference?")) {
            Inertia.delete(route("references.destroy", referenceId), {
                onSuccess: () => {
                    // Update the local state to remove the deleted reference
                    // setReferences((prevReferences) =>
                    //     prevReferences.filter(reference => reference.id !== referenceId)
                    // );

                    alert("Reference deleted successfully.");
                },
                onError: (errors) => {
                    console.error("Error deleting reference:", errors);
                    alert("Failed to delete reference. Please try again.");
                },
            });
        }
    };

    return (
        <div className="references-list">

            <ToastMessage 
                show={toast.show} 
                onClose={() => setToast((prev) => ({ ...prev, show: false }))} 
                message={toast.message} 
                variant={toast.variant} 
            />

            <h2 className="text-2xl font-bold mb-4">References</h2>
            <ul>
                {references && references.length > 0 ? (
                    references.map(reference => (
                        <li key={reference.id} className="reference-item border p-4 mb-4 rounded shadow-sm">
                            <h3 className="font-semibold text-lg">{reference.name} {reference.last_name}</h3>
                            <p><strong>Email:</strong> {reference.email}</p>
                            <p><strong>Phone:</strong> {reference.phone}</p>
                            <p><strong>Company:</strong> {reference.company_name}</p>
                            <p><strong>Position:</strong> {reference.position}</p>
                            <p><strong>Relation:</strong> {reference.relation}</p>
                            {/* Delete button */}
                            <button
                                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                onClick={() => handleDeleteReference(reference.reference_id)}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleEditOpen(reference)}
                                className="mt-2 ml-2 bg-cyan-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>

                            {/* Edit modal */}
                            <Modal show={isEditModalOpen} onHide={handleEditClose} keyboard={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Reference</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedReference && (
                                        <EditReference
                                        refreshPage={refreshPage}
                                            reference={selectedReference}
                                            resumeId={resumeId}
                                        />
                                    )}
                                </Modal.Body>
                            </Modal>
                        </li>
                    ))
                ) : (
                    <p>No references added yet.</p>
                )}
            </ul>
        </div>
    );
}

export default ShowReferences;
