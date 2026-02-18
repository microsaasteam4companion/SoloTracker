
import { analyzeWithGrok } from './grok';

export interface StrategicInsight {
    patterns: string[];
    biases: { name: string; description: string }[];
    accuracy_rate: number;
    executive_summary: string;
    recommendations: string[];
}

export async function analyzeStrategicData(
    decisions: any[],
    ambitions: any[],
    trajectory: any[],
    journalEntries: any[] = []
): Promise<StrategicInsight> {
    const prompt = `Analyze this strategic life data and provide high-level executive insights.
  
  DECISIONS: ${JSON.stringify(decisions.map(d => ({ title: d.decision_title, rationale: d.rationale, fears: d.fears, prediction_1m: d.prediction_1m })))}
  
  GROWTH SIGNALS: ${JSON.stringify(trajectory.map(t => ({ category: t.category, item: t.item_name })))}

  JOURNAL REFLECTIONS (Last 30 Days): ${JSON.stringify(journalEntries.map(j => ({ date: j.entry_date, content: j.content })))}

  Return a JSON object with this structure:
  {
    "patterns": ["Consistent pattern 1", "Consistent pattern 2"],
    "biases": [{"name": "Name of Bias", "description": "How it shows up in their data"}],
    "accuracy_rate": 85,
    "executive_summary": "Identify monthly performance pattern and any 'lag' factors (why things are slow or stuck). Mention specific improvements seen.",
    "recommendations": ["Action item 1", "Action item 2"]
  }

  IMPORTANT:
  - Address the person directly as "you" (e.g., "You tend to..." or "Your pattern of...").
  - Do NOT refer to them as "the user".
  - Be direct, slightly provocative (Brutal Clarity), but human and coaching in tone.
  - Analyze the Journal Reflections deeply to find the "Lag" (the thing holding you back) and "Improvements" (where you are winning).
  - Return ONLY valid JSON.`;

    const response = await analyzeWithGrok(prompt);
    try {
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI Analysis Parse Error:", err);
        throw new Error("Failed to parse strategic insights.");
    }
}
