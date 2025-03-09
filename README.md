# Bank System API

The Bank System API is a RESTful API for managing bank accounts, including functionalities for creating accounts, depositing, withdrawing, and transferring funds between accounts.

## Features

- Create a new bank account
- Deposit funds into an account
- Withdraw funds from an account
- Transfer funds between accounts
- Retrieve account details for the logged-in user

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

   ```bash
   git clone https://git@github.com:Mojeeb2002/Bank-System-API.git
   cd Bank-System-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3300
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **Register**

  - `POST /bank/auth/register`
  - Request body: `{ "name": "User Name", "email": "user@example.com", "password": "password" }`
  - Response: `{ "message": "User registered successfully!" }`

- **Login**
  - `POST /bank/auth/login`
  - Request body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "token": "jwt_token" }`

### Accounts

- **Create Account**

  - `POST /bank/accounts`
  - Request body: `{ "currency": "USD" }`
  - Response: `{ "success": true, "message": "Account created successfully!", "data": { ...accountDetails } }`

- **Get Accounts**
  - `GET /bank/accounts`
  - Response: `[ { "name": "User Name", "accountNumber": "123456789", "balance": 1000, "currency": "USD" }, ... ]`

### Transactions

- **Deposit**

  - `POST /bank/transactions/deposit`
  - Request body: `{ "amount": 100, "accountNumber": "123456789" }`
  - Response: `{ "accountNumber": "123456789", "balance": 1100, "currency": "USD" }`

- **Withdraw**

  - `POST /bank/transactions/withdraw`
  - Request body: `{ "amount": 100, "accountNumber": "123456789" }`
  - Response: `{ "accountNumber": "123456789", "balance": 900, "currency": "USD" }`

- **Transfer**
  - `POST /bank/transactions/transfer`
  - Request body: `{ "amount": 100, "accountNumber": "123456789", "recipientAccountNumber": "987654321" }`
  - Response: `{ "From": { "Name": "Sender Name", "AccountNumber": "123456789", "Amount": 100 }, "To": { "Name": "Recipient Name", "AccountNumber": "987654321", "Amount": 100 }, "Currency": "USD" }`

## License

This project is licensed under the MIT License.
