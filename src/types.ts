export interface UserStat {
  username: string;
  login_count: number;
  total_time: number;
  is_online: boolean;
}

export interface Player {
  id: number;
  name: string;
  games_played: number;
  total_score: number;
  height: number;
  team_id: number;
}

export interface Team {
    name: string;
    score: number;
    id: number;
  }
  
export interface Match {
  team1: Team;
  team2?: Team;
}

export interface Round {
  matches: Match[];
}
