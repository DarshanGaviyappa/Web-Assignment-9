import React, { useState, useEffect } from "react";
import Card from "../../components/Cards/cards";
import Navbar from "../../components/Navbar/Navbar";
import "./Company.css";

function Company() {
  const [images, setImages] = useState([]); // Store images or error results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch images when the component is mounted
  useEffect(() => {
    async function fetchImages() {
      try {
        // Construct query string with filenames

        // Fetch images from the backend
        const response = await fetch(`http://localhost:3000/user/getAllImages`);

        // Check if response is OK
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        // Parse JSON response
        const data = await response.json();

        // Set the images in the state
        setImages(data.images);
        console.log(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchImages();
  }, []); // Empty dependency array means this runs once after initial render

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p className="error-message">{`Error: ${error}`}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
      {images.map((image, index) => (
  <img key={index} src={`data:${image.contentType};base64,${image.data}`} alt={`image-${index}`} />
))}

{/* {images.map((image, index) => (
  image.data ? (
    <img
      key={index}
      src={`data:${image.contentType};base64,${image.data}`}
      alt={`image-${index}`}
    />
  ) : (
    <p key={index}>Image data is missing</p>
  )
))} */}


      </div>
    </div>
  );
}

export default Company;
