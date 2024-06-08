const tokenName = 'kids-token'

// * Save token to localStorage
export function setToken(token){
  localStorage.setItem(tokenName, token)
}

// * Get token from localStorage
export function getToken(){
  return localStorage.getItem(tokenName)
}

// * Delete token from localStorage
export function removeToken(){
  localStorage.removeItem(tokenName)
}

// * Check if logged in with a valid token
export function isLoggedIn(){
  const token = getToken()
  // If token is missing (null), not logged in
  if (!token) return false
  // If token is present:
  // Decode the token, to extract information from the payload
  const payloadSub = token.split('.')[1] // extract token sub (subject portion, encoded)
  const payloadObj = JSON.parse(atob(payloadSub)) // decode the token sub, convert the JSON into an object
  // Check the expiry date (if date is greater than now, token is still valid)
  if (payloadObj.exp > Date.now() / 1000) {
    return true
  } else {
    return false
  }
}

export function getMyProfileId(){
  const token = getToken()
  if (!token) return ''
  const payloadSub = token.split('.')[1] // extract token sub (subject portion, encoded)
  const payloadObj = JSON.parse(atob(payloadSub)) // decode the token sub, convert the JSON into an object
  return payloadObj.user_id //return the id of the person who's logged in
}