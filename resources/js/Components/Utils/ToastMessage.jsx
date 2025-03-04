import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, variant = "success" }) => {
    return (
        <ToastContainer position="top-end" className="p-3"             
            style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050
        }}>
            <Toast onClose={onClose} show={show} delay={3000} autohide bg={variant}>
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastMessage;
