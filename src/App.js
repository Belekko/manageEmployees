import EmployeeList from './components/EmployeeList';
import EmployeeContextProvider from './contexts/EmployeeContext';

function App() {
  
  return (
    <div className="App">

      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <EmployeeContextProvider> {/* //biz bul jerden contextke dostup taratabyz */}
              <EmployeeList /> {/* bizdin baardyk logica jana elementter kamtylgan komponenet
               */}
            </EmployeeContextProvider>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
