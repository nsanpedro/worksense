import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Slack sends slash command data as form-urlencoded
    const formData = await request.formData()
    const command = formData.get("command") as string
    const text = formData.get("text") as string
    const userId = formData.get("user_id") as string
    const channelId = formData.get("channel_id") as string

    // TODO: Verify Slack request signature
    
    // Handle different slash commands
    switch (command) {
      case "/worksense":
        if (text.startsWith("survey")) {
          // Handle survey-related commands
          return NextResponse.json({
            response_type: "ephemeral",
            text: "📊 Here's your team's alignment status...",
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: "*Team Alignment Score: 58/100*\n\n📈 +5 from last month",
                },
              },
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: { type: "plain_text", text: "View Dashboard" },
                    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                  },
                  {
                    type: "button",
                    text: { type: "plain_text", text: "Take Survey" },
                    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/survey/preview`,
                  },
                ],
              },
            ],
          })
        }
        
        // Default help response
        return NextResponse.json({
          response_type: "ephemeral",
          text: "WorkSense Commands:\n• `/worksense survey` - View current survey status\n• `/worksense insights` - Get latest insights\n• `/worksense help` - Show this help message",
        })

      default:
        return NextResponse.json({
          response_type: "ephemeral",
          text: "Unknown command. Try `/worksense help` for available commands.",
        })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Command processing failed" },
      { status: 500 }
    )
  }
}

