import { Fragment, useContext } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import Chart from 'react-apexcharts'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, MoreVertical } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Col, Button, Form, Input, Media } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import '@styles/react/libs/react-select/_react-select.scss'
import * as Icon from 'react-feather'
import { ThemeColors } from '@src/utility/context/ThemeColors'

const PersonalInfo = ({ stepper, type, sharedData, updateSharedData}) => {
  const { register, errors, handleSubmit, trigger } = useForm()
  const apiUrl = process.env.REACT_APP_API_URL
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`
  }
  const getBeneficiaries = async () => {
    try {
      // const beneficiaryResponse = await axios.get(`${apiUrl}remit/beneficiaries/${serviceType}/${selectedValue.IsoCode}/`, {headers})
      // if (partnerResponse && partnerResponse.data) {
      //   const partners = partnerResponse.data.data.map(partner => ({
      //     value:partner.id,
      //     label: partner.name

      //   }))
      //   setpaymentPartners(partners)
      //   return true
      // } else {
      //   throw new Error()
      // }
    } catch (error) {
      Error('Failed to fetch Partners')
    }
  }
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  const employeesTasks = [
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      title: 'Ryan Harrington',
      subtitle: 'iOS Developer',
      time: '9hr 20m',
      chart: {
        type: 'radialBar',
        series: [45],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      title: 'Louisa Norton',
      subtitle: 'UI Designer',
      time: '4hr 17m',
      chart: {
        type: 'radialBar',
        series: [65],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
      title: 'Jayden Duncan',
      subtitle: 'Java Developer',
      time: '12hr 8m',
      chart: {
        type: 'radialBar',
        series: [60],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.success.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      title: 'Cynthia Howell',
      subtitle: 'Angular Developer',
      time: '3hr 19m',
      chart: {
        type: 'radialBar',
        series: [35],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-16.jpg').default,
      title: 'Helena Payne',
      subtitle: 'Marketing',
      time: '9hr 50m',
      chart: {
        type: 'radialBar',
        series: [65],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-13.jpg').default,
      title: 'Troy Jensen',
      subtitle: 'iOS Developer',
      time: '4hr 48m',
      chart: {
        type: 'radialBar',
        series: [80],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }
  ]


  const renderTasks = () => {
    return employeesTasks.map(task => {
      return (
        <div key={task.title} className='employee-task d-flex justify-content-between align-items-center mt-1'>
          <Media>
            <Avatar imgClassName='rounded' className='mr-75' img={task.avatar} imgHeight='42' imgWidth='42' />
            <Media className='my-auto' body>
              <h6 className='mb-0'>{task.title}</h6>
              <small>{task.subtitle}</small>
            </Media>
          </Media>
          <div className='d-flex align-items-center'>
            <small className='text-muted mr-75'>{task.time}</small>
            <Chart
              options={task.chart.options}
              series={task.chart.series}
              type={task.chart.type}
              height={task.chart.height}
              width={task.chart.width}
            />
          </div>
        </div>
      )
    })
  }

  // const renderBeneficiariesList = () => {
  //   if (transactionsArr.length === 0) {
  //     return <div>No transactions yet</div>
  //   } else {
  //     return transactionsArr.map(item => {
  //       return (
  //         <div key = { item.title } className = 'transaction-item' >
  //           <Media>
  //             <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
  //             <Media body>
  //               <h6 className='transaction-title'>{item.title}</h6>
  //               <small>{item.subtitle}</small>
  //             </Media>
  //           </Media>
  //           <div className={`font-weight-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
  //         </div>
  //       )
  //     })
  //   }
  //   }
  // const countryOptions = [
  //   { value: 'UK', label: 'UK' },
  //   { value: 'USA', label: 'USA' },
  //   { value: 'Spain', label: 'Spain' },
  //   { value: 'France', label: 'France' },
  //   { value: 'Italy', label: 'Italy' },
  //   { value: 'Australia', label: 'Australia' }
  // ]

  // const languageOptions = [
  //   { value: 'English', label: 'English' },
  //   { value: 'French', label: 'French' },
  //   { value: 'Spanish', label: 'Spanish' },
  //   { value: 'Italian', label: 'Italian' },
  //   { value: 'Japanese', label: 'Japanese' }
  // ]

  return (
    <Fragment>
      {/* <div className='content-header'>
        <h5 className='mb-0'>Beneficiary</h5>
        <small>Enter Beneficiary details</small>
      </div> */}
      {/* Button element */}
      <div className='content-step'>
      <Button.Ripple color='primary' block onClick={() => stepper.next()}>
      Add new Beneficiary  
      </Button.Ripple>
      </div>
      <div className="d-flex justify-content-center  mt-1">
        {/* vh-100 is used to make sure the container takes the full height of the viewport */}
        <Card className='card-transaction'>
        <CardHeader>
          {/* <CardTitle tag='h4'>Recipients</CardTitle> */}
          {/* <MoreVertical size={18} className='cursor-pointer' /> */}
        </CardHeader>
        <CardBody>{renderTasks()}</CardBody>
      </Card>
      </div>
      {/* <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`first-name-${type}`}>
              First Name
            </Label>
            <Input
              type='text'
              name={`first-name-${type}`}
              id={`first-name-${type}`}
              placeholder='Fred'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`first-name-${type}`] })}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`last-name-${type}`}>
              Last Name
            </Label>
            <Input
              type='text'
              name={`last-name-${type}`}
              id={`last-name-${type}`}
              placeholder='Dupont'
              innerRef={register({ required: true })}
              className={classnames({ 'is-invalid': errors[`last-name-${type}`] })}
            />
          </FormGroup>
        </Row>
        <div> */}
          {/* Your other form elements */}
          {/* <label>
            {isBankService ? 'Bank Account Number' : 'Phone Number'}
            {isBankService ? (
              <input
                type="number"
                name="bankAccountNumber"
                value={sharedData.bankAccountNumber || ''}
                onChange={handleInputChange}
              />
            ) : (
              <PhoneInput
                name="phoneNumber"
                placeholder="Enter phone number"
                value={sharedData.phoneNumber || ''}
                onChange={(value) => {
                  updateSharedData((prevData) => ({
                    ...prevData,
                    phoneNumber: value
                  }))
                }}
              />
            )}
          </label> */}
          {/* Your other form elements */}
        {/* </div> */}
        {/* <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`country-${type}`}>
              Country
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
            />
          </FormGroup>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`language-${type}`}>
              Language
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`language-${type}`}
              options={languageOptions}
              className='react-select'
              classNamePrefix='select'
            />
          </FormGroup>
        </Row> */}
        {/* <FormGroup>
                <CustomInput type='checkbox' id='remember-me-vert-icons' label='Save Beneficiary' defaultChecked={false} />
        </FormGroup> */}
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          {/* <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple> */}
        </div>
      {/* </Form> */}
    </Fragment>
  )
}

export default PersonalInfo
