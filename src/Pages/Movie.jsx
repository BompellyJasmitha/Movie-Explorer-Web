import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState,useEffect } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Card from 'react-bootstrap/Card';
import {useNavigate } from "react-router-dom";

import { Toast } from 'react-bootstrap';

function Movie(){

let[api,setapi]=useState([])
let[search,setsearch]=useState("")
let navigate=useNavigate()
let [showToast, setShowToast] = useState(false);


useEffect(()=>{

 fetch("https://api.themoviedb.org/3/trending/movie/day?&api_key=8b477ffff04ed54c43f995309edbf33f&language=en-US%27")
 .then(res=>res.json()).then(res=>{setapi(res.results);

 })
 .catch(()=>console.log("Home Page API FAILED"))
},[])


let searching = () => {
  fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=8b477ffff04ed54c43f995309edbf33f`)
    .then(res => res.json())
    .then(x => {
      setapi(x.results);
      if (x.results.length === 0) {
        setShowToast(true); 
      }
    })
    .catch(() => console.log("Search API FAILED"));
};

  return (<div>
     {/* nav bar */}
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>

            <Nav.Link href="/">Home</Nav.Link>
            
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onKeyUp={searching}
              onChange={(e)=>setsearch(e.target.value)}
            />
            <Button onClick={searching} variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Carousel>
                {api.map((x,k1)=>{
                  return(<div key={k1}>
                          <img src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`}  alt=""/>
                          <div className='legend'>
                            <p>{x.title}</p>
                            <p>{x.overview}</p>
                            
                          </div>
                        </div>
                      )},[])}
    </Carousel>


    {/* cards */}

                
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
    {api.map((x,k2)=>{
      return(   
        
      <Card key={k2} style={{ width: '18rem' ,margin:"10px"}}>
        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${x.backdrop_path}`} />
        <Card.Body>
          <Card.Title>{x.title}</Card.Title>
          <Card.Text>{x.overview}</Card.Text>
          <Button onClick={()=>navigate("/subcards",{state:{x}})} variant="primary">More Details</Button>
        </Card.Body>
      </Card>)
    })}

  </div>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body style={{color:'black',width:'400px',height:'50px',fontSize:'20px'}}>No movies found for your search!</Toast.Body>
      </Toast>


   </div>);
}



export default Movie;







