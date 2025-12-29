import OpenAI from 'openai';
import { AIPrediction, MatchData } from '@/types/ai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Generate AI prediction for a football match
 */
export async function generateMatchPrediction(matchData: MatchData): Promise<AIPrediction> {
  const prompt = `
    Futbol maçı analizi yap. Aşağıdaki verileri kullan:
    
    Ev Sahibi: ${matchData.homeTeam.name}
    - Form: ${matchData.homeTeam.form}
    - Ev performansı: ${matchData.homeTeam.homeStats.won}G-${matchData.homeTeam.homeStats.drawn}B-${matchData.homeTeam.homeStats.lost}M (${matchData.homeTeam.homeStats.played} maç)
    - Gol ortalaması: ${matchData.homeTeam.avgGoals.scored} atılan / ${matchData.homeTeam.avgGoals.conceded} yenilen
    
    Deplasman: ${matchData.awayTeam.name}
    - Form: ${matchData.awayTeam.form}
    - Deplasman performansı: ${matchData.awayTeam.awayStats.won}G-${matchData.awayTeam.awayStats.drawn}B-${matchData.awayTeam.awayStats.lost}M (${matchData.awayTeam.awayStats.played} maç)
    - Gol ortalaması: ${matchData.awayTeam.avgGoals.scored} atılan / ${matchData.awayTeam.avgGoals.conceded} yenilen
    
    H2H (Kafa Kafaya): 
    - Ev sahibi galibiyetleri: ${matchData.h2h.homeWins}
    - Beraberlikler: ${matchData.h2h.draws}
    - Deplasman galibiyetleri: ${matchData.h2h.awayWins}
    
    Lig: ${matchData.league}
    Maç Tarihi: ${matchData.matchDate}
    
    Detaylı tahmin, olasılıklar ve Türkçe açıklama yap. JSON formatında yanıt ver:
    {
      "matchId": "${matchData.matchId}",
      "predictedOutcome": "1 veya X veya 2",
      "confidence": 0-100 arası sayı,
      "winProbabilities": {
        "home": 0-100,
        "draw": 0-100,
        "away": 0-100
      },
      "recommendations": [
        {
          "type": "result veya over_under veya btts",
          "value": "örnek: 1, X, 2.5 Üst, Evet",
          "confidence": 0-100,
          "reasoning": "Türkçe açıklama"
        }
      ],
      "analysis": {
        "strengths": ["güçlü yönler listesi"],
        "weaknesses": ["zayıf yönler listesi"],
        "keyFactors": ["kilit faktörler listesi"]
      },
      "reasoning": "Detaylı Türkçe açıklama",
      "riskLevel": "low veya medium veya high",
      "updatedAt": "${new Date().toISOString()}"
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Sen profesyonel bir futbol analisti ve tahmin uzmanısın. Türkçe konuşuyorsun. Yanıtlarını her zaman geçerli JSON formatında veriyorsun.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '2000'),
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content) as AIPrediction;
  } catch (error) {
    console.error('Error generating match prediction:', error);
    throw new Error('AI prediction generation failed');
  }
}

/**
 * Generate AI chat response
 */
export async function generateChatResponse(
  message: string,
  conversationHistory: { role: 'user' | 'assistant' | 'system'; content: string }[]
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Sen Predictify Sports AI asistanısın. 
          Kullanıcılara maç tahminleri, analizler ve istatistikler hakkında yardım ediyorsun.
          Türkçe konuş, dostça ve profesyonel ol.
          Kullanıcının sorularına futbol bilginle cevap ver.`,
        },
        ...conversationHistory,
        { role: 'user', content: message },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || 'Üzgünüm, bir cevap oluşturamadım.';
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('AI chat response generation failed');
  }
}

/**
 * Analyze user's prediction patterns for personalization
 */
export async function analyzeUserPatterns(pastPredictions: unknown[]): Promise<unknown> {
  try {
    const analysis = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Kullanıcının tahmin geçmişini analiz et ve başarılı olduğu kategorileri belirle. JSON formatında yanıt ver.',
        },
        {
          role: 'user',
          content: JSON.stringify(pastPredictions),
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const content = analysis.choices[0].message.content;
    if (!content) {
      throw new Error('No analysis from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error analyzing user patterns:', error);
    throw new Error('User pattern analysis failed');
  }
}
