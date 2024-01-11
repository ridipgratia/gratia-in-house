import React from 'react';
import { ImageContext } from './imageContext';

const ImageProvider = ({ children }) => {
    // const serverUrl = 'https://attendance.gratiatechnology.com/uploads/';
    // const serverUrl = 'http://3.110.128.200:9000/uploads/';
    // const serverUrl = 'https://dakota-preventing-wales-propecia.trycloudflare.com/uploads/';

    // Gratia In House 
    const serverUrl = 'http://35.78.178.11:9000/uploads';

    return (
        <ImageContext.Provider value={{ serverUrl }}>
            {children}
        </ImageContext.Provider>
    );
};

export default ImageProvider;