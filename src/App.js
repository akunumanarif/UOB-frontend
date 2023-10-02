import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [bniInput, setBniInputFile] = useState(null);
  const [mandiriInput, setMandiriInputFile] = useState(null);
  const [staticDataInput, setStaticDataInputFile] = useState(null);
  const [template, setTemplate] = useState('');
  const [oldAccountNumberPosition, setOldAccountNumberPosition] = useState('');
  const [newAccountNumberPosition, setNewAccountNumberPosition] = useState('');
  const [accountNumberPosition, setAccountNumberPosition] = useState('');
  const [additionalPosition, setAdditionalPosition] = useState('');
  const [output, setOutput] = useState('');

  const onBniFileChange = (e) => {
    setBniInputFile(e.target.files[0]);
  };

  const onStaticDataFileChange = (e) => {
    setStaticDataInputFile(e.target.files[0])
  };

  

  const handleSubmit = () => {
    // Handle form submission based on template and input data
    const formData = new FormData();
    formData.append('bniFile', bniInput);
    formData.append('staticDataFile', staticDataInput);

    const inputData = {
      oldAccountNumberPosition,
      newAccountNumberPosition,
      additionalPosition,
    };

    console.log('Template:', template);
    console.log('Input Data:', inputData);
    

    // Make an API request using axios
    // Replace 'API_ENDPOINT' with your actual API endpoint
    axios.post(`http://localhost:8081/api/bni/process?oldAccountNumberPosition=${oldAccountNumberPosition}&newAccountNumberPosition=${newAccountNumberPosition}&accountNumberPosition=${accountNumberPosition}`, formData, { params: inputData })
      .then(response => {
        // Handle response from the API
        console.log('API Response:', response.data);
        setOutput(response.data.outputUrl)
        console.log(response.data.outputUrl);
      })
      .catch(error => {
        // Handle errors
        console.error('API Error:', error);
      });
      
  };

  return (
    <div className="App">
      <h1>Payment App</h1>
      <div>
        <label>Select Template:</label>
        <select value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="">Select</option>
          <option value="bni">BNI Template</option>
          <option value="mandiri">Mandiri Template</option>
        </select>
      </div>
      <div>
        <label>Payment File:</label>
        <input
          type="file"
          accept={template === 'bni' ? '.csv' : '.txt'}
          onChange={onBniFileChange}
        />
      </div>
      <div>
        <label>Static Data File:</label>
        <input
          type="file"
          accept=".txt"
          onChange={onStaticDataFileChange}
        />
      </div>
      <div>
        <label>Old Account Number Position:</label>
        <input
          type="number"
          value={oldAccountNumberPosition}
          onChange={(e) => setOldAccountNumberPosition(Number(e.target.value))}
        />
      </div>
      <div>
        <label>New Account Number Position:</label>
        <input
          type="number"
          value={newAccountNumberPosition}
          onChange={(e) => setNewAccountNumberPosition(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Account Number Position:</label>
        <input
          type="number"
          value={accountNumberPosition}
          onChange={(e) => setAccountNumberPosition(Number(e.target.value))}
        />
      </div>
      {template === 'mandiri' && (
        <div>
          <label>Line Substring Start:</label>
          <input
            type="number"
            value={additionalPosition}
            onChange={(e) => setAdditionalPosition(Number(e.target.value))}
          />
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
      <a
        href={output}
        target="_blank"
        rel="noreferrer"

      >
        <button>Download output file</button>
      </a>
    </div>
  );
};

export default App;
