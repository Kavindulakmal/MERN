import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>welcome to Home page</h1>
        <button className='users-button' onClick={()=> navigate('/users')}>Home</button>
      </header>
    </div>
  );
}

export default App;
