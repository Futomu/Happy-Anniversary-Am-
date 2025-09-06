import React, { useState, useEffect } from 'react';

const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
];

const PhotoSlideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow">
            <img src={images[currentIndex]} alt="Anniversary" style={{ width: '100%', borderRadius: '10px' }} />
        </div>
    );
};

export default PhotoSlideshow;