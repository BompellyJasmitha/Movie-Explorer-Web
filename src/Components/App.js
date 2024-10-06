import { BrowserRouter, Routes, Route} from "react-router-dom";

import Movie from "../Pages/Movie";
import Subcards from '../Pages/subcards';

import '../style.css'
export default function App(){
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Movie/>} />
        <Route path="/subcards" element={<Subcards/>} />
    </Routes>    
    </BrowserRouter>
)}