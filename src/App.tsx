import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <div>
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
