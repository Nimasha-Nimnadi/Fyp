import { useRef, useState } from "react";
import "./Home.css";
import e from "../assets/e.jpg";
import p from "../assets/p.png";
import do3 from "../assets/do3.jpg";

export default function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPredict, setloadingPredict] = useState(false);

  const handleImageChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image (JPEG or PNG).");
      setLoading(false);
      return;
    }
    setSelectedImage(file);
    setLoading(false);
  };

  const handlePredict = async () => {
    setloadingPredict(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    try {
      const modelRes = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });
      const data = await modelRes.json();
      if (data.success === false) {
        setError(data.message);
        setloadingPredict(false);
        return;
      }
      setResult(data);
      setloadingPredict(false);
    } catch (error) {
      setloadingPredict(false);
      setError(error.message);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const closeImage = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          className="home-image"
          src={do3} // Update this to your actual image path
          alt="Home background"
        />
        <div className="hero-content">
          <h1 className="hero-title">DermaInsight</h1>
          <h2 className="hero-subtitle">AI Skin Care Companion</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          <button
            disabled={loading || selectedImage}
            onClick={handleImageUpload}
            className="upload-button1"
          >
            {loading ? "Loading..." : "Upload Skin Image"}
          </button>

          {selectedImage && (
            <div className="image-preview">
              <div className="image-preview-content">
                <button onClick={closeImage} className="close-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="close-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded Image"
                  className="uploaded-image"
                />
                {result ? (
                  <p className="result-text">Disease: {result.class}</p>
                ) : error ? (
                  <span className="error-text">{error}</span>
                ) : (
                  ""
                )}

                <button
                  disabled={loadingPredict}
                  onClick={handlePredict}
                  className="predict-button"
                >
                  {loadingPredict ? "Loading..." : "Predict"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Example Skin Disease Images Section */}
      <div className="example-images-section">
        <h3 className="example-title">Sample Images for Diagnosis</h3>
        <div className="example-images">
          <div className="example-image">
            <img src={p} alt="Psoriasis" />
            <p className="image-caption">Psoriasis</p>
          </div>
          <div className="example-image">
            <img src={e}alt="Eczema" />
            <p className="image-caption">Eczema</p>
          </div>
        </div>
      </div>

    </div>
  );
}
