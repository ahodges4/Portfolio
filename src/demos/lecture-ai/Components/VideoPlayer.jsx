import React, {useState} from "react";
import QuestionGrid from "./QuestionGrid";
import mockFetch from "../mockApi";

// VideoPlayer no longer embeds the video. Since we can't track real playback
// progress without an embedded player, questions are now triggered manually
// by the user working through each transcript segment in order, rather than
// automatically at time intervals.
export default function VideoPlayer(props) {
    const {lecture_data, transcripts, model} = props;

    const [currentTranscript, setCurrentTranscript] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);
    const [questionData, setQuestionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const openVideoInNewTab = () => {
        window.open(lecture_data.lecture_url, "_blank", "noopener,noreferrer");
    }

    // Fetches (mock) generated questions for the current transcript segment
    const handleGenerateQuestions = () => {
        setIsLoading(true);
        mockFetch(`http://127.0.0.1:5000/generateTranscriptQuestions/${transcripts[currentTranscript]["id"]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": model
            })
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            if (Object.keys(data).length !== 0 && data["error"] == null) {
                setQuestionData(data);
                setShowQuestions(true);
            }
        })
        .catch(error => {
            setIsLoading(false);
            console.error(error);
        })
    }

    // Called when the user finishes a set of questions and moves on
    const handleQuestionContinue = () => {
        setShowQuestions(false);
        setQuestionData(null);
        const next = currentTranscript + 1;
        if (next >= transcripts.length) {
            setIsFinished(true);
        } else {
            setCurrentTranscript(next);
        }
    }

    const restartVideo = () => {
        setCurrentTranscript(0);
        setShowQuestions(false);
        setQuestionData(null);
        setIsFinished(false);
    }

    return (
        <div>
            {!showQuestions && !isFinished && (
                <div className="VideoPlayer--VideoElement">
                    <h3>{lecture_data.lecture_title}</h3>
                    <p>
                        Segment {currentTranscript + 1} of {transcripts.length}
                    </p>
                    <button onClick={openVideoInNewTab}>
                        Watch on YouTube
                    </button>
                    <button onClick={handleGenerateQuestions} disabled={isLoading}>
                        {isLoading ? "Generating questions…" : "Show Questions for This Segment"}
                    </button>
                </div>
            )}

            {showQuestions && questionData && (
                <div>
                    <QuestionGrid questions={questionData} />
                    <button className="VideoPlayer--QuestionsContinueButton" onClick={handleQuestionContinue}>
                        Continue
                    </button>
                </div>
            )}

            {isFinished && (
                <div className="VideoPlayer--VideoElement">
                    <h3>All segments complete</h3>
                    <button onClick={restartVideo}>Restart</button>
                </div>
            )}
        </div>
    );
}