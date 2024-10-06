# LSW-Store - Game Credit Top-Up Platform

LSW is a web application that allows users to easily top up credits for various popular games such as Genshin Impact, Mobile Legends, Valorant, and Steam.

Star really appreciated <3

## Features

- Browse popular games
- Search for specific games
- Top up game credits
- User authentication
- Responsive design

## Tech Stack

- **Frontend:**
  - React
  - Next.js
  - Tailwind CSS

- **Backend:**
  - Next.js

- **Database:**
  - MySQL

- **Deployment:**
  - Vercel

- **Payment Gateway/API**
  - Midtrans
  - VIP-Reseller

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/wweziza/lswstore.git
   cd lswstore
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
      MYSQL_HOST=localhost
      MYSQL_USER=root
      MYSQL_PASSWORD=
      MYSQL_DATABASE=lswstore
      NEXTAUTH_SECRET=secretkeyhere
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This project is set up to be easily deployed on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
