// Show errors in form html

// 1. IMPORT:
// import FormErrors from '../elements/FormErrors'

// 2. DECLARE:
// const [formError, setFormError] = useState([])

// 3.INSERT:
// <div className='auth-form-errors'>
//   <FormErrors />
// </div>

export default function FormErrors(formError) {
  return (
    {
      formError.length > 0 ?
        formError.map(formError => {
          return (
            <p className='error'>{formError}</p>
          )
        })
        :
        <p className='error'></p>
    }
  )
}