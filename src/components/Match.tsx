import { Match as MatchType } from "../types";

interface MatchProps {
  match: MatchType;
  onTeamClick: (teamId: number) => void;
}

const Match: React.FC<MatchProps> = ({ match, onTeamClick }) => {
  const isFinalMatch = !match.team2;

  const handleTeamClick = (teamId: number | null) => {
    if (teamId) {
      onTeamClick(teamId);
    }
  };

  return (
    <div className={`match ${isFinalMatch ? "final-match" : ""}`}>
      <div
        className={`team ${isFinalMatch ? "winner" : ""}`}
        onClick={() => handleTeamClick(match.team1.id)}
        style={{ cursor: "pointer" }}
      >
        <span>{match.team1.name}</span>
        {!isFinalMatch && <span>{match.team1.score}</span>}
      </div>
      {isFinalMatch && <span>Winner!</span>}
      {!isFinalMatch && match.team2 && (
        <div
          className="team"
          onClick={() => handleTeamClick(match.team2?.id || null)}
          style={{ cursor: "pointer" }}
        >
          <span>{match.team2.name}</span>
          <span>{match.team2.score}</span>
        </div>
      )}
    </div>
  );
};

export default Match;
