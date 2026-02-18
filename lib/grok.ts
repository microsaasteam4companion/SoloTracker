// Executive AI Service - Powered by Groq (compatible with xAI/OpenAI)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;

export interface GrokInsight {
    type: 'opportunity' | 'recommendation' | 'analysis' | 'lead';
    title: string;
    description: string;
    confidence: number;
    actionItems: string[];
}

export interface GrokAnalysisResult {
    insights: GrokInsight[];
    summary: string;
    engagementScore: number;
    topTopics: string[];
    bestTimeToPost: string;
    potentialLeads: { name: string; reason: string; platform: string }[];
}

export async function analyzeWithGrok(prompt: string): Promise<string> {
    if (!GROK_API_KEY || GROK_API_KEY === 'YOUR_GROK_API_KEY_HERE') {
        throw new Error('Groq API key not configured. Please add your key to VITE_GROK_API_KEY in .env.local.');
    }

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROK_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: `You are a strategic intelligence expert and executive coach. 
You analyze life decisions, business signals, and growth trajectories. 
Always respond in valid JSON format when asked for structured data.
Focus on: identifying cognitive biases, pattern recognition, and high-impact strategic recommendations.`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.6,
            max_tokens: 2000,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}

export async function getFounderInsights(niche: string): Promise<GrokAnalysisResult> {
    const prompt = `As a social media growth strategist, analyze the "${niche}" niche for a solo founder. 
Return a JSON object with this exact structure:
{
  "insights": [
    {"type": "opportunity", "title": "...", "description": "...", "confidence": 85, "actionItems": ["...", "..."]},
    {"type": "recommendation", "title": "...", "description": "...", "confidence": 90, "actionItems": ["...", "..."]},
    {"type": "analysis", "title": "...", "description": "...", "confidence": 75, "actionItems": ["...", "..."]}
  ],
  "summary": "Brief 2-line summary of the niche landscape",
  "engagementScore": 78,
  "topTopics": ["topic1", "topic2", "topic3", "topic4", "topic5"],
  "bestTimeToPost": "9-11 AM EST for maximum engagement",
  "potentialLeads": [
    {"name": "r/SubredditName or @TwitterHandle", "reason": "Why this is a good lead", "platform": "reddit"},
    {"name": "...", "reason": "...", "platform": "twitter"}
  ]
}

Provide real, actionable insights with genuine subreddit names and strategies. Return ONLY valid JSON, no markdown.`;

    const rawResponse = await analyzeWithGrok(prompt);

    try {
        // Clean the response (remove markdown code blocks if any)
        const cleaned = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleaned);
    } catch {
        // Return a structured fallback if parsing fails
        return {
            insights: [{
                type: 'analysis',
                title: 'AI Analysis Available',
                description: rawResponse.substring(0, 200),
                confidence: 70,
                actionItems: ['Review the full analysis', 'Refine your niche keywords']
            }],
            summary: 'Analysis generated. Review insights below.',
            engagementScore: 65,
            topTopics: [niche],
            bestTimeToPost: 'Morning hours (9-11 AM) tend to perform best',
            potentialLeads: []
        };
    }
}

export async function analyzeSocialPost(content: string, platform: string): Promise<string> {
    const prompt = `Analyze this ${platform} post/content and provide brief, actionable feedback:
"${content}"

Respond with:
1. Engagement potential (Low/Medium/High)
2. Key strengths (1-2 points)
3. Improvement suggestions (1-2 points)
4. Best hashtags/subreddits to share in

Keep response concise and actionable.`;

    return analyzeWithGrok(prompt);
}
