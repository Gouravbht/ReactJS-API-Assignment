import React, { useState, useEffect } from "react";
import axios from "axios";

const Herosection = () => {
  const [selectedQuarter, setSelectedQuarter] = useState("Quartile-1");
  const [quarterData, setQuarterData] = useState([]);

  const handleQuarterChange = async (event) => {
    const selectedQuarter = event.target.value;
    setSelectedQuarter(selectedQuarter);
  };

  useEffect(() => {
    const fetchQuarterData = async () => {
      try {
        const response = await axios.get(`/.netlify/functions/getQuarterData`);
        setQuarterData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuarterData();
  }, [selectedQuarter]);

  return (
    <>
      <div className=" h-60 w-24 md:w-60 absolute top-24 md:top-48 left-52 rounded-full blur-3xl bg-blue-500 opacity-90 "></div>
      <div className="h-60 w-60 absolute top-96 right-52 rounded-full blur-3xl bg-blue-500 opacity-90 "></div>
      <section className="h-screen py-6 flex bg-black flex-col items-center p-4 md:p-10">
        <header className="flex flex-col ">
          <h1 className="text-center text-lg md:text-4xl font-semibold text-blue-600">
            State Bank Of India
          </h1>
          <span className="text-md md:text-xl md:font-medium text-center text-gray-300">
            Financial Quarter Information
          </span>
        </header>
        {/* Dropdown Component */}
        <div className="mt-4 py-4 md:mt-10">
          <label
            htmlFor="quarter-dropdown"
            className="md:font-medium text-sm md:text-lg text-gray-400"
          >
            Select Quarter
          </label>
          <br />
          <select
            name="quarter-dropdown"
            className="p-2 md:p-3 font-medium w-[300px] md:w-[320px] rounded-lg bg-blue-400 border-2 border-blue-400 mt-1"
            value={selectedQuarter}
            onChange={handleQuarterChange}
          >
            <option value="Quartile-1">Quartile 1</option>
            <option value="Quartile-2">Quartile 2</option>
            <option value="Quartile-3">Quartile 3</option>
            <option value="Quartile-4">Quartile 4</option>
          </select>
        </div>

        {/* Rendering Data */}
        <div className="p-1 py-9 w-fit md:p-10 z-50 overflow-x-auto">
          <table className="table py-3 bg-black backdrop-blur-sm opacity-50 rounded-lg border border-blue-400 border-separate">
            {quarterData.map((quarter, index) => (
              <tbody key={index}>
                <tr>
                  <th
                    colSpan={4}
                    className=" p-3 text-lg md:text-4xl font-semibold text-center text-blue-400 border-b border-blue-400"
                  >
                    {quarter["Financial Quarter"]}
                  </th>
                </tr>
                <tr className=" font-semibold text-white text-xs md:text-2xl">
                  <td className=" p-3">Revenue (INR)</td>
                  <td className=" p-3">Net Income (INR)</td>
                  <td className=" p-3">Net Profit</td>
                  <td className=" p-3">Operating Income (INR)</td>
                </tr>
                <tr className="text-xs font-medium text-white md:text-2xl">
                  <td className=" p-2">{quarter["Revenue (INR)"]}</td>
                  <td className=" p-2">{quarter["Net Income (INR)"]}</td>
                  <td className=" p-3">{quarter["Net Profit"]}</td>
                  <td className=" p-3">{quarter["Operating Income (INR)"]}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default Herosection;
