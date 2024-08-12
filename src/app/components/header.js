"use client";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../redux/slice";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

function MyHeader() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(`Failed to logout: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link href="/" className="nav-link">
            InspireSphere
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/create-blog" className="nav-link">
                  Create Blog
                </Link>
                <button onClick={handleLogOut} className="btn btn-danger">
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-success">
                Log-in
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// Wrap only the CreateBlog component with Provider
export default function Header({ children }) {
  return (
    <Provider store={store}>
      <MyHeader />
      {children}
    </Provider>
  );
}
