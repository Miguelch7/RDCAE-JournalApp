export const fileUpload = async file => {

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dsm8mtpcp/upload';

    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal-app' );
    formData.append( 'file', file );

    try {
        const response = await fetch( cloudinaryUrl, {
            method: 'POST',
            body: formData
        }); 

        if ( response.ok ) {
            const cloudResponse = await response.json();
            return cloudResponse.secure_url;
        } else {
            throw await response.json();
        }
    } catch (error) {
        throw error;
    }
};