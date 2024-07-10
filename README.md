Stock Tracker 1.0
Stock Tracker 1.0 is a web application that allows users to track stock prices over time. The app includes user authentication, a customizable dashboard, and interactive data visualizations using D3.js.

Features
User Authentication: Secure login using credentials with NextAuth.js.
Stock Data Visualization: Dynamic stock price charts using D3.js.
Theme Toggle: Switch between light and dark modes.
Responsive Design: Mobile-friendly interface.
Folder Structure
lua
Copiar código
app
  ├─ auth
  │    └─ signIn
  │         └─ page.tsx
  ├─ dashboard
  │    ├─ page.tsx
  │    ├─ DashboardClient.tsx
  ├─ AppBar.tsx
  ├─ layout.tsx
  ├─ LoginButton.tsx
  ├─ page.tsx
  ├─ Providers.tsx
components
  └─ elements
        ├─ Button.tsx
        └─ TextBox.tsx
  ├─ StockChart.tsx
  ├─ ThemeToggle.tsx
context
  ├─ ThemeContext.tsx
  ├─ useRequireAuth.ts
  ├─ useStockData.ts
pages
  ├─ api
  │    ├─ auth
  │    │    └─ [...nextauth].ts
  │    └─ hello.tsx
styles
  ├─ globals.css
  ├─ Home.module.css
types
  └─ next-auth.d.ts
next-env.d.ts
Getting Started
Prerequisites
Node.js (>=14.x)
npm or yarn
Installation
Clone the repository:
bash
Copiar código
git clone https://github.com/your-username/stock-tracker.git
cd stock-tracker
Install dependencies:
bash
Copiar código
npm install
# or
yarn install
Set up environment variables:
Create a .env.local file in the root directory and add your environment variables:

env
Copiar código
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
Run the development server:
bash
Copiar código
npm run dev
# or
yarn dev
Open http://localhost:3000 with your browser to see the result.

Usage
Sign In: Navigate to /auth/signIn to log in with username and password.
Dashboard: After logging in, you will be redirected to the dashboard where you can enter a stock symbol and visualize its price data.
Theme Toggle: Use the toggle button in the AppBar to switch between light and dark themes.
Code Overview
Authentication
The authentication logic is implemented using NextAuth.js. The configuration is in pages/api/auth/[...nextauth].ts.

Data Fetching
The useStockData hook in context/useStockData.ts handles fetching stock data from an API endpoint.

Chart Visualization
The D3Chart component in components/StockChart.tsx uses D3.js to render stock price charts.

Theme Management
The ThemeContext in context/ThemeContext.tsx provides a context for managing light and dark themes. The ThemeToggle component in components/ThemeToggle.tsx allows users to switch themes.

License
This project is licensed under the MIT License.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

