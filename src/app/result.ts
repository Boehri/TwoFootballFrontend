export interface TeaminTable{
    TeamName: String; 
    Matches: number;
    Points: number; 
    TeamIconUrl: String; 
}

export interface TeamInMatch{
    TeamName: String; 
    TeamId: number;
    TeamIconUrl: String; 

}

export interface MatchResult{
    ResultOrderID: number; 
    PointsTeam1: number;
    PointsTeam2: number;
}

export interface Match {
  MatchId: number;
  MatchDateTime : String; 
  MatchResults: MatchResult[]; // length=2
  Team1: TeamInMatch;
  Team2: TeamInMatch;
  MatchIsFinished: boolean;
  Group: {
      GroupOrderID: number; 
  }  
}

export interface currentgameday{
    GroudOrderID: number; 
}

export interface User{
    nutzerEmail: String; 
    nutzerID: String;
    nutzerPraefVerein: number;
    nutzerPraefLiga: number; 
}

export interface Verein{
    ligaID: number; 
    vereinID: number; 
    verein: String; 
}