import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Recording from '../pages/Recording';
import QuestionGenerator from '../pages/QuestionGenerator';
import LecturePlayback from '../pages/LecturePlayback';
import Transcripts from '../pages/Transcripts';

// Paths here are relative to wherever this demo is mounted in the parent
// app's router (see App.tsx: <Route path="/projects/lecture-ai/demo/*">).
function Main() {
    return (
        <Routes>
            <Route index element={<Navigate to="Transcripts" replace />} />
            <Route path='Transcripts' element={<Transcripts />}></Route>
            <Route path='Recording/:audioStreamID' element={<Recording />}></Route>
            <Route path='QuestionGenerator' element={<QuestionGenerator/>}></Route>
            <Route path='Lectureplayback' element={<LecturePlayback/>}></Route>
        </Routes>
    );
}

export default Main;