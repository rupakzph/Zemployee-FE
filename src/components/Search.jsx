import React, { useEffect } from 'react';
import '../styles/search.css';
import { useState } from 'react';
export const Search = () => {
  const [employee, setEmployee] = useState('');
  const [department, setDepartment] = useState('');
  const [jsonData, setJsonData] = useState([]);

  const departData = localStorage.getItem('department');
  const departResult = JSON.parse(departData);

  const empData = localStorage.getItem('employee');
  const empResult = JSON.parse(empData);

  useEffect(() => {
    const fetchData = async () => {
      // if (!employee && !department) {
      //   setJsonData([]); // No inputs, set empty array
      //   return;
      // }

      const filteredData = empResult.filter(
        (obj) =>
          obj.firstName.includes(employee) &&
          obj.department.includes(department)
      );

      setJsonData(filteredData);
    };

    fetchData();
  }, [employee, department]);

  return (
    <>
      {/* Search bar  */}
      <div className="search">
        <form className="search-form">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="department"
          >
            {departResult.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="employee"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            placeholder="Employee name"
          />
        </form>
      </div>

      {/* user detail */}
      {jsonData.map((item) => (
        <a
          href={`employee/${item.firstName}`}
          className="emp-detail-wrapper"
          key={item.id}
        >
          <div className="emp-detail">
            <div className="emp-info">
              <div className="emp-name-designation">
                <h1 className="emp-info-name">
                  {item.firstName} {item.lastName}
                </h1>
                <p className="emp-info-post">{item.designation}</p>
              </div>
              <div className="emp-profile-department">
                <div className="circular--portrait">
                  <img src={item.imageUrl || '/images/userprofile.svg'} />
                </div>
                <p className="emp-department-name">{item.department}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default Search;
