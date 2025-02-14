import { useState } from "react";

const ImageUpload = ({setImageToShow,imageToShow}) => {
    const [selectedImage, setSelectedImage] = useState(null);
   // const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImageToShow(URL.createObjectURL(file)); // Generate a temporary URL for preview
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {imageToShow && (
                <div>
                    <p>Preview:</p>
                    <img src={imageToShow} alt="Selected" style={{ width: "200px", height: "auto" }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
