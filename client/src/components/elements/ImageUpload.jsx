import { useState } from 'react'
import axios from 'axios'

// Function to upload image to Cloudinary

// In the form page, add this:
// <ImageUpload formData={formData} setFormData={setFormData} />

export default function ImapeUpload({ errors, formData, setFormData, fieldName }) {

  const [error, setError] = useState('')
  const uploadPresent = import.meta.env.VITE_CLOUDINARY_URL // <-- TESTED WORKING
  const uploadUrl = import.meta.env.VITE_UPLOAD_PRESET // <-- TESTED WORKING

  async function handleImageUpload(e) {
    console.dir(e.target)
    console.log(e.target.files[0])

    const form = new FormData() // create an empty form
    form.append('file', e.target.files[0]) // append key value pair to the form
    form.append('upload preset', uploadPresent)

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

  return (
    <>
      {formData.image && <img src={formData.image} className="upload-thumbnail" alt="Upload image" />}
      <label hidden htmlFor="image">Image</label>
      <input type="file" name="image" id="image" />
      {error && errors.image && <p className='error'>{errors.image}</p>}
      {/* { error && <p className='error'>{errors }</p>} */}
    </>
  )

}