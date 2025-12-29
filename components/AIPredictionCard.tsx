'use client';

import { AIPrediction } from '@/types/ai';

interface AIPredictionCardProps {
  prediction: AIPrediction;
  loading?: boolean;
}

export default function AIPredictionCard({ prediction, loading }: AIPredictionCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeText = (outcome: '1' | 'X' | '2') => {
    switch (outcome) {
      case '1':
        return 'Ev Sahibi Kazanır';
      case 'X':
        return 'Beraberlik';
      case '2':
        return 'Deplasman Kazanır';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-lg font-semibold text-gray-900">AI Tahmini</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Güven:</span>
          <span className="text-lg font-bold text-blue-600">{prediction.confidence}%</span>
        </div>
      </div>

      {/* Predicted Outcome */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Tahmin Edilen Sonuç</div>
          <div className="text-2xl font-bold text-gray-900 mb-3">
            {getOutcomeText(prediction.predictedOutcome)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${prediction.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Win Probabilities */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-700">Kazanma Olasılıkları</div>
        <div className="space-y-2">
          <ProbabilityBar label="Ev Sahibi" value={prediction.winProbabilities.home} />
          <ProbabilityBar label="Beraberlik" value={prediction.winProbabilities.draw} />
          <ProbabilityBar label="Deplasman" value={prediction.winProbabilities.away} />
        </div>
      </div>

      {/* Reasoning */}
      <div className="border-t pt-4">
        <div className="text-sm font-semibold text-gray-700 mb-2">Analiz</div>
        <p className="text-gray-600 text-sm leading-relaxed">{prediction.reasoning}</p>
      </div>

      {/* Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
        <AnalysisSection title="💪 Güçlü Yönler" items={prediction.analysis.strengths} color="green" />
        <AnalysisSection title="⚠️ Zayıf Yönler" items={prediction.analysis.weaknesses} color="red" />
        <AnalysisSection title="🔑 Kilit Faktörler" items={prediction.analysis.keyFactors} color="blue" />
      </div>

      {/* Recommendations */}
      {prediction.recommendations.length > 0 && (
        <div className="border-t pt-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">Öneriler</div>
          <div className="space-y-2">
            {prediction.recommendations.map((rec, index) => (
              <RecommendationChip key={index} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Risk Level */}
      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-600">Risk Seviyesi:</span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(prediction.riskLevel)}`}>
          {prediction.riskLevel.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function ProbabilityBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function AnalysisSection({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colorClasses = {
    green: 'bg-green-50',
    red: 'bg-red-50',
    blue: 'bg-blue-50',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-3`}>
      <div className="text-xs font-semibold mb-2">{title}</div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-xs text-gray-700 flex items-start">
            <span className="mr-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendationChip({ recommendation }: { recommendation: AIPrediction['recommendations'][0] }) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'result':
        return 'Sonuç';
      case 'over_under':
        return 'Alt/Üst';
      case 'btts':
        return 'KG Var';
      default:
        return type;
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-purple-700">{getTypeLabel(recommendation.type)}</span>
        <span className="text-xs font-bold text-purple-900">{recommendation.confidence}%</span>
      </div>
      <div className="text-sm font-semibold text-gray-900 mb-1">{recommendation.value}</div>
      <div className="text-xs text-gray-600">{recommendation.reasoning}</div>
    </div>
  );
}
