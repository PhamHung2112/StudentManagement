import React, { useEffect } from 'react';
import cityApi from './api/cityApi';

function App() {
  useEffect(() => {
    (async () => {
      const response: any = await cityApi.getAll();
      console.log(response);
    })();
  }, []);
  return <div className="App"></div>;
}

export default App;
