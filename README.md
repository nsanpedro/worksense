# WorkSense - AI-Powered Team Alignment Dashboard

WorkSense is a SaaS platform that helps organizations understand and improve team alignment through AI-powered surveys and insights.

## 🚀 Features

- **Dashboard**: Overview of team alignment scores, trends, and risk indicators
- **Surveys**: Create and manage team alignment surveys with AI-generated questions
- **Insights**: AI-powered analysis of survey responses with actionable recommendations
- **Actions**: Track and manage improvement initiatives
- **Slack Integration**: Send surveys and receive notifications via Slack
- **Settings**: Manage organization preferences and integrations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix-based)
- **Charts**: Recharts
- **State Management**: React hooks
- **Authentication**: (Ready for integration with your Node.js backend)

## 📁 Project Structure

```
worksense/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── page.tsx          # Dashboard
│   │   ├── surveys/          # Survey management
│   │   ├── insights/         # AI insights
│   │   ├── actions/          # Action tracking
│   │   └── settings/         # Settings
│   ├── survey/[id]/          # Public survey page
│   ├── api/
│   │   ├── auth/             # Authentication endpoints
│   │   ├── ai/               # AI analysis endpoints
│   │   ├── slack/            # Slack integration
│   │   └── surveys/          # Survey CRUD
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Layout components
│   ├── dashboard/            # Dashboard-specific components
│   └── providers/            # Context providers
├── lib/
│   └── utils.ts              # Utility functions
└── middleware.ts             # Auth middleware
```

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your configuration.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Public URL of your app |
| `DATABASE_URL` | Database connection string |
| `AUTH_SECRET` | Secret for authentication |
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `SLACK_BOT_TOKEN` | Slack bot token for integration |

## 🔌 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### AI
- `POST /api/ai/analyze` - Analyze survey responses
- `POST /api/ai/generate-questions` - Generate survey questions

### Slack
- `POST /api/slack/webhook` - Slack event webhook
- `POST /api/slack/commands` - Slack slash commands
- `POST /api/slack/send-survey` - Send survey via Slack

### Surveys
- `GET /api/surveys` - List all surveys
- `POST /api/surveys` - Create new survey
- `GET /api/surveys/[id]` - Get survey details
- `PUT /api/surveys/[id]` - Update survey
- `DELETE /api/surveys/[id]` - Delete survey
- `POST /api/surveys/[id]/responses` - Submit survey response

## 📝 Next Steps

1. **Backend Integration**: Connect API routes to your Node.js backend
2. **Database**: Set up database (PostgreSQL recommended)
3. **Authentication**: Implement proper JWT/session authentication
4. **AI Integration**: Connect to OpenAI or Anthropic for analysis
5. **Slack App**: Create and configure Slack app
6. **Email**: Set up transactional email for survey invitations

## 🤝 Contributing

This is a private project for internal use.

## 📄 License

Private - All rights reserved.
