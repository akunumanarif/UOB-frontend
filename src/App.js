import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bniInput, setBniInputFile] = useState(null);
  const [mandiriInput, setMandiriInputFile] = useState(null);
  const [staticDataInput, setStaticDataInputFile] = useState(null);
  const [template, setTemplate] = useState('');
  const [oldAccountNumberPosition, setOldAccountNumberPosition] = useState('');
  const [newAccountNumberPosition, setNewAccountNumberPosition] = useState('');
  const [accountNumberPosition, setAccountNumberPosition] = useState('');
  const [lineSubstringStart, setlineSubstringStart] = useState('');
  const [lineSubstringEnd, setlineSubstringEnd] = useState('');
  const [output, setOutput] = useState('');
  const [url, setUrl] = useState("");



  const onBniFileChange = (e) => {
    setBniInputFile(e.target.files[0]);
  };

  const onMandiriFileChange = (e) => {
    setMandiriInputFile(e.target.files[0]);
  }

  const onStaticDataFileChange = (e) => {
    setStaticDataInputFile(e.target.files[0])
  };


  useEffect(() => {
    if(template === "bni") {
      setUrl(`http://localhost:8081/api/bni/process?oldAccountNumberPosition=${oldAccountNumberPosition}&newAccountNumberPosition=${newAccountNumberPosition}&accountNumberPosition=${accountNumberPosition}`)
    } else if(template === "mandiri") {
      setUrl(`http://localhost:8081/api/mandiri/process?oldAccountNumberPosition=${oldAccountNumberPosition}&newAccountNumberPosition=${newAccountNumberPosition}&lineSubstringStart=${lineSubstringStart}&lineSubstringEnd=${lineSubstringEnd}`)
    }
  }, [oldAccountNumberPosition, newAccountNumberPosition, accountNumberPosition, lineSubstringStart, lineSubstringEnd, template])
  

 


  const handleSubmit = () => {
    // Handle form submission based on template and input data
    const formData = new FormData();

    // handleUrlChoose()
    const handleFormInput = () => {
      if (template === "bni") {
        formData.append('bniFile', bniInput);
        formData.append('staticDataFile', staticDataInput);
      } else if (template === "mandiri") {
        formData.append('mandiriFile', mandiriInput);
        formData.append('staticDataFile', staticDataInput);
      }
    }

    handleFormInput()


    // Make an API request using axios
    axios.post(url, formData)
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

  console.log(url)
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
      {template === "bni" && (
        <div>
          <div>
            <label>Payment File:</label>
            <input
              type="file"
              accept={template === 'bni' && '.csv'}
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
        </div>
      )}

      {template === 'mandiri' && (
        <div>
          <div>
            <label>Payment File:</label>
            <input
              type="file"
              accept={template === 'mandiri' && '.txt'}
              onChange={onMandiriFileChange}
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
            <label>Line Substring start Position:</label>
            <input
              type="number"
              value={lineSubstringStart}
              onChange={(e) => setlineSubstringStart(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Line Substring end Position:</label>
            <input
              type="number"
              value={lineSubstringEnd}
              onChange={(e) => setlineSubstringEnd(Number(e.target.value))}
            />
          </div>
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
