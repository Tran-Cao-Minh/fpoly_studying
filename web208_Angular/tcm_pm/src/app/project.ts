export interface Project {
  id: number;
  name: string;
  startDate?: string;
  totalCount?: number;
  leaderId?: number;
  membersId?: Array<number>;
}
