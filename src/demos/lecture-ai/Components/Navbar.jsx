import { Link, useLocation } from "react-router-dom"
import { DEMO_BASE } from "../basePath";

export default function Navbar(){
    const location = useLocation();

    const handleLinkClick = (e, to) => {
        if (location.pathname === to) {
            e.preventDefault();
            window.location.reload();
        }
    }

    return (
        <header className='header'>
            <div className="nav--container">
                
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link to={`${DEMO_BASE}/Transcripts`} className='nav--Link' onClick={(e) => handleLinkClick(e, `${DEMO_BASE}/Transcripts`)}>
                                Transcripts
                            </Link>
                        </li>
                        <li>
                            <Link to={`${DEMO_BASE}/QuestionGenerator`} className='nav--Link' onClick={(e) => handleLinkClick(e, `${DEMO_BASE}/QuestionGenerator`)}>
                                Question Generation
                            </Link>
                        </li>
                        <li>
                            <Link to={`${DEMO_BASE}/Lectureplayback`} className='nav--Link' onClick={(e) => handleLinkClick(e, `${DEMO_BASE}/Lectureplayback`)}>
                                Lecture  Playback
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
