import Match from "./Match";
import { Match as MatchType } from "../types";

interface RoundProps {
  matches: MatchType[];
  roundIndex: number;
  onTeamClick: (teamId: number) => void;
}

const Round: React.FC<RoundProps> = ({ matches, onTeamClick }) => {
  return (
    <div className="round">
      {matches.map((match, index) => (
        <div key={index}>
          <Match match={match} onTeamClick={onTeamClick} />
        </div>
      ))}
    </div>
  );
};

export default Round;
