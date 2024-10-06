import { BrowserRouter, Routes, Route} from "react-router-dom";

import Movie from "../Pages/Movie";
import Subcards from '../Pages/subcards';
import Error from "../Pages/Errorpg";

import '../style.css'
export default function App(){
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Movie/>} />
        <Route path="/subcards" element={<Subcards/>} />
        <Route path="*" element={<Error/>} />

    </Routes>    
    </BrowserRouter>
)}