import Avatar from '@components/avatar'
import { Table, Card } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import React, {useState, useEffect} from 'react'
import { formatDateToMonthShort, formatDate} from '../../../utility/Utils'
const CompanyTable = () => {
  const [transactionsArr, setTransactionsArr] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 10
  const apiUrl = process.env.REACT_APP_API_URL
  const sortedTransactions = transactionsArr.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  const colorsArr = {
    FAILED: 'light-primary',
    reated: 'light-success',
    PENDING: 'light-warning',
    DECLINED:  'light-danger'
  }
  const offset = currentPage *  pageSize
  const currentPageData = sortedTransactions.slice(offset, offset + pageSize)
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
    if (currentPageData.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">No transactions yet</td>
        </tr>
      )
    }
    return currentPageData.map(col => {
      // const IconTag = col.salesUp ? (
      //   <TrendingUp size={15} className='text-success' />
      // ) : (
      //   <TrendingDown size={15} className='text-danger' />
      // )

      return (
        <tr key={col.id}>
          <td>
            <div className='d-flex align-items-center'>
              
              <div>
                <div className='font-weight-bolder'>{col.payer.name}</div>
                <div className='font-small-2 text-muted'>{col.payer.service.name}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              {/* <Avatar className='mr-1' color={colorsArr[col.status_message]} icon={col.icon} /> */}
              <span color={colorsArr[col.status_message]}>{capitalizeFirstLetter(col.status_message)}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className=' mb-25'>{col.payer.country_iso_code}</span>
              {/* <span className='font-small-2 text-muted'>in {col.purpose_of_remitance}</span> */}
            </div>
          </td>
          <td>${col.amount}</td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='font-weight-bolder mr-1'> {capitalizeFirstLetter(col.purpose_of_remitance)}</span>
            </div>
          </td>
          <td>{formatDateToMonthShort(col.creation_date, false)}</td>
          <td>{col.fee.amount}</td>
        </tr>
      )
    })
  }
  const handlePageClick = ({selected}) => {
    setCurrentPage(selected)
  }
  const Previous = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          <FormattedMessage id='Prev' />
        </span>
      </Fragment>
    )
  }

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>
          <FormattedMessage id='Next' />
        </span>
      </Fragment>
    )
  }

  // ** Custom Pagination Component
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate pagination-sm justify-content-end pr-1 mt-1'}
    />
  )

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
      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(transactionsArr.length / pageSize)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disabled"}
        paginationComponent={CustomPagination}
      />
    </Card>
  )
}

export default CompanyTable
