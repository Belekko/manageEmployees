import { useContext, useEffect, useState } from 'react';
import Employee from './Employee';
import { Button, Modal, Alert } from 'react-bootstrap';
import { EmployeeContext } from '../contexts/EmployeeContext';
import AddForm from './Modals/AddModal/AddForm';
import Pagination from './Pagination';

const EmployeeList = () => {
  const { sortedEmployees } =
    useContext(EmployeeContext); /* useContext hook arkyluu sorted employees'ti alyp alabyz */

  const [showAlert, setShowAlert] = useState(false); /* Alert componentti korgozuuchu state */
  const [show, setShow] = useState(false); /* Modalka korsotkon komponent */
  const [currentPage, setCurrentPage] = useState(1); /* uchurdagy page */
  const employeesPerPage = 2; /* bir page'te kancha employees bolushun belgileit
   */

  const handleClose = () => setShow(false);/* bul func menen modalka jogotobuz */
  const handleShow = () => setShow(true);/* bul func menen modalka tiriltebiz */
  //const handleShowAlert = () => setShowAlert(true);

  const handleShowAlert = () => {/* alert functciyasy ishteit */
    setShowAlert(true);/* alert func ishtetti */
    setTimeout(() => {
      setShowAlert(false);/*  al emi bul api menen 2 sekundan kiin ocyushun kamsyzdadyk*/
    }, 2000);
  };

  useEffect(() => {/* ar bir sortedEmployees ozgorgon saiyn modalkany jogotot jana show alert kylat antkeni seccessfully updated degeni */
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [sortedEmployees]);

  // LOGIC OF PAGINATION

  const indexOfLastEmployee = currentPage * employeesPerPage;/* akyrky indexti taap alyshybyz kerek */
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;/* birinchi indexti taap alyshybyz kerek */
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);/* arry listtin ichinden birinchi index menen akryky index'ke tuuralap kesip alabyz */
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);/* jalpy massivdin sanynn bir page'te kancha element bolushu kerek degen tsifraga bolup koiobuz jana bizge ceil metodu menen tuuralap alabyz */
  return (
    <>
      <div className='table-title'>
        <div className='row'>
          <div className='col-sm-6'>
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className='col-sm-6'>
            <Button onClick={handleShow} className='btn btn-success text-white' data-toggle='modal'>
              <i className='material-icons'>&#xE147;</i> <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>
      {/* header blogu bolup eseptelinet */}

      <Alert show={showAlert} variant='success'>
        Employee List successfully updated!.
      </Alert>{/* bul jerde alert blogu bar al ar bir update bolgon saiyn ekranda react berip turat */}

      <table className='table table-striped table-hover'>{/* table'dyn jardamy menen bizge kerektuu employeestin tablitsasyn tuzup alabyz */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{/* bul jakta currentEmployees map'tyn jardamy menen render bolot datalar employee'ge jiberilip anyn ichinde datalar oz ozuncho render bolot */}
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <Employee employee={employee} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={sortedEmployees}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeList;

// .sort((a,b) => a.name.localeCompare(b.name))

// sort((a,b) => (a.name < b.name ? -1 : 1 ))
