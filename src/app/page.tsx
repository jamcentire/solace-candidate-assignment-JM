"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types"
import "./tableComponents.css"

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  let timeoutId: any;
  const debounceTime = 200 // debounce time for search in ms

  const refreshAdvocates = () => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }

  const doSearch = () => {
    setFilteredAdvocates(advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchText) ||
        advocate.lastName.toLowerCase().includes(searchText) ||
        advocate.city.toLowerCase().includes(searchText) ||
        advocate.degree.toLowerCase().includes(searchText) ||
        advocate.specialties.some((specialty) => specialty.toLowerCase().includes(searchText))
      );
    }));
  }

  useEffect(() => {
    console.log("fetching advocates...");
    refreshAdvocates();
  }, []);

  const onChange = (e) => {
    setSearchText(e.target.value.toLowerCase())
    console.log("filtering advocates...");

    // Add debouncing to keep from spamming updates while user is typing
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(doSearch, debounceTime)
  };

  const onClick = () => {
    console.log(advocates);
    refreshAdvocates();
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="pageHeader">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button className="resetButton" onClick={onClick}>Refresh Data</button>
      </div>
      <br />
      <br />
      <table>
        <thead className="tableHeaderRow">
          <tr>
            <td className="headerCell">First Name</td>
            <td className="headerCell">Last Name</td>
            <td className="headerCell">City</td>
            <td className="headerCell">Degree</td>
            <td className="headerCell">Specialties</td>
            <td className="headerCell">Years of Experience</td>
            <td className="headerCell">Phone Number</td>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td className="bodyCell">{advocate.firstName}</td>
                <td className="bodyCell">{advocate.lastName}</td>
                <td className="bodyCell">{advocate.city}</td>
                <td className="bodyCell">{advocate.degree}</td>
                <td className="bodyCell">
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td className="bodyCell">{advocate.yearsOfExperience}</td>
                <td className="bodyCell">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
