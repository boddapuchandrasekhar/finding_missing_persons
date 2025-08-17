import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import RegisterNewCase from './RegisterNewCase';
import AllCasesPage from './AllCasesPage';
import MatchCasesPage from './MatchCasesPage';
import HelpPage from './HelpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterNewCase />} />
          <Route path="all-cases" element={<AllCasesPage />} />
          <Route path="match" element={<MatchCasesPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
