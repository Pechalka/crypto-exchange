import React from 'react';

import { Routes, Route } from "react-router-dom";
import Market from './pages/Market';

const App = () => {
  return (
    <Routes>
      <Route index element={<Market />} />
    </Routes>
  );
};

export default App;
