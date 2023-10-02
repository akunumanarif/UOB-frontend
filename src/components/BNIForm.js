import React, { useState } from 'react';

const BNIForm = () => {
  const [oldAccountNumberPosition, setOldAccountNumberPosition] = useState('');
  const [newAccountNumberPosition, setNewAccountNumberPosition] = useState('');
  const [accountNumberPosition, setAccountNumberPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a request object
    const requestObject = {
      template: 'bni',
      oldAccountNumberPosition,
      newAccountNumberPosition,
      accountNumberPosition,
    };

    // TODO: Send the request to your API endpoint
    console.log('Submit BNI Form:', requestObject);
  };

  return (
    <div>
      <h2>BNI Form</h2>
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
          <label>Account Number Position:</label>
          <input
            type="number"
            value={accountNumberPosition}
            onChange={(e) => setAccountNumberPosition(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BNIForm;
