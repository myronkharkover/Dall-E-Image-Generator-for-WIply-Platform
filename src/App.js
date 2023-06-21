/* eslint-disable jsx-a11y/img-redundant-alt */
// import logo from './knicksLogo.png';
// import img2 from './knicksDap.jpeg';
// import img3 from './knicksPlayers.jpeg';
// import img4 from './knicksPromo.jpeg';
import './App.css';
// import Banner from "./banner";
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  // const [timeCreated, setTimeCreated] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleGenerateClick = () => {
    const timestamp = new Date().toISOString();

    const requestBody = JSON.stringify({ body: prompt, gameId: "websiteTest1", timeGenerated: timestamp});

    // Set the headers to indicate JSON content
    const headers = {
      'Content-Type': 'application/json',
    };

    // Make an HTTP POST request to the Lambda function endpoint
    axios.post('https://9g6hwsnbu4.execute-api.us-east-1.amazonaws.com/Dev/stableDiffusionMyronNOTBROKEN', requestBody, { headers })
    .then(response => {
      // Assuming the response data contains the CloudFront link for the image
      const imageUrl = `https://d10bnmsvmjptwd.cloudfront.net/websiteTest1_${timestamp}_result.jpg`;
      setImageSrc(imageUrl);
    })  
    .catch(error => {
      console.error('Error:', error);
      setImageSrc('');
    });
  };
  
  return (
    <div className="App">
      {/* <Banner/> */}
      {/* <div className="App-header">
        <p>
          This is my Knicks Basketball Game. Have Fun!
        </p>
        <div className="image-container">
          <img src={logo} className="image" alt="image" />
          <img src={img2} className="image" alt="image" />
          <img src={img3} className="image" alt="image" />
          <img src={img4} className="image" alt="image" />
        </div>
      </div> */}
      <div className="App-header">
        <p>
          Prompt of Image You Want to Generate
        </p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '30%', padding: '10px' }}
        />

        <div>
          <button style={{ backgroundColor: '#5c12a6', color: 'white', fontSize: '20px', fontFamily: 'Courier-Bold' }} onClick={handleGenerateClick}>Generate</button>
        </div>

        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Generated Image" />
          </div>
        )}

        <div className="iframe-container">
          <p>
          Here is a sample game with the background set to an image I generated from this plugin with prompt:
          </p>
          <p>"house built in a huge Soap bubble, windows, doors, porches, awnings, middle of SPACE, cyberpunk lights, Hyper Detail, 8K, HD, Octane Rendering, Unreal Engine, V-Ray, full hd "</p>
          <iframe title="wiply-game" src="https://myron-680e6a.wiplify.com/" width="640px" height="700px"/>
        </div>

      </div>
    </div>
  );
}

export default App;
