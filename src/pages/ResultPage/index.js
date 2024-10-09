import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/json/confetti.json';
import './style.scss';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


const ResultPage = ({ score, totalQuestions, totalRounds, onRetry, scoringMode }) => {
    const navigate = useNavigate();

    const denominator = scoringMode === 'perQuestion' ? totalQuestions : totalRounds;

    const percentage = Math.round((score / denominator) * 100);

    let message;

    if (percentage === 100) {
        message = "Wow, you’re a superstar! 🌟 Keep shining!";
    } else if (percentage > 75) {
        message = "Awesome job! You're on your way to becoming a genius! 🚀";
    } else if (percentage > 50) {
        message = "Great effort! You're getting better and better! Keep it up! 👍";
    } else if (percentage > 25) {
        message = "Good try! Keep practicing, and you'll be a whiz in no time! 💪";
    } else {
        message = "Don’t give up! Practice makes perfect, and you’re doing great! 🌈";
    }

    const handleHomeClick = () => {
        onRetry();
        navigate('/game-map');
    };

    return (
        <div className="result-page">


            <div className="lottie">
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
            <h2>Your Score: {percentage}%</h2>
            <p>{message}</p>
            <div className="buttons-area">
                <button className="pushable-btn" onClick={handleHomeClick}>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front">
                        Back to Homepage
                    </span>
                </button>
                {percentage !== 100 && <button className="pushable-btn" onClick={onRetry}>
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front">
                        Try Again
                    </span>
                </button>}
            </div>
        </div>
    );
};
export default ResultPage;
