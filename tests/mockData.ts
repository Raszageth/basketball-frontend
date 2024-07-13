import { Round as RoundType } from "../src/types";

export const mockRounds: RoundType[] = [
  {
    matches: [
      {
        team1: { name: "Team 1", score: 50, id: 1 },
        team2: { name: "Team 2", score: 40, id: 2 },
      },
      {
        team1: { name: "Team 3", score: 60, id: 3 },
        team2: { name: "Team 4", score: 55, id: 4 },
      },
      {
        team1: { name: "Team 5", score: 70, id: 5 },
        team2: { name: "Team 6", score: 65, id: 6 },
      },
      {
        team1: { name: "Team 7", score: 80, id: 7 },
        team2: { name: "Team 8", score: 75, id: 8 },
      },
      {
        team1: { name: "Team 9", score: 50, id: 9 },
        team2: { name: "Team 10", score: 40, id: 10 },
      },
      {
        team1: { name: "Team 11", score: 60, id: 11 },
        team2: { name: "Team 12", score: 55, id: 12 },
      },
      {
        team1: { name: "Team 13", score: 70, id: 13 },
        team2: { name: "Team 14", score: 65, id: 14 },
      },
      {
        team1: { name: "Team 15", score: 80, id: 15 },
        team2: { name: "Team 16", score: 75, id: 16 },
      },
    ],
  },
  {
    matches: [
      {
        team1: { name: "Team 1", score: 70, id: 1 },
        team2: { name: "Team 3", score: 60, id: 3 },
      },
      {
        team1: { name: "Team 5", score: 80, id: 5 },
        team2: { name: "Team 7", score: 75, id: 7 },
      },
      {
        team1: { name: "Team 9", score: 70, id: 9 },
        team2: { name: "Team 11", score: 60, id: 11 },
      },
      {
        team1: { name: "Team 13", score: 80, id: 13 },
        team2: { name: "Team 15", score: 75, id: 15 },
      },
    ],
  },
  {
    matches: [
      {
        team1: { name: "Team 1", score: 90, id: 1 },
        team2: { name: "Team 5", score: 80, id: 5 },
      },
      {
        team1: { name: "Team 9", score: 85, id: 9 },
        team2: { name: "Team 13", score: 90, id: 13 },
      },
    ],
  },
  {
    matches: [
      {
        team1: { name: "Team 1", score: 90, id: 1 },
        team2: { name: "Team 13", score: 85, id: 13 },
      },
    ],
  },
  {
    matches: [{ team1: { name: "Team 13", score: 90, id: 13 } }]
  },
];
