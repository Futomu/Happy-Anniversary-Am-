import React, { useRef, useState } from 'react';

const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="music-player">
            <h2>เพลงที่คุณชอบ</h2>
            <audio ref={audioRef} loop>
                <source src="your-music-file.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={togglePlay}>
                {isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
            </button>
        </div>
    );
};

export default MusicPlayer;