import { FaUpload, FaCheckCircle, FaImage } from 'react-icons/fa'; // Icons for upload and image
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      <h1 className="page-title">How DermInsight Works</h1>
      <p className="intro-text">
        DermInsight uses AI to diagnose Psoriasis and Eczema by analyzing images of your affected skin condition. You can upload a clear image of the affected area to get a quick diagnosis.
      </p>

      <div className="steps-container">
        <div className="step">
          <FaImage className="step-icon" />
          <h2 className="step-title">Step 1: Upload Your Image</h2>
          <p className="step-description">
            Take a clear picture of the affected area. Make sure the area is well-lit and in focus for accurate results.
          </p>
        </div>

        <div className="step">
          <FaCheckCircle className="step-icon" />
          <h2 className="step-title">Step 2: Review Image</h2>
          <p className="step-description">
            Ensure the affected area is clearly visible in the uploaded image. The area should be well-lit and free from obstructions.
          </p>
        </div>

        <div className="step">
          <FaUpload className="step-icon" />
          <h2 className="step-title">Step 3: Submit the Image</h2>
          <p className="step-description">
            Once you&apos;ve reviewed the image, click &quot;Submit&quot; to send the image for AI-based analysis.
          </p>
        </div>

        <div className="step">
          <FaCheckCircle className="step-icon" />
          <h2 className="step-title">Step 4: View the Results</h2>
          <p className="step-description">
            Our AI will analyze the image and provide a diagnosis within seconds.
          </p>
        </div>
      </div>

      <div>
      <p className="disclaimer-text">
      Note: DermInsight is an AI-based tool and should not be used as a substitute for professional medical advice.
    </p>
      </div>
    </div>
  );
};

export default HowItWorksPage;
