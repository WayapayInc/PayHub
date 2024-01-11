import Avatar from '@components/avatar'
import { Table, Card } from 'reactstrap'
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'
import React, {useState, useEffect} from 'react'


const CompanyTable = () => {
  const [transactionsArr, setTransactionsArr] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = process.env.REACT_APP_API_URL
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  const colorsArr = {
    FAILED: 'light-primary',
    CREATED: 'light-success',
    PENDING: 'light-warning'
  }
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiUrl}remit/all_transactions/`, {
          method: 'GET',
          headers
        })
        console.log(response)
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

  const renderData = () => {
    return transactionsArr.map(col => {
      // const IconTag = col.salesUp ? (
      //   <TrendingUp size={15} className='text-success' />
      // ) : (
      //   <TrendingDown size={15} className='text-danger' />
      // )

      return (
        <tr key={col.id}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <span>{col.id}</span>
                  {/* <img src={col.img} alt={col.name} /> */}
                </div>
              </div>
              <div>
                <div className='font-weight-bolder'>{col.payer.name}</div>
                <div className='font-small-2 text-muted'>{col.payer.service.name}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              {/* <Avatar className='mr-1' color={colorsArr[col.status_message]} icon={col.icon} /> */}
              <span color={colorsArr[col.status_message]}>{col.status_message}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='font-weight-bolder mb-25'>{col.payer.country_iso_code}</span>
              {/* <span className='font-small-2 text-muted'>in {col.purpose_of_remitance}</span> */}
            </div>
          </td>
          <td>${col.amount}</td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='font-weight-bolder mr-1'> {col.purpose_of_remitance}</span>
            </div>
          </td>
          <td>{col.creation_date}</td>
          <td>{col.fee.amount}</td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>Payer</th>
            <th>Status</th>
            <th>Country</th>
            <th>Amount</th>
            <th>Transfer Reason</th>
            <th>Created On</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
