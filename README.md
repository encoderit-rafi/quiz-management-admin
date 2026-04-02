## 🚀 Getting Started

Follow these instructions to get the project up and running.

### Prerequisites

- **Node.js**: (Version 18.x or 20.x recommended)
- **npm**: (Included with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd quiz-management-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
VITE_BASE_URL="your-api-url"
VITE_FRONTEND_URL="your-user-panel-url"
```

### Embed Code

Copy the embed code from the quiz table. Paste it any HTML page. It will work.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Build for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.
