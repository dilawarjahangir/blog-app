import Image from "next/image";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={`hero-section ${styles.section}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Welcome to my blogging app</h1>
            <p>
              Welcome to InspireSphere, your ultimate destination for insightful
              articles, creative ideas, and thought-provoking content. Our
              platform is designed to ignite your passion for writing and
              reading by providing a space where diverse voices and perspectives
              come together. Discover personalized content tailored to your
              interests, from technology and lifestyle to travel and health,
              while engaging with a vibrant community of writers and readers.
              Whether you are a seasoned blogger or a beginner, our intuitive
              publishing tools and multimedia integration make it easy to share
              your stories and ideas with the world.
            </p>
            <button className="btn btn-warning mx-1 ">Readt More</button>
            <button className="btn btn-outline-primary">Contact</button>
          </div>
          <div className="col-lg-6">
            <Image src="/img1.jpg" width={470} height={400} alt="image" />
          </div>
        </div>
      </div>
    </main>
  );
}
