import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {onEmployee, onSalary} = props
  const onSelectSalary = event => {
    onSalary(event.target.id)
  }

  const onSelectEmployee = event => {
    onEmployee(event.target.id)
  }

  return (
    <>
      <ul className="employee-type">
        <h1 className="employ-heading">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <li>
            <input
              type="checkbox"
              id={`${each.employmentTypeId}`}
              key={each.employmentTypeId}
              onChange={onSelectEmployee}
            />
            <label htmlFor={`${each.employmentTypeId}`} className="list-item">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      <ul className="employee-type">
        <h1 className="employ-heading">Type of Employment</h1>
        {salaryRangesList.map(each => (
          <li>
            <input
              type="radio"
              id={`${each.salaryTypeId}`}
              onChange={onSelectSalary}
            />
            <label htmlFor={`${each.employmentTypeId}`} className="list-item">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
    </>
  )
}
export default Filters
