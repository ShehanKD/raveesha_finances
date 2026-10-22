import { useState } from 'react'
import './App.css'

type Page = 'Overview' | 'Loans' | 'Borrowers' | 'Payments'

const pages: Page[] = ['Overview', 'Loans', 'Borrowers', 'Payments']

type Borrower = {
  id: number
  name: string
  phone: string
}

const sampleBorrowers: Borrower[] = [
  { id: 1, name: 'Amal Perera', phone: '0771234567' },
  { id: 2, name: 'Nimali Silva', phone: '0712345678' },
]

function App() {
  const [activePage, setActivePage] = useState<Page>('Overview')

  const [borrowers, setBorrowers] = useState<Borrower[]>(sampleBorrowers)
  const [borrowerName, setBorrowerName] = useState('')
  const [borrowerPhone, setBorrowerPhone] = useState('')
  const [formError, setFormError] = useState('')

function addBorrower() {
  const name = borrowerName.trim()
  const phone = borrowerPhone.trim()

  if (!name || !phone) {
    setFormError('Please enter a name and phone number.')
    return
  }

  const newBorrower: Borrower = {
    id: Math.max(0, ...borrowers.map((borrower) => borrower.id)) + 1,
    name,
    phone,
  }

  setBorrowers([...borrowers, newBorrower])
  setBorrowerName('')
  setBorrowerPhone('')
  setFormError('')
}
  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Raveesha Finances</h1>

        <nav aria-label="Main navigation">
          {pages.map((page) => (
            <button
              key={page}
              className={activePage === page ? 'active' : ''}
              aria-current={activePage === page ? 'page' : undefined}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <p className="subtitle">Your lending workspace</p>
          <h2>{activePage}</h2>
        </header>

        {activePage === 'Overview' ? (
          <>
            <p className="demo-label">Sample values for now</p>

            <div className="summary-grid">
              <section className="summary-card">
                <h3>Active loans</h3>
                <strong>4</strong>
                <p>Loans with an outstanding balance</p>
              </section>

              <section className="summary-card">
                <h3>Total money lent</h3>
                <strong>Rs. 185,000</strong>
                <p>Principal across active loans</p>
              </section>
            </div>
          </>
                ) : activePage === 'Borrowers' ? (
          <section className="content-panel">
            <h3>Borrowers</h3>

<form
  className="borrower-form"
  onSubmit={(event) => {
    event.preventDefault()
    addBorrower()
  }}
>
  <div className="form-field">
    <label htmlFor="borrower-name">Full name</label>
    <input
      id="borrower-name"
      type="text"
      value={borrowerName}
      onChange={(event) => setBorrowerName(event.target.value)}
      required
    />
  </div>

  <div className="form-field">
    <label htmlFor="borrower-phone">Phone number</label>
    <input
      id="borrower-phone"
      type="tel"
      value={borrowerPhone}
      onChange={(event) => setBorrowerPhone(event.target.value)}
      required
    />
  </div>

  <button className="primary-button" type="submit">
    Add borrower
  </button>

  {formError && (
    <p className="form-error" role="alert">
      {formError}
    </p>
  )}
</form>

<div className="table-scroll">
              <table className="borrowers-table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone number</th>
                  </tr>
                </thead>

                <tbody>
                  {borrowers.map((borrower) => (
                    <tr key={borrower.id}>
                      <td>{borrower.name}</td>
                      <td>{borrower.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="content-panel">
            <h3>{activePage}</h3>
            <p>We’ll build this page next.</p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App