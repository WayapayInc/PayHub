// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig
const apiUrl = process.env.REACT_APP_API_URL
const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem('token')}`
}
// ** Handle User Login
export const handleLogin = data => {
  console.log("FROM REDUX")
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return async (dispatch) => {
    try {
      // Make a request to the logout endpoint
      // const transactiontionResponse = await axios.get(`${apiUrl}logout/`, {headers})
      const response = await fetch(`${apiUrl}logout/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}` // Include the token in headers
        }
      })
      if (response.status === 200) {
        dispatch({ type: 'LOGOUT', [localStorage.getItem('token')]: null})

        // ** Remove user, accessToken from localStorage
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
      } else {
        // Handle logout failure
        toast.warning('Logout failed')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.warning(error.message || 'Logout failed')
    }
  }
}
