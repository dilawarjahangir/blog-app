"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutUser } from "../redux/slice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import ListGroup from "react-bootstrap/ListGroup";

function MyHeader() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]); // Clear the results if the query is empty
      return;
    }

    try {
      const response = await fetch(`/api/posts/search?q=${query}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        console.error("Failed to search posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
    <Navbar bg="dark" variant="dark" expand="lg" className="">
      <Container>
        <Navbar.Brand as={Link} href="/">
          InspireSphere
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex position-relative flex-grow-1 mx-4">
            <Form.Control
              type="text"
              placeholder="Search"
              className=""
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && searchResults.length > 0 && (
              <ListGroup className="position-absolute top-100 w-100 mt-2 z-50">
                {searchResults.map((result) => (
                  <ListGroup.Item key={result._id} className="bg-white">
                    <Link href={`/blog/${result._id}`} className="text-dark">
                      {result.title}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
          <Nav className="ml-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/blog">
              Blog
            </Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/create-blog">
                  Create Blog
                </Nav.Link>
                <button onClick={handleLogOut} className="btn btn-danger ms-3">
                  Log Out
                </button>
              </>
            ) : (
              <Nav.Link
                
                href="/login"
                className="btn btn-success ms-3"
              >
                Log-in
              </Nav.Link>
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
