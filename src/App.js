import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Dashbord, Register, Landing, Error} from './pages'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}
//19-login user-002

export default App;
