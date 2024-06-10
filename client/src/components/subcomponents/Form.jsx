import { Fragment, useEffect, useState } from 'react'
// import Creatable from 'react-select/creatable'

export default function Form({ request, fields, submit, onLoad }){

  const fieldsReduced = Object.keys(fields).reduce((obj, field) => {
    return { ...obj, [field]: fields[field] === 'multi' ? [] : '' } 
  }, {})

  // ! State
  const [formData, setFormData] = useState(fieldsReduced)
  const [error, setError] = useState('')

  // ! Event driven functions
  async function handleSubmit(e){
    e.preventDefault()
    try {
      await request(formData) // Send request passed as a prop
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('') // This line resets the error when typing into a form field
  }

  // ! Effects
  useEffect(() => {
    async function fillFields(){
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        console.log(error)
        setError(error.response.data)
      }
    }
    if (onLoad){
      fillFields()
    }
  }, [onLoad])

  return (
    <form className='' onSubmit={handleSubmit}>

      { Object.entries(fields).map(([fieldName, fieldType]) => {
        const fieldNameCaps = fieldName[0].toUpperCase() + fieldName.slice(1)
        return (
          <Fragment key={fieldName}>
            <label hidden htmlFor={fieldName}>{fieldNameCaps}</label>
            { !['select', 'multi'].includes(fieldType) &&
              <input type={fieldType} name={fieldName} id={fieldName} placeholder={fieldNameCaps} value={formData[fieldName]} onChange={handleChange} />
              // <input required type={fieldType} name={fieldName} id={fieldName} placeholder={fieldNameCaps} value={formData[fieldName]} onChange={handleChange} />
            }

            {/* Multi */}
            { fieldType === 'multi' &&
              <Creatable 
                onCreateOption={(value) => {
                  setFormData({ ...formData, [fieldName]: [ ...formData[fieldName], value ]})
                }} 
                onChange={(options) => {
                  setFormData({ ...formData, [fieldName]: options.map(option => option.value)})
                }}
                value={formData[fieldName].map(value => {
                  return { value, label: value }
                })}
                isMulti={true}
              />
            }

            {error && error[fieldName] && <p className='error'>{error[fieldName]}</p>}
          </Fragment>
        )
      })}

      { error && error.message && <p className='error'>{error.message}</p>}

      <button type="submit" className=''>{submit}</button>
    </form>
  )
}