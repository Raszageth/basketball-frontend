import Round from "./Round";
import { Round as RoundType } from "../types";

interface ScoreboardProps {
  rounds: RoundType[];
  onTeamClick: (teamId: number) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ rounds, onTeamClick }) => {
  return (
    <div className="scoreboard">
      {rounds.map((round, index) => (
        <div key={index} className="round-wrapper">
          <Round
            matches={round.matches}
            roundIndex={index}
            onTeamClick={onTeamClick}
          />
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
