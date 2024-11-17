import EmployeeForm from './components/EmployeeForm';
import EmployeeData from './components/EmployeeData';

console.log('EmployeeForm:', EmployeeForm);
console.log('EmployeeData:', EmployeeData);

const App = () => (
    <div>
        <EmployeeForm />
        <EmployeeData />
    </div>
);

export default App;
