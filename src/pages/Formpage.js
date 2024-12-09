import React, {useState} from "react";

function Formpage() {
  const [formData, setformData] = useState({
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setformData({
      email:"",
      name:""
    })
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={formData.email} placeholder="Write your email here" onChange={handleChange} />
        <label>Name</label>
        <input name="name" type="text" value={formData.name} placeholder="Write your name here" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Formpage;
