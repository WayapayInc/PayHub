import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import React, {useState, useEffect} from 'react'

const CardTransactions = (data) => {
  const authToken = data ? data.token : 'N/A'

  const apiUrl = process.env.REACT_APP_API_URL

  const headers = {
    Authorization : `Token ${data.token}`, // Set the Authorization header with the token
    "Content-Type" : "application/json"
  }

  const [transactionsArr, setTransactionsArr] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiUrl}remit/all_transactions/`, {
          method: 'GET',
          headers
        })
        console.log(response.data)
        if (!response.ok) {
          console.log("RESPONSE FROM EFFECT Error", response)
          throw new Error('Server response not OK')
        }
        const transactionData = await response.json()
        console.log("Formatted response data", transactionData.data)
        setTransactionsArr(transactionData.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])
  const renderTransactions = () => {
    if (transactionsArr.length === 0) {
      return <div>No transactions yet</div>
    } else {
      return transactionsArr.map(item => {
        return (
          <div key = { item.title } className = 'transaction-item' >
            <Media>
              <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
              <Media body>
                <h6 className='transaction-title'>{item.title}</h6>
                <small>{item.subtitle}</small>
              </Media>
            </Media>
            <div className={`font-weight-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
          </div>
        )
      })
    }
    }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>Transactions</CardTitle>
        <Icon.MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
