import React, { useState, useEffect } from 'react';
import Wrong from './Pages/Wrong';

interface CurrencyData {
  code: string;
  value: number;
}

const App = () => {
  const [dataCurrency, setDataCurrency] = useState<{ [key: string]: CurrencyData }>({});
  const [error, setError] = useState('');



  function fetchData() {
    fetch('https://api.currencyapi.com/v3/latest?apikey=ZkEFE7R40sB3Kck3YouHlkZfUI4kSSBcuo8igtXM')
      .then(res => res.json())
      .then((dane: { rates?: { [key: string]: number } }) => {
        console.log(dane); // Log the response from the API
        if (dane.rates) {
          const formattedData: { [key: string]: CurrencyData } = {};
          Object.keys(dane.rates).forEach(code => {
            formattedData[code] = { code, value: dane.rates![code] };
          });
          setDataCurrency(formattedData);
         
        } else {
          setError('No currency rates found');
     
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setError('Error fetching data');
   
      });
  }

 

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>App</div>
      <button onClick={fetchData}>Fetch Data</button>

      {Object.keys(dataCurrency).length > 0 ? (
        Object.keys(dataCurrency).map((code, index) => {
          const dane = dataCurrency[code];
          return (
            <p key={index}>
              code: {dane.code} value: {dane.value}
            </p>
          );
        })
      ) : (
        <Wrong />
      )}
    </>
  );
};

export default App;
