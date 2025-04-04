"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types"

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
        advocate.firstName.includes(searchText) ||
        advocate.lastName.includes(searchText) ||
        advocate.city.includes(searchText) ||
        advocate.degree.includes(searchText) ||
        advocate.specialties.includes(searchText)
      );
    }));
  }

  useEffect(() => {
    console.log("fetching advocates...");
    refreshAdvocates();
  }, []);

  const onChange = (e) => {
    setSearchText(e.target.value)
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
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead className="tableHeaderRow">
          <td>First Name</td>
          <td>Last Name</td>
          <td>City</td>
          <td>Degree</td>
          <td>Specialties</td>
          <td>Years of Experience</td>
          <td>Phone Number</td>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
