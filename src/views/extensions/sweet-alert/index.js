import { Card, CardHeader, CardBody, CardTitle, Button, CardText } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const handleSuccess = () => {
  return MySwal.fire({
    title: 'Success!',
    text: 'Transaction has been successfully submitted and is being processed',
    icon: 'success',
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  })
}

export const handleWarning = () => {
  return MySwal.fire({
    title: 'Warning!',
    text: ' Service  unavailable at the moment. Please try again later.',
    icon: 'warning',
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  })
}

export const handleError = (message) => {
  return MySwal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  })
}
