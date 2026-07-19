import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { CardMedia } from './CardMedia';

export interface StoryResult {
  label: string;
  value: string;
}

export interface StoryCardProps {
  to: string;
  name: string;
  industry: string;
  quote: string;
  logo: string;
  thumbnail?: string | null;
  results?: StoryResult[];
  accent?: string;
}

export function StoryCard({
  to,
  name,
  industry,
  quote,
  logo,
  thumbnail,
  results = [],
  accent = 'from-[var(--color-primary)] to-[var(--color-accent)]',
}: StoryCardProps) {
  return (
    <Link to={to} className="story-card-pro group">
      <div className="story-card-pro__media">
        <CardMedia src={thumbnail} alt={name} aspect="video" />
        <span className="story-card-pro__industry">{industry}</span>
      </div>

      <div className="story-card-pro__body">
        <div className="story-card-pro__header">
          <div className={`story-card-pro__logo bg-gradient-to-br ${accent}`}>{logo}</div>
          <div className="min-w-0">
            <h3 className="story-card-pro__title">{name}</h3>
            <p className="story-card-pro__subtitle">Customer success story</p>
          </div>
        </div>

        <blockquote className="story-card-pro__quote">
          <Quote className="story-card-pro__quote-icon" aria-hidden />
          <span>{quote}</span>
        </blockquote>

        {results.length > 0 && (
          <dl className="story-card-pro__stats">
            {results.slice(0, 3).map((result) => (
              <div key={result.label} className="story-card-pro__stat">
                <dt className="story-card-pro__stat-label">{result.label}</dt>
                <dd className="story-card-pro__stat-value">{result.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="story-card-pro__footer">
          <span className="story-card-pro__cta">
            Read full story <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
