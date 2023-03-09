import React, { useState } from 'react';
import axios from 'axios';

function TextTo() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState(null);

  const convertTextToSpeech = () => {
    const options = {
      method: 'POST',
      url: 'https://joj-text-to-speech.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'd1c142c26cmshccf127f92d6ef22p176a9cjsn8e0e60d3ebc7',
        'X-RapidAPI-Host': 'joj-text-to-speech.p.rapidapi.com'
      },
      data: {
        input: { text },
        voice: { languageCode: 'es-US', name: 'es-US-Neural2-B', ssmlGender: 'MALE' },
        audioConfig: { audioEncoding: 'MP3' }
      }
    };

    axios.request(options)
      .then(function (response) {
        const audioUrl = response.data.audioContent;
        setAudioUrl(`data:audio/mp3;base64,${audioUrl}`);
        setError(null);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#ECEFF1' }}>
      <h1 style={{ marginBottom: '20px' }}>Text-to-Speech Demo</h1>
      <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ marginBottom: '20px', width: '80%', height: '200px' }}></textarea>
      <button onClick={convertTextToSpeech} style={{ padding: '10px 20px', backgroundColor: '#FF6F00', color: '#FFFFFF', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Play</button>
      {error && <div style={{ marginTop: '20px', color: '#D50000' }}>Error: {error}</div>}
      {audioUrl && <audio controls src={audioUrl} style={{ marginTop: '20px' }}></audio>}
    </div>
  );
}

export default TextTo;
