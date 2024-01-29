import React from 'react';
import { ImageContext } from './imageContext';

const ImageProvider = ({ children }) => {
    // const serverUrl = 'https://attendance.gratiatechnology.com/uploads/';
    // const serverUrl = 'http://3.110.128.200:9000/uploads/';
    const serverUrl = 'https://va-toolbox-likes-lauderdale.trycloudflare.com/uploads/';

    return (
        <ImageContext.Provider value={{ serverUrl }}>
            {children}
        </ImageContext.Provider>
    );
};

export default ImageProvider;