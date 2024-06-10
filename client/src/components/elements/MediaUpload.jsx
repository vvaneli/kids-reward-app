import { useState } from 'react'
import axios from 'axios'

// Function to upload images, video and audio to Cloudinary

// In the form page, add this:
// <MediaUpload formData={formData} setFormData={setFormData} />

// export default function MediaUpload({ errors, formData, setFormData, fieldName }) {
export default function MediaUpload({ formData, setFormData, fieldName }) {

  const [error, setError] = useState('')
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET // <-- TESTED WORKING
  const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL // <-- TESTED WORKING

  async function handleMediaUpload(e) {
    console.dir(e.target)
    console.log(e.target.files[0])

    const form = new FormData() // create an empty form
    form.append('file', e.target.files[0]) // append key value pair to the form
    form.append('upload_preset', uploadPreset)
console.log(uploadUrl)
    try {
      const { data } = await axios.post(uploadUrl, form) // append the form to the request body
      console.log(data.secure_url)
      setFormData({ ...formData, [fieldName]: data.secure_url }) //! if using fieldName
      // setFormData({ ...formData, image: data.secure_url })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

// In the code below: use formData[fieldName] so it looks for the relevant name in fieldName
// if use formData.fieldName, then it looks in formData for a kay called 'fieldName'
// fieldName needs to resolve to the same name as DB field/column name
  return (
    <>
      {formData[fieldName] && <img src={formData[fieldName]} className='upload-thumbnail' alt='Upload media' />}
      <label hidden htmlFor={[fieldName]}>Media</label>
      <input type='file' name={[fieldName]} id={[fieldName]} onChange={handleMediaUpload}/>
      {/* {error && errors[fieldName] && <p className='error'>{errors[fieldName]}</p>} */}
      { error && <p className='error'>{error}</p>}
    </>
  )
}