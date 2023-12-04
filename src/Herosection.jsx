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
        const response = await axios.get(
          `http://localhost:8000/${selectedQuarter.toLowerCase()}`
        );
        setQuarterData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuarterData();
  }, [selectedQuarter]);

  return (
    <div className="py-2 bg-black h-full">
      <header className="text-left text-teal-500 text-3xl font-medium p-5 px-8">
        SBI
      </header>
      <div className="py-5 md:py-10 w-full h-full flex md:justify-center">
        <p className="py-5 p-7 md:p-5 md:py-20 w-[80%] md:w-[80%] text-white text-5xl md:text-7xl font-semibold md:font-bold">
          Let's look at the financial quarters results of our{" "}
          <span className="text-teal-500">organisation</span>
        </p>
      </div>
      <div className="flex justify-center">
        <select
          className="p-3 w-[350px] font-medium md:w-[450px] rounded-md mt-5 bg-teal-600 text-white"
          value={selectedQuarter}
          onChange={handleQuarterChange}
        >
          <option value="Quartile-1">Quartile 1</option>
          <option value="Quartile-2">Quartile 2</option>
          <option value="Quartile-3">Quartile 3</option>
          <option value="Quartile-4">Quartile 4</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-12 py-20 m-7 h-full">
        {quarterData.map((quarter, index) => (
          <div
            key={index}
            className={`bg-teal-900 w-[600px] h-[550px] rounded-md ${
              selectedQuarter === `Quartile-${index + 1}` ? "" : "hidden"
            }`}
          >
            <h1 className="text-white text-4xl p-5 mb-4 font-medium">{`Quartile-${
              index + 1
            }`}</h1>
            <p className="p-3 text-xl font-medium">
              Financial Quarter: {quarter["Financial Quarter"]}
            </p>
            <p className="p-3 text-xl font-medium">
              Revenue (INR): {quarter["Revenue (INR)"]}
            </p>
            <p className="p-3 text-xl font-medium">
              Net Income (INR): {quarter["Net Income (INR)"]}
            </p>
            <p className="p-3 text-xl font-medium">
              Net Profit: {quarter["Net Profit"]}
            </p>
            <p className="p-3 text-xl font-medium">
              Operating Income (INR): {quarter["Operating Income (INR)"]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Herosection;
