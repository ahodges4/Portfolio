// mockApi.js
//
// A lightweight in-memory stand-in for the Flask backend (http://127.0.0.1:5000).
// It lets the whole app run purely in the browser for demo purposes - no server
// required. All "requests" resolve against plain JS arrays kept in memory, so
// nothing is persisted: a page refresh resets everything back to the sample data
// below.
//
// Every component in the app already talks to the backend using the standard
// fetch() pattern: fetch(url, options).then(r => r.json()).then(data => ...).
// mockFetch() mimics that exact shape (an object with a .json() method that
// resolves to data) so no other code has to change beyond swapping `fetch` for
// `mockFetch`.

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

let transcripts = [
    {
        id: 1,
        transcript_name: "Intro to Neural Networks",
        transcript:
            "Neural networks are computing systems loosely inspired by biological brains. They consist of layers of interconnected nodes, or neurons, each of which applies a weighted sum followed by an activation function. Through a process called backpropagation, the network adjusts its weights to minimize the difference between its predictions and the correct answers. This lecture covers the perceptron, the basic building block of deep learning, and how stacking many layers allows a network to approximate complex functions.",
    },
    {
        id: 2,
        transcript_name: "Supervised vs Unsupervised Learning",
        transcript:
            "Machine learning problems generally fall into two broad categories. In supervised learning, a model is trained on labeled examples, learning to map inputs to known outputs, with common tasks including classification and regression. In unsupervised learning, the model looks for structure in unlabeled data, such as clustering similar points together or reducing the dimensionality of a dataset. This lecture compares the two approaches and discusses when each is appropriate.",
    },
    {
        id: 3,
        transcript_name: "Gradient Descent Explained",
        transcript:
            "Gradient descent is an optimization algorithm used to minimize a loss function by iteratively moving in the direction of steepest descent. The learning rate controls the size of each step: too large and the algorithm may diverge, too small and training becomes painfully slow. Variants such as stochastic gradient descent and Adam introduce randomness and adaptive learning rates to speed up convergence on large datasets.",
    },
    {
        id: 4,
        transcript_name: "Convolutional Neural Networks",
        transcript:
            "Convolutional neural networks, or CNNs, are especially well suited to image data. Instead of connecting every neuron to every pixel, a CNN slides small filters across the image to detect local patterns like edges and textures. Stacking convolutional layers lets the network build increasingly abstract representations, from simple edges in early layers to complex object parts in later layers, while pooling layers reduce spatial size and add robustness to small translations.",
    },
    {
        id: 5,
        transcript_name: "Backpropagation Walkthrough",
        transcript:
            "Backpropagation is the algorithm that computes how a network's cost function changes with respect to every weight and bias. Starting at the output layer, the error is propagated backward through the network using the chain rule, layer by layer. Each nudge to a weight is weighted by how much that connection contributed to the overall error, which is what allows a network with thousands of parameters to be trained efficiently using gradient descent.",
    },
];

let lectures = [
    {
        id: 1,
        lecture_title: "But what is a neural network?",
        lecture_url: "https://www.youtube.com/watch?v=aircAruvnKk",
    },
    {
        id: 2,
        lecture_title: "Gradient descent, how neural networks learn",
        lecture_url: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
    },
    {
        id: 3,
        lecture_title: "What is backpropagation really doing?",
        lecture_url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U",
    },
];

// Maps lectures to the transcripts that make up their playback timeline
let lectureTranscripts = [
    { lecture_id: 1, transcript_id: 1 },
    { lecture_id: 1, transcript_id: 2 },
    { lecture_id: 2, transcript_id: 3 },
    { lecture_id: 3, transcript_id: 4 },
    { lecture_id: 3, transcript_id: 5 },
];

let nextTranscriptId = transcripts.length + 1;
let nextLectureId = lectures.length + 1;

// A small rotating bank of canned MCQ sets returned by "question generation".
// Real generation is unpredictable, so for a demo we just cycle through a
// handful of hand-written examples that look like real output.
const questionBank = [
    {
        questions: [
            {
                id: "q1-1",
                question_statement: "What is the basic building block of a neural network called?",
                options: ["A neuron", "A packet", "A register", "A pointer"],
                answer: "A neuron",
                context:
                    "Neural networks are built from simple units called neurons, each applying a weighted sum and an activation function.",
            },
            {
                id: "q1-2",
                question_statement: "What algorithm is used to update a network's weights during training?",
                options: ["Backpropagation", "Binary search", "Quicksort", "DNS lookup"],
                answer: "Backpropagation",
                context:
                    "Backpropagation computes how much each weight contributed to the error, allowing gradient descent to adjust weights efficiently.",
            },
            {
                id: "q1-3",
                question_statement: "Stacking many layers allows a network to do what?",
                options: [
                    "Approximate complex functions",
                    "Reduce file size",
                    "Encrypt data",
                    "Compile faster",
                ],
                answer: "Approximate complex functions",
                context: "Depth lets a network represent increasingly abstract, non-linear relationships in data.",
            },
        ],
    },
    {
        questions: [
            {
                id: "q2-1",
                question_statement: "In supervised learning, what is the model trained on?",
                options: ["Labeled examples", "Random noise", "Unlabeled clusters", "Compiled binaries"],
                answer: "Labeled examples",
                context: "Supervised learning uses input/output pairs so the model can learn the mapping between them.",
            },
            {
                id: "q2-2",
                question_statement: "Which task is typically unsupervised?",
                options: ["Clustering", "Classification", "Regression", "Translation"],
                answer: "Clustering",
                extra_options: ["Compression"],
                context: "Clustering groups similar unlabeled data points together without predefined categories.",
            },
            {
                id: "q2-3",
                question_statement: "What does the learning rate control in gradient descent?",
                options: ["The size of each update step", "The number of layers", "The dataset size", "The file format"],
                answer: "The size of each update step",
                context: "A learning rate that is too large can cause divergence; too small makes training very slow.",
            },
        ],
    },
    {
        questions: [
            {
                id: "q3-1",
                question_statement: "What makes CNNs well suited to image data?",
                options: [
                    "They slide filters across the image to detect local patterns",
                    "They sort pixels alphabetically",
                    "They store images as text",
                    "They ignore spatial structure",
                ],
                answer: "They slide filters across the image to detect local patterns",
                context: "Convolutional filters detect local patterns like edges, which combine into more abstract features in deeper layers.",
            },
            {
                id: "q3-2",
                question_statement: "What is the purpose of a pooling layer in a CNN?",
                options: [
                    "Reduce spatial size and add robustness to translation",
                    "Increase the learning rate",
                    "Store the model on disk",
                    "Encrypt the weights",
                ],
                answer: "Reduce spatial size and add robustness to translation",
                context: "Pooling layers downsample feature maps, making the network more efficient and less sensitive to small shifts.",
            },
            {
                id: "q3-3",
                question_statement: "Backpropagation applies which mathematical rule layer by layer?",
                options: ["The chain rule", "The pigeonhole principle", "L'Hopital's rule", "Bayes' theorem"],
                answer: "The chain rule",
                context: "The chain rule lets the error be propagated backward through each layer to compute gradients efficiently.",
            },
        ],
    },
];

function pickQuestionSet(id) {
    const n = Math.abs(Number(id)) || 0;
    return questionBank[n % questionBank.length];
}

// ---------------------------------------------------------------------------
// Fetch-shaped response helpers
// ---------------------------------------------------------------------------

function respond(data, ms = 250) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                json: () => Promise.resolve(data),
            });
        }, ms);
    });
}

// ---------------------------------------------------------------------------
// mockFetch(url, options) - drop-in replacement for fetch()
// ---------------------------------------------------------------------------

export default function mockFetch(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const path = url.replace("http://127.0.0.1:5000", "");
    const body =
        options.body && typeof options.body === "string" ? JSON.parse(options.body) : null;

    let m;

    // GET /lectures
    if (path === "/lectures" && method === "GET") {
        return respond(lectures);
    }

    // GET /lecture_transcripts
    if (path === "/lecture_transcripts" && method === "GET") {
        return respond(lectureTranscripts);
    }

    // DELETE /lectures/:id
    if ((m = path.match(/^\/lectures\/(\d+)$/)) && method === "DELETE") {
        const id = Number(m[1]);
        lectures = lectures.filter((l) => l.id !== id);
        lectureTranscripts = lectureTranscripts.filter((lt) => lt.lecture_id !== id);
        return respond({ success: true });
    }

    // POST /newLecture
    if (path === "/newLecture" && method === "POST") {
        const newLecture = {
            id: nextLectureId++,
            lecture_title: body.lecture_title,
            lecture_url: body.lecture_url,
        };
        lectures.push(newLecture);
        (body.transcript_ids || []).forEach((tid) => {
            lectureTranscripts.push({ lecture_id: newLecture.id, transcript_id: Number(tid) });
        });
        return respond(newLecture);
    }

    // PUT /changeLectureRecording
    if (path === "/changeLectureRecording" && method === "PUT") {
        const idx = lectures.findIndex((l) => l.id === body.lecture_id);
        if (idx !== -1) {
            lectures[idx] = {
                ...lectures[idx],
                lecture_title: body.lecture_title,
                lecture_url: body.lecture_url,
            };
        }
        lectureTranscripts = lectureTranscripts.filter((lt) => lt.lecture_id !== body.lecture_id);
        (body.transcript_ids || []).forEach((tid) => {
            lectureTranscripts.push({ lecture_id: body.lecture_id, transcript_id: Number(tid) });
        });
        return respond({ success: true });
    }

    // GET /transcripts
    if (path === "/transcripts" && method === "GET") {
        return respond(transcripts);
    }

    // GET /transcripts/:id
    if ((m = path.match(/^\/transcripts\/(\d+)$/)) && method === "GET") {
        const id = Number(m[1]);
        const found =
            transcripts.find((t) => t.id === id) || {
                id,
                transcript_name: `Transcript ${id}`,
                transcript: "No transcript available yet.",
            };
        return respond(found);
    }

    // DELETE /transcripts/:id
    if ((m = path.match(/^\/transcripts\/(\d+)$/)) && method === "DELETE") {
        const id = Number(m[1]);
        transcripts = transcripts.filter((t) => t.id !== id);
        lectureTranscripts = lectureTranscripts.filter((lt) => lt.transcript_id !== id);
        return respond({ success: true });
    }

    // PUT /transcripts/:id
    if ((m = path.match(/^\/transcripts\/(\d+)$/)) && method === "PUT") {
        const id = Number(m[1]);
        const idx = transcripts.findIndex((t) => t.id === id);
        if (idx !== -1) {
            transcripts[idx] = {
                ...transcripts[idx],
                transcript: body.transcript,
                transcript_name: body.transcript_name,
            };
        }
        return respond({ success: true });
    }

    // POST /transcripts (create)
    if (path === "/transcripts" && method === "POST") {
        const newTranscript = {
            id: nextTranscriptId++,
            transcript_name: body.transcript_name,
            transcript: body.transcript,
        };
        transcripts.push(newTranscript);
        return respond(newTranscript);
    }

    // POST /generateTranscriptQuestions/:id  (note: VideoPlayer.js has a stray
    // trailing "}" in its URL in the original code - the regex tolerates it)
    if (
        (m = path.match(/^\/generateTranscriptQuestions\/(\d+)\}?$/)) &&
        method === "POST"
    ) {
        return respond(pickQuestionSet(m[1]), 600);
    }

    // POST /openAudioStream
    if (path === "/openAudioStream" && method === "POST") {
        return respond({ audioStreamID: "demo-stream-" + Date.now(), port: 5001 });
    }

    // POST /stopAudioStream/:id
    if (path.startsWith("/stopAudioStream/") && method === "POST") {
        return respond({ success: true });
    }

    // POST /generateTranscriptFromFile
    if (path === "/generateTranscriptFromFile" && method === "POST") {
        return respond({ success: true, message: "File processed (demo mode)" });
    }

    console.warn("mockFetch: unhandled request", method, path);
    return respond({});
}