import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { Round as RoundType, UserStat } from "../../types";
import { Player as PlayerType } from "../../types";
import axios from "axios";
import "./dashboard.css";
import "../../styles.css";
import "../../components/scoreboard.css";
import Scoreboard from "../../components/Scoreboard";
import Modal from "../../components/Modal";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState<RoundType[]>([]);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerType[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userTeamId, setUserTeamId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isPlayerListModalOpen, setIsPlayerListModalOpen] = useState(false);
  const [isPlayerDetailsModalOpen, setIsPlayerDetailsModalOpen] =
    useState(false);
  const [isSiteStatsModalOpen, setIsSiteStatsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  const [currentTeamName, setCurrentTeamName] = useState<string | null>(null);
  const [showTopPlayers, setShowTopPlayers] = useState(false);
  const [siteStatistics, setSiteStatistics] = useState<UserStat[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      navigate("/login");
    } else {
      const decoded: any = jwtDecode(token);
      setUserRole(decoded.role);
      setUserTeamId(decoded.team_id);
      setUsername(decoded.username);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTeamClick = async (teamId: number) => {
    if (userRole === "player") {
      return;
    }
    if (userRole === "coach" && userTeamId !== teamId) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/team/${teamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPlayers(response.data.players);
      setFilteredPlayers(response.data.players);
      setCurrentTeamName(response.data.team_name);
      setShowTopPlayers(false);
      setIsPlayerListModalOpen(true);
    } catch (error) {
      console.error("Error fetching team players:", error);
    }
  };

  const handlePlayerClick = async (playerId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/player/${playerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedPlayer(response.data);
      setIsPlayerDetailsModalOpen(true);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  const fetchSiteStatistics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/site_statistics`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSiteStatistics(response.data);
      setIsSiteStatsModalOpen(true);
    } catch (error) {
      console.error("Error fetching site statistics:", error);
    }
  };

  const closePlayerDetailsModal = () => {
    setIsPlayerDetailsModalOpen(false);
    setSelectedPlayer(null);
  };

  const calculateAverageScore = (player: PlayerType) => {
    return player.games_played > 0
      ? player.total_score / player.games_played
      : 0;
  };

  const filterTopPlayers = (players: PlayerType[]) => {
    const playersWithAverage = players.map((player) => ({
      ...player,
      average_score: calculateAverageScore(player),
    }));
    const sortedPlayers = playersWithAverage.sort(
      (a, b) => b.average_score - a.average_score
    );
    const thresholdIndex = Math.ceil(players.length * 0.1) - 1;
    const thresholdScore = sortedPlayers[thresholdIndex]?.average_score || 0;
    return sortedPlayers.filter(
      (player) => player.average_score >= thresholdScore
    );
  };

  const toggleTopPlayers = () => {
    if (showTopPlayers) {
      setFilteredPlayers(players);
    } else {
      const topPlayers = filterTopPlayers(players);
      setFilteredPlayers(topPlayers);
    }
    setShowTopPlayers(!showTopPlayers);
  };

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/rounds`
        );
        setRounds(response.data);
      } catch (error) {
        console.error("Error fetching rounds:", error);
      }
    };

    fetchRounds();
  }, []);

  return (
    <div className="dashboard-container app-background">
      <div className="welcome-message">
        {username && <p>Welcome {username}</p>}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      {userRole === "admin" && (
        <button className="stats-button" onClick={fetchSiteStatistics}>
          Site Statistics
        </button>
      )}
      <h1 className="header">Basketball Tournament Progress</h1>
      <Scoreboard rounds={rounds} onTeamClick={handleTeamClick} />
      <Modal
        isOpen={isPlayerListModalOpen}
        onClose={() => {
          if (!isPlayerDetailsModalOpen) {
            setIsPlayerListModalOpen(false);
          }
        }}
      >
        <h2>{currentTeamName} Players</h2>
        {(userRole === "coach" || userRole === "admin") && (
          <button className="filter-button" onClick={toggleTopPlayers}>
            {showTopPlayers
              ? "Show All Players"
              : "Show players in the 90 precentile"}
          </button>
        )}
        <ul className="player-list">
          {filteredPlayers.map((player) => (
            <li key={player.id} onClick={() => handlePlayerClick(player.id)}>
              {player.name}
            </li>
          ))}
        </ul>
      </Modal>
      {selectedPlayer && (
        <Modal
          isOpen={isPlayerDetailsModalOpen}
          onClose={closePlayerDetailsModal}
        >
          <h2>{selectedPlayer.name} Details</h2>
          <p>Name: {selectedPlayer.name}</p>
          <p>Games Played: {selectedPlayer.games_played}</p>
          <p>Average Score: {calculateAverageScore(selectedPlayer)}</p>
          <p>Height: {selectedPlayer.height} cm</p>
        </Modal>
      )}
      <Modal
        isOpen={isSiteStatsModalOpen}
        onClose={() => setIsSiteStatsModalOpen(false)}
      >
        <h2>Site Statistics</h2>
        <ul>
          {siteStatistics.map((stat, index) => (
            <li key={index}>
              <p>Username: {stat.username}</p>
              <p>Login Count: {stat.login_count}</p>
              <p>
                Total Time Spent: {Math.round(stat.total_time / 60)} minutes
              </p>
              <p>Currently Online: {stat.is_online ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Dashboard;
