
export enum AppStage {
  INTRO = 'INTRO',
  SCENARIO = 'SCENARIO',
  RESEARCH = 'RESEARCH',
  ANALYSIS = 'ANALYSIS',
  REPORT = 'REPORT',
  RESULT = 'RESULT'
}

export interface Clue {
  id: string;
  title: string;
  content: string;
  type: 'interview' | 'document' | 'photo';
  source: string;
  image?: string;
  isKeyClue: boolean;
}

export interface ReportSubmission {
  id: number;
  teamId: number;
  author: string;
  timestamp: string;
  problemDefinition: string;
  rootCause: string;
  solution: string;
  prevention: string;
}

export interface AnalysisNode {
  id: string;
  label: string;
  children?: AnalysisNode[];
}
