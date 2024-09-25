import React, { useState } from 'react';
import Introduction from '../home_comps/Introduction/introduction';
import Item_Surf from '../home_comps/item_surf/item-1';
import Item_Surf2 from '../home_comps/item_surf/item-2';
import Item_Surf3 from '../home_comps/item_surf/item-3';
import './home.css'; // Import the CSS file

function Home() {
  const [imagestate, setImagestate] = useState(1); // Track the state

  // Handler for the button click to change state
  const handleClick = () => {
    const slide_amnt = [1, 2, 3, 4];
  
    for (let i = 0; i < slide_amnt.length; i++) {
      if (imagestate === slide_amnt[i]) {
        if (i < slide_amnt.length - 1) {
          // Move to the next slide
          setImagestate(slide_amnt[i + 1]);
        } else {
          // If at the last slide, go back to the first
          setImagestate(slide_amnt[0]);
        }
        break; // Exit the loop after finding a match
      }
    }
  };

  return (
    <div className="home-container">
      {/* Container for the images */}
      <div className="images-container">
        {/* Render components based on imagestate */}
        {imagestate === 1 && <Introduction />}
        {imagestate === 2 && <Item_Surf />}
        {imagestate === 3 && <Item_Surf2 />}
        {imagestate === 4 && <Item_Surf3 />}
      </div>
      {/* Button to trigger state change */}

      <div className="btn-cnt">
      <button className="button-17" onClick={handleClick}>Next</button>

      </div>
    </div>
  );
}

export default Home;
