import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { StoreContext } from "../globalcontex/store_contex_GLB";

import './Spopup.css'



function SearchPopup() {
  const [querySearch, setQuerySearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { setCurrSearchedItem, showSearchPopup , setShowSearchPopup,currSearchedItem } = useContext(StoreContext)
  // Ref to store the debounce timeout ID
  const debounceTimeout = useRef(null);
  const Navigator = useNavigate();

  const renderSearch = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/api/items/getItemBySearch", { querySearch: querySearch });
      if (resp.data.success) {
        setSearchedData(resp.data.productNames);
      } else {
        window.alert("Search Query Failed!!");
        console.log(resp.data.message)
      }
    } catch (e) {
      window.alert("Error in Catch Block");
      console.log(e)
    }
  };

  useEffect(() => {
    // If querySearch exists, start the debounce timeout
    if (querySearch) {
      // Clear previous timeout
      clearTimeout(debounceTimeout.current);

      // Set a new timeout to execute the search
      debounceTimeout.current = setTimeout(() => {
        renderSearch();
      }, 1000);
    }

    // Cleanup function to clear timeout if component unmounts or querySearch changes
    return () => clearTimeout(debounceTimeout.current);
  }, [querySearch]);

  useEffect(() => {
    if (searchedData.length > 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [searchedData]);

  return (
    <>
      <div className="src_body">
        <input
          type="text"
          placeholder="Search Our Heart."
          onChange={(e) => setQuerySearch(e.target.value)}
          value={querySearch}
        />
      </div>
      {showPopup ? (
        <div className="resultBox show">  {/* Add the "show" class correctly here */}
          {searchedData.map((item, index) => (
            <div onClick={() => {
              setCurrSearchedItem(item.id);
              setShowSearchPopup(false)
              Navigator(`/searchResult?itemID=${item.id}`);
            }} key={index} style={{ display: 'flex', flexWrap: 'wrap' }} className="resultP">
              <p>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="resultBox">
          <p>No Items Found!!</p>
        </div>
      )}

    </>
  );
}



export default SearchPopup;