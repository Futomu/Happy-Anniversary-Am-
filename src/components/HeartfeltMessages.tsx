import React from 'react';
import './HeartfeltMessages.css'; // Assuming you have a CSS file for styling

const messages = [
    "Happy Anniversary! Every moment with you is a treasure.",
    "Together is a wonderful place to be.",
    "Here's to another year of love, laughter, and happiness.",
    "You make my heart smile every day.",
    "Cheers to the beautiful journey we are on together!",
];

const HeartfeltMessages: React.FC = () => {
    return (
        <div className="heartfelt-messages">
            <h2>Heartfelt Messages</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index} className="message-item">
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeartfeltMessages;