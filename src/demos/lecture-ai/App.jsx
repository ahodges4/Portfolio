import './App.css';
import './style.css';
import Navbar from "./Components/Navbar"
import Main from "./Components/Main"

// .lecture-demo-app scopes style.css so its rules (including a `body`
// background override in the original file) can't leak into the rest of the
// portfolio site — see style.css, every rule there is now nested under this
// class.
function App() {
  return (
    <div>
      <p className="demo-disclaimer">
        This is a live demo running on precomputed sample data — no audio is
        actually recorded or sent anywhere.
      </p>
      <div className="App lecture-demo-app">
        <Navbar />
        <Main />
      </div>
    </div>
  );
}

export default App;


