import React, { useState } from 'react';
import axios from 'axios';

function Add_category() {
  const [weights, setWeights] = useState(['Small', 'Medium', 'Big', 'Large']);
  const [selected_weights, setSEL_weights] = useState('Not Selected');

  const [cat_data, setCat_data] = useState({
    name: '',
    weight: selected_weights,
  });

  const add_category = async (form_data) => {
    const resp = await axios.post('http://localhost:5000/api/category/add_category', {'name' : cat_data.name , 'weight' : selected_weights});
    if (resp.data.success) {
      window.alert('Category Added Successfully!');
      window.location.reload()
    } else {
      console.log(resp.data.message);
    }
  };

  const form_handling = (event) => {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append('name', cat_data.name);
    form_data.append('weight', selected_weights);
    add_category(form_data);
  };

  const ONCH = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCat_data((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeightChange = (event) => {
    setSEL_weights(event.target.value);
  };

  return (
    <div>
      <form action="" onSubmit={form_handling}>
        <input
          type="text"
          value={cat_data.name}
          name="name"
          onChange={ONCH}
          placeholder="Name"
        />
        <select name="weight" value={selected_weights} onChange={handleWeightChange}>
          {weights.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input type="submit" value="Add Category!" />
      </form>
    </div>
  );
}

export default Add_category;
