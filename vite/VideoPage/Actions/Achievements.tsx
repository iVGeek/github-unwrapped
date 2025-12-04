import React from "react";
import type { ProfileStats } from "../../../src/config";
import styles from "./achievements.module.css";

type Achievement = {
  emoji: string;
  title: string;
  description: string;
};

const getAchievements = (stats: ProfileStats): Achievement[] => {
  const achievements: Achievement[] = [];

  // Contribution-based achievements
  if (stats.totalContributions >= 1000) {
    achievements.push({
      emoji: "🔥",
      title: "Thousand Club",
      description: `${stats.totalContributions.toLocaleString()} contributions!`,
    });
  } else if (stats.totalContributions >= 500) {
    achievements.push({
      emoji: "⚡",
      title: "Power Coder",
      description: `${stats.totalContributions} contributions`,
    });
  } else if (stats.totalContributions >= 100) {
    achievements.push({
      emoji: "🌟",
      title: "Rising Star",
      description: `${stats.totalContributions} contributions`,
    });
  }

  // Streak achievements
  if (stats.longestStreak >= 30) {
    achievements.push({
      emoji: "🏆",
      title: "Streak Champion",
      description: `${stats.longestStreak} day streak!`,
    });
  } else if (stats.longestStreak >= 14) {
    achievements.push({
      emoji: "💪",
      title: "Consistent Coder",
      description: `${stats.longestStreak} day streak`,
    });
  } else if (stats.longestStreak >= 7) {
    achievements.push({
      emoji: "📅",
      title: "Week Warrior",
      description: `${stats.longestStreak} day streak`,
    });
  }

  // PR achievements
  if (stats.totalPullRequests >= 100) {
    achievements.push({
      emoji: "🚀",
      title: "PR Machine",
      description: `${stats.totalPullRequests} pull requests`,
    });
  } else if (stats.totalPullRequests >= 25) {
    achievements.push({
      emoji: "🔀",
      title: "Merge Master",
      description: `${stats.totalPullRequests} pull requests`,
    });
  }

  // Stars given
  if (stats.totalStars >= 50) {
    achievements.push({
      emoji: "⭐",
      title: "Star Giver",
      description: `${stats.totalStars} stars given`,
    });
  }

  // Issue achievements
  const totalIssues = stats.openIssues + stats.closedIssues;
  if (totalIssues >= 20) {
    achievements.push({
      emoji: "🐛",
      title: "Bug Hunter",
      description: `${totalIssues} issues tracked`,
    });
  }

  // Language diversity
  if (stats.topLanguages.length >= 3) {
    achievements.push({
      emoji: "🌈",
      title: "Polyglot",
      description: `${stats.topLanguages.length}+ languages`,
    });
  }

  // Early bird / Night owl based on top hour
  const topHour = parseInt(stats.topHour, 10);
  if (topHour >= 5 && topHour <= 8) {
    achievements.push({
      emoji: "🌅",
      title: "Early Bird",
      description: "Most active in morning",
    });
  } else if (topHour >= 22 || topHour <= 3) {
    achievements.push({
      emoji: "🦉",
      title: "Night Owl",
      description: "Most active at night",
    });
  }

  // Weekend warrior - in the data: 0=Monday, 5=Saturday, 6=Sunday
  const weekdayNum = parseInt(stats.topWeekday, 10);
  if (weekdayNum === 5 || weekdayNum === 6) {
    achievements.push({
      emoji: "🎮",
      title: "Weekend Warrior",
      description: "Most active on weekends",
    });
  }

  return achievements.slice(0, 4); // Limit to 4 achievements
};

export const Achievements: React.FC<{
  readonly stats: ProfileStats;
}> = ({ stats }) => {
  const achievements = getAchievements(stats);

  if (achievements.length === 0) {
    return null;
  }

  return (
    <div className={styles.achievementsWrapper}>
      <div className={styles.achievementsTitle}>Your 2025 Achievements</div>
      <div className={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <div key={achievement.title} className={styles.achievementBadge}>
            <span className={styles.achievementEmoji}>{achievement.emoji}</span>
            <div className={styles.achievementText}>
              <div className={styles.achievementTitle}>{achievement.title}</div>
              <div className={styles.achievementDesc}>
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
