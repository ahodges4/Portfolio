import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import mockFetch from "../mockApi";

// A canned transcript that "streams in" word by word while the demo is
// "recording", so the UI shows a live transcript without needing real
// microphone access, a websocket, or a backend.
const DEMO_TRANSCRIPT =
    "Today we're going to talk about how neural networks are trained. " +
    "We start with random weights and biases, feed forward some training data, " +
    "and measure how wrong the output is using a cost function. Then we use " +
    "gradient descent to nudge every weight and bias in the direction that " +
    "reduces that cost the fastest. Repeating this process across many examples " +
    "is what allows the network to gradually improve its predictions.";

// Create and export a functional component called "ReturnField"
export default function ReturnField(){
  
    // Variables
    const { audioStreamID } = useParams();

    // State variables
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const wordsRef = useRef(DEMO_TRANSCRIPT.split(" "));
    const wordIndexRef = useRef(0);
    const intervalRef = useRef(null);

    // Stop any running "recording" simulation on unmount, and let the mock
    // backend know the (fake) audio stream has been closed.
    useEffect(() => {
        const stopAudioStream = () => {
            mockFetch('http://127.0.0.1:5000/stopAudioStream/' + audioStreamID, {
                method: 'POST',
            });
        };

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            stopAudioStream();
        };
    }, [audioStreamID]);

    // Function that starts the simulated recording/transcription
    const handleStartRecording = () => {
        setIsRecording(true);
        setTranscript("");
        wordIndexRef.current = 0;

        // Reveal a few words of the demo transcript every second, mimicking a
        // transcript that fills in live as someone speaks.
        intervalRef.current = setInterval(() => {
            const words = wordsRef.current;
            wordIndexRef.current = Math.min(wordIndexRef.current + 3, words.length);
            setTranscript(words.slice(0, wordIndexRef.current).join(" "));

            if (wordIndexRef.current >= words.length) {
                clearInterval(intervalRef.current);
            }
        }, 1000);
    };

    // Function that stops the simulated recording
    const handleStopRecording = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRecording(false);
    };

    return (
      <div className="container">
        <div className="ReturnField--transcript">{transcript}</div>
        {isRecording ? (
          <button className="ReturnField--Stopbutton" onClick={handleStopRecording}>
            Stop Recording Speech
          </button>
        ) : (
          <button className="ReturnField--button" onClick={handleStartRecording}>
            Start Recording Speech
          </button>
        )}
        {audioStreamID}
      </div>
    );
}