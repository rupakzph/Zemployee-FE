import React, { useEffect } from 'react';
import '../styles/search.css';
import { useState } from 'react';
export const Search = (props) => {
  const [employee, setEmployee] = useState(props.name);
  const [department, setDepartment] = useState('');
  const [jsonData, setJsonData] = useState([]);

  const departData = localStorage.getItem('department');
  const departResult = JSON.parse(departData);

  const empData = localStorage.getItem('employee');
  const empResult = JSON.parse(empData);

  //   const teamLeadData = localStorage.getItem('teamlead');
  //   const teamLeadResult = JSON.parse(teamLeadData);

  const handleItemClick = (param) => {
    setEmployee(param);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!employee && !department) {
        setJsonData([]); // No inputs, set empty array
        return;
      }

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
        <div className="emp-detail" key={item.id}>
          <div className="emp-info">
            <div>
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

          <div className="employee-wrapper">
            <div className="employee-flex">
              <div>
                <h2 className="employee-flex-heading">Emplopyee Details</h2>
                <div className="employee-flex-detail">
                  <p className="employee-flex-gender">Gender: {item.gender}</p>
                  <p className="employee-flex-dob">Date of birth: 08/03/2002</p>
                  <p className="employee-flex-country">
                    Nationality: {item.nationality}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="employee-flex-cheading">Contact Details</h2>
                <div className="employee-flex-detail">
                  <p className="employee-flex-number">
                    Phone number: {item.phoneNumber}
                  </p>
                  <p className="employee-flex-email">
                    Email address: {item.email}
                  </p>
                  <p className="employee-flex-address">
                    Permanent address: {item.address}
                  </p>
                </div>
              </div>
            </div>

            {/* subordinate detail */}
            <div className="sub-employee">
              {item.subordinate.length > 0 && (
                <h2 className="sub-employee-heading">Subordinate</h2>
              )}
              <div className="sub-employee-grid">
                {item.subordinate.map((subordinate) => (
                  <div
                    key={subordinate.id}
                    className="sub-employee-item"
                    onClick={() => handleItemClick(subordinate.firstName)}
                  >
                    <img
                      src={
                        subordinate.featuredImageUrl ||
                        '/images/userprofile.svg'
                      }
                      alt="background"
                      className="emp-img"
                    />
                    <div className="sub-employee-item-detail">
                      <h2 className="sub-employee-item-detail-name">
                        {subordinate.firstName} {subordinate.lastName}
                      </h2>
                      <p className="sub-employee-item-detail-post">
                        {subordinate.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Search;

//   {/* teamlead detail */}
//   <div className="team-lead-container">
//     {teamLeadResult.map((item) => (
//       <a
//         className="team-lead"
//         key={item.id}
//         onClick={() => handleItemClick(item.teamlead)}
//       >
//         <img className="team-lead-img" src={item.imageUrl} alt="" />
//         <div className="team-lead-des">
//           <h1>{item.teamlead}</h1>
//           <p>
//             {item.team}, {item.designation}
//           </p>
//         </div>
//       </a>
//     ))}
//   </div>
