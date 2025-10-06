# AI Music Generator SaaS

A full-stack AI-powered music generation platform that allows users to create original music tracks using advanced AI models. Built with Next.js, Prisma, and Modal for scalable AI processing.

<img width="1612" height="986" alt="file_2025-10-06_19 18 08" src="https://github.com/user-attachments/assets/96cac6a9-31cf-4248-9849-eb776c2877eb" />

## 🎵 Features


- **AI Music Generation**: Generate music from text descriptions, lyrics, or prompts
- **Multiple Generation Types**: 
  - Generate from description
  - Generate from described lyrics
  - Generate with custom lyrics
- **User Authentication**: Secure sign-up and login with Better Auth
- **Credit System**: Pay-per-use model with Polar integration
- **File Storage**: Secure cloud storage with Backblaze B2
- **Real-time Processing**: Scalable AI processing with Modal
- **Responsive UI**: Modern, mobile-friendly interface

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Database ORM
- **Better Auth** - Authentication solution
- **Polar** - Payment and subscription management

### Backend & AI
- **Modal** - Serverless AI model hosting
- **Neon** - PostgreSQL database
- **Backblaze B2** - Object storage
- **Webhooks** - Real-time payment processing

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (package manager)
- Python 3.11+
- uv (Python package manager)
- PostgreSQL database (Neon recommended)
- Modal account for AI processing
- Backblaze B2 account for storage
- Polar account for payments

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-music-gen-saas
```

### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
pnpm install
```

**Backend:**
```bash
cd backend
uv sync
```

### 3. Environment Setup

Create a `.env` file in the frontend directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Authentication
BETTER_AUTH_SECRET="your-auth-secret"

# Modal AI Processing
MODAL_KEY="your-modal-key"
MODAL_SECRET="your-modal-secret"

# Backblaze B2 Storage
B2_KEY_ID="your-b2-key-id"
B2_APP_KEY="your-b2-app-key"
B2_ENDPOINT="https://s3.us-east-005.backblazeb2.com"
B2_BUCKET_NAME="your-bucket-name"

# AI Model Endpoints
GENERATE_FROM_DESCRIPTION="https://your-modal-endpoint.modal.run"
GENERATE_FROM_DESCRIBED_LYRICS="https://your-modal-endpoint.modal.run"
GENERATE_WITH_LYRICS="https://your-modal-endpoint.modal.run"

# Polar Payments
POLAR_ACCESS_TOKEN="polar_oat_your-token"
POLAR_WEBHOOK_SECRET="polar_whs_your-webhook-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server

**Frontend:**
```bash
cd frontend
pnpm dev
```

**Backend (if running locally):**
```bash
cd backend
uv run python main.py
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗 Project Structure

```
ai-music-gen-saas/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── (auth)/         # Authentication routes
│   │   │   ├── api/            # API routes
│   │   │   ├── dashboard/      # Dashboard pages
│   │   │   └── generate/       # Music generation pages
│   │   ├── components/         # Reusable components
│   │   │   ├── ui/            # UI components
│   │   │   └── forms/         # Form components
│   │   ├── lib/               # Utility libraries
│   │   │   ├── auth.ts        # Authentication config
│   │   │   ├── db.ts          # Database connection
│   │   │   └── utils.ts       # Helper functions
│   │   ├── server/            # Server-side code
│   │   └── styles/            # Global styles
│   ├── prisma/                # Database schema
│   ├── public/                # Static assets
│   └── package.json
└── backend/                   # AI processing (Modal)
    ├── main.py               # Main AI processing script
    ├── prompts.py            # AI prompt templates
    ├── pyproject.toml        # Python dependencies (uv)
    └── uv.lock               # Lock file
```

## 🔧 Configuration

### Database Schema

The application uses Prisma with the following main models:

- **User**: User accounts and credits
- **Track**: Generated music tracks
- **Order**: Payment records

### Authentication

Uses Better Auth with:
- Email/password authentication
- Polar integration for customer management
- Automatic customer creation on signup

### Payment Integration

Polar integration provides:
- Credit packages (Small: 10, Medium: 25, Large: 50)
- Webhook processing for automatic credit addition
- Customer portal for subscription management

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-out` - User logout

### Music Generation
- `POST /api/generate/description` - Generate from description
- `POST /api/generate/lyrics` - Generate from lyrics
- `POST /api/generate/described-lyrics` - Generate from described lyrics

### User Management
- `GET /api/user/credits` - Get user credits
- `GET /api/user/tracks` - Get user's generated tracks

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### AI Backend (Modal)

1. Install dependencies: `cd backend && uv sync`
2. Install Modal CLI: `uv add modal`
3. Authenticate: `uv run modal token new`
4. Deploy functions: `uv run modal deploy main.py`

### Database (Neon)

1. Create a Neon project
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma db push` to create tables

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `BETTER_AUTH_SECRET` | Authentication secret key | ✅ |
| `MODAL_KEY` | Modal API key | ✅ |
| `MODAL_SECRET` | Modal API secret | ✅ |
| `B2_KEY_ID` | Backblaze B2 key ID | ✅ |
| `B2_APP_KEY` | Backblaze B2 application key | ✅ |
| `B2_ENDPOINT` | Backblaze B2 S3 endpoint | ✅ |
| `B2_BUCKET_NAME` | Backblaze B2 bucket name | ✅ |
| `POLAR_ACCESS_TOKEN` | Polar API access token | ✅ |
| `POLAR_WEBHOOK_SECRET` | Polar webhook secret | ✅ |

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Modal](https://modal.com) for AI model hosting
- [Polar](https://polar.sh) for payment processing
- [Better Auth](https://better-auth.dev) for authentication
- [Neon](https://neon.tech) for database hosting
- [Backblaze](https://backblaze.com) for object storage

---

Built with ❤️ for music creators everywhere
