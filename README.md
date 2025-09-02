# 💱 Currency Converter

A modern, responsive currency converter web application built with React and Tailwind CSS. This project provides real-time exchange rates and a beautiful, intuitive user interface for converting between different currencies.

## 🚀 Features

- **Real-time Exchange Rates**: Fetches live currency data from ExchangeRate-API
- **Interactive UI**: Smooth animations and gradient backgrounds
- **Currency Swap**: One-click swap between source and target currencies
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern Styling**: Built with Tailwind CSS for a polished, professional look
- **Error Handling**: Graceful error messages for network issues
- **Loading States**: Visual feedback during API calls

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **ExchangeRate-API**: Real-time currency exchange rate data
- **PostCSS**: CSS processing for Tailwind integration

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdallah-A-Raafat/Currency-Converter.git
   cd Currency-Converter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
Currency-Converter/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx
│   ├── App.css
│   ├── CurrencyConverter.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Key Components

### CurrencyConverter.jsx

The main component that handles:

- Currency selection and amount input
- API integration for fetching exchange rates
- Conversion calculations and result display
- Currency swap functionality

### Styling Features

- Gradient backgrounds and glassmorphism effects
- Smooth hover animations and transitions
- Responsive layout with centered card design
- Custom color palette and design tokens

## 🌐 API Integration

This application uses the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch real-time currency exchange rates. The API provides:

- Current exchange rates for 160+ currencies
- Reliable uptime and fast response times
- Simple REST API integration

## 🚀 Build and Deployment

1. **Build for production**

   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory and can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## 🎓 Academic Context

This project serves as the capstone project for the ALX Front-End Development track, demonstrating proficiency in:

- Modern React development patterns
- API integration and error handling
- Responsive design with Tailwind CSS
- Component-based architecture
- State management with React hooks

## 📱 Usage

1. **Enter Amount**: Input the amount you want to convert
2. **Select Currencies**: Choose source and target currencies from the dropdown menus
3. **Swap**: Use the swap button (⇄) to quickly reverse the conversion direction
4. **Convert**: Click "GET EXCHANGE RATE" to see the converted amount
5. **View Results**: The result displays both the exchange rate and converted amount

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Abdallah A. Raafat**

- GitHub: [@Abdallah-A-Raafat](https://github.com/Abdallah-A-Raafat)
- Project: [Currency Converter](https://currency-converter-psi-green.vercel.app/)

---

_Built with ❤️ as part of the ALX Software Engineering Program_
