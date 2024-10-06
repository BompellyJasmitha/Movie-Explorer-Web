import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style.css"
import YouTube from 'react-youtube';

import { Toast } from 'react-bootstrap';

export default function Subcards() {
  let [trailers, setTrailers] = useState("");
  let [showToast, setShowToast] = useState(false); 
  let location = useLocation();
  let specificMovie = location.state.x;

  async function Trailer(id) {
    fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=8b477ffff04ed54c43f995309edbf33f`)
      .then(x => x.json())
      .then(x => {
        if (x.results.length === 0) {
          setShowToast(true); 
        } else {
          setTrailers(x.results[0].key);
        }
      })
      .catch(() => console.log("API FAILED"));
  }

  return (
    <div className="subcardsdiv">
      <h1>{specificMovie.title}</h1>
      <p>(Original Movie: {specificMovie.original_title})</p>
      <p id="rating">Rating: {specificMovie.vote_average}</p>
      <img  className="subcardsimg" src={`https://image.tmdb.org/t/p/original/${specificMovie.backdrop_path}`} alt="" />
    
      <h4>{specificMovie.overview}</h4>

      <button onClick={() => Trailer(specificMovie.id)}>Click for trailer</button>
      <div id="trailer">
        {trailers && <YouTube videoId={trailers} />}
      </div>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body style={{color:'black',width:'400px',height:'50px',fontSize:'20px'}}>No trailer found for this movie!</Toast.Body>
      </Toast>
    </div>
  );
}
