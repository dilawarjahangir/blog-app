"use client";
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  return (
    <Navbar  data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand > 

          <Link href="/" className='nav-link' >InspireSphere</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Link href="/" className='nav-link' >Home</Link>
          <Link href="/about" className='nav-link' >About</Link>
          <Link href="/services" className='nav-link' >Services</Link>
          <Link href="/blog" className='nav-link' >Blog</Link>
          <Link href="/contact" className='nav-link' >Contact</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
