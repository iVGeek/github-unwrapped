import React, { useMemo } from "react";
import type { ProfileStats } from "../../../src/config";
import styles from "./funfacts.module.css";

type FunFact = {
  emoji: string;
  text: string;
};

const getFunFacts = (stats: ProfileStats): FunFact[] => {
  const facts: FunFact[] = [];

  // Contribution comparisons
  if (stats.totalContributions > 0) {
    const dailyAvg = Math.round(stats.totalContributions / 365);
    if (dailyAvg >= 1) {
      facts.push({
        emoji: "📈",
        text: `You averaged ${dailyAvg} contribution${dailyAvg > 1 ? "s" : ""} per day`,
      });
    }
  }

  // Streak fact
  if (stats.longestStreak >= 7) {
    const weeks = Math.floor(stats.longestStreak / 7);
    if (weeks >= 1) {
      facts.push({
        emoji: "🔥",
        text: `Your ${stats.longestStreak}-day streak spans ${weeks} week${weeks > 1 ? "s" : ""}!`,
      });
    }
  }

  // Productivity time
  const topHour = parseInt(stats.topHour, 10);
  const timeLabel =
    topHour === 0
      ? "midnight"
      : topHour === 12
        ? "noon"
        : topHour > 12
          ? `${topHour - 12} PM`
          : `${topHour} AM`;
  facts.push({
    emoji: topHour >= 22 || topHour <= 5 ? "🌙" : topHour <= 11 ? "☀️" : "🌤️",
    text: `Your peak coding hour is ${timeLabel}`,
  });

  // Day of week - in the data: 0=Monday, 1=Tuesday, ..., 5=Saturday, 6=Sunday
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekdayNum = parseInt(stats.topWeekday, 10);
  const topDay = weekdays[weekdayNum];
  const isWeekend = weekdayNum === 5 || weekdayNum === 6;
  facts.push({
    emoji: isWeekend ? "🎉" : "💼",
    text: `${topDay} is your power day`,
  });

  // Pull requests
  if (stats.totalPullRequests > 0) {
    const monthlyPRs = Math.round(stats.totalPullRequests / 12);
    if (monthlyPRs >= 1) {
      facts.push({
        emoji: "🔀",
        text: `~${monthlyPRs} pull request${monthlyPRs > 1 ? "s" : ""} per month`,
      });
    }
  }

  // Stars given
  if (stats.totalStars >= 10) {
    facts.push({
      emoji: "⭐",
      text: `You starred ${stats.totalStars} projects this year`,
    });
  }

  // Top language
  if (stats.topLanguages.length > 0) {
    const topLang = stats.topLanguages[0];
    facts.push({
      emoji: "💻",
      text: `${topLang.languageName} is your language of choice`,
    });
  }

  // Issues
  const totalIssues = stats.openIssues + stats.closedIssues;
  if (totalIssues > 0) {
    const closedPercent = Math.round(
      (stats.closedIssues / totalIssues) * 100,
    );
    if (stats.closedIssues > 0) {
      facts.push({
        emoji: "✅",
        text: `You closed ${closedPercent}% of issues you opened`,
      });
    }
  }

  return facts.slice(0, 4);
};

export const FunFacts: React.FC<{
  readonly stats: ProfileStats;
}> = ({ stats }) => {
  const facts = useMemo(() => getFunFacts(stats), [stats]);

  if (facts.length === 0) {
    return null;
  }

  return (
    <div className={styles.funFactsWrapper}>
      <div className={styles.funFactsTitle}>Fun Facts</div>
      <div className={styles.funFactsGrid}>
        {facts.map((fact) => (
          <div key={fact.text} className={styles.funFactItem}>
            <span className={styles.funFactEmoji}>{fact.emoji}</span>
            <span className={styles.funFactText}>{fact.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
