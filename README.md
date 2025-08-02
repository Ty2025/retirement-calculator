# Retirement Calculator

This is a modern, interactive retirement calculator built with React, TypeScript, and Bootstrap. It helps users estimate their retirement savings based on their current age, retirement age, current savings, monthly contributions, and expected annual investment return. The app features a dynamic chart to visualize savings growth over time.

## Features
- Responsive, professional UI using Bootstrap
- Modular React components (`InputField`, `ChartComponent`)
- Real-time calculation and chart updates as you type
- Input validation and user-friendly error messages
- Handles edge cases (e.g., retirement age less than current age)
- Clean, maintainable TypeScript code


## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm

### Installation & Running
1. Clone the repository:
   ```sh
   git clone
   cd retirement-calculator
   ```
2. Install dependencies:
   ```sh
   npm i
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the link provided in the console in your browser.

## Tech Stack
- React + TypeScript
- Vite
- Bootstrap 5
- Chart.js & react-chartjs-2

## Project Structure
- `src/components/InputField.tsx` — Reusable input component
- `src/components/ChartComponent.tsx` — Chart rendering component
- `src/App.tsx` — Main application logic and layout

