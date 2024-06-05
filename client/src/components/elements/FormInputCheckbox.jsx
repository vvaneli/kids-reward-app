// add the checked value into the array if it was checked, remove it if it was unchecked

// const [formData, setFormData] = useState({
//   ...
//   options: []
// })

// function handleChange = (e) => {
//   // value of checkbox
//   const inputValue = e.target.value 

//   // checked will be truthy if you've checked the checkbox, falsey if unchecked
//   if (e.target.checked) { 

//     // spread existing options into new options array, add the new value
//     setFormData({ ...formData, options: [...formData.options, inputValue]})

//   } else {

//     // else remove the unchecked box by filtering it out of the existing array
//     setFormData({...formData, options: formData.options.filter(option => option !== inputValue)})

//   }
// }

// ...

// return (
//   ...
//   <input type="checkbox" value="1" onChange={handleChange} />
//   ...
// )