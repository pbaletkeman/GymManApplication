export interface Exercise {
  name?: string | null;
  id?: number | null;
  description?: string;
  steps?: Step[] | null;
}

export interface Step {
  name: string | null;
  id: number | null;
  description?: string | null | undefined;
  stepNum: number | null;
  exerciseId: number | null | undefined;
}

export interface FetchStatusType {
  title?: string | null | undefined;
  message?: string | null | undefined;
  dialogTimeout?: number | null | undefined;
  status?: 0 | 1 | undefined;
}
