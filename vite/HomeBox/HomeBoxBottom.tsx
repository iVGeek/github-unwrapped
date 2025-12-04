import { YEAR_TO_REVIEW } from "../../src/helpers/year";
import { UserNotFound } from "../UserNotFound";
import { LoginOptions } from "./LoginOptions";
import styles from "./styles.module.css";

const highlightFeatures = [
  "🚀 Your top programming languages",
  "📊 Contribution patterns & streaks",
  "⭐ Stars given & repositories explored",
  "🎯 Most productive days & hours",
];

export const HomeBoxBottom: React.FC<{
  userNotFound: boolean;
  setUserNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setUserNotFound, userNotFound }) => {
  return (
    <div className={styles.homeBoxBottomWrapper}>
      <div className={styles.title}>Your {YEAR_TO_REVIEW} coding journey awaits</div>
      <div className={styles.description}>
        Get a stunning personalized video showcasing your GitHub achievements in{" "}
        {YEAR_TO_REVIEW}.
        <br />
        <br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginBottom: 8 }}>
          {highlightFeatures.map((feature) => (
            <span
              key={feature}
              style={{
                fontSize: 13,
                opacity: 0.85,
              }}
            >
              {feature}
            </span>
          ))}
        </div>
        Type your username to start your unwrapped experience!
      </div>
      <div className={styles.inputWrapper}>
        {userNotFound && <UserNotFound />}
        <LoginOptions
          userNotFound={userNotFound}
          setUserNotFound={setUserNotFound}
        />
      </div>
    </div>
  );
};
