import React, { useState } from 'react';

const MandiriForm = () => {
  const [oldAccountNumberPosition, setOldAccountNumberPosition] = useState('');
  const [newAccountNumberPosition, setNewAccountNumberPosition] = useState('');
  const [lineSubstringStart, setLineSubstringStart] = useState('');
  const [lineSubstringEnd, setLineSubstringEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a request object
    const requestObject = {
      template: 'mandiri',
      oldAccountNumberPosition,
      newAccountNumberPosition,
      lineSubstringStart,
      lineSubstringEnd,
    };

    // TODO: Send the request to your API endpoint
    console.log('Submit Mandiri Form:', requestObject);
  };

  return (
    <div>
      <h2>Mandiri Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Account Number Position:</label>
          <input
            type="number"
            value={oldAccountNumberPosition}
            onChange={(e) => setOldAccountNumberPosition(e.target.value)}
          />
        </div>
        <div>
          <label>New Account Number Position:</label>
          <input
            type="number"
            value={newAccountNumberPosition}
            onChange={(e) => setNewAccountNumberPosition(e.target.value)}
          />
        </div>
        <div>
          <label>Line Substring Start:</label>
          <input
            type="number"
            value={lineSubstringStart}
            onChange={(e) => setLineSubstringStart(e.target.value)}
          />
        </div>
        <div>
          <label>Line Substring End:</label>
          <input
            type="number"
            value={lineSubstringEnd}
            onChange={(e) => setLineSubstringEnd(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MandiriForm;
