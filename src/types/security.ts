export type RequestStatus = 'SAFE' | 'SUSPICIOUS';

export type HogwartsHouse = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface HttpRequestItem {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  sourceIp: string;
  status: RequestStatus;
  threat: string;
  reason: string;
  rawRequest: string;
  house?: HogwartsHouse;
}

export interface ThreatAnalysis {
  isSuspicious: boolean;
  status: RequestStatus;
  attackType: string;
  reason: string;
  matchedVector?: string;
  owaspCategory?: string;
  method: string;
  path: string;
  protocol: string;
  headers: Record<string, string>;
  body: string;
  house?: HogwartsHouse;
}
