import type { RootState } from "../store";

export interface LoginPayload {
  message: string;
  token: string;
  user: User;
}

export interface GetUserPayload {
  user: User;
}

export interface LogoutPayload {
  message: string;
}

export interface User {
  admin: {
    id: number;
    name: string;
    email: string;
  };
  builder: {
    id: number;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  role: { id: number; name: string };
  status: string;
}

export interface AuthState {
  token: string;
  loginState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  getState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  logoutState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  user: User;
}

export interface loginFormValues {
  email: string;
  password: string;
}

export interface Slide {
  id: string;
  name: string;
  status: string;
  type: string;
  rank: number;
  detail_aid: DetailAid;
  assigned_to: AssignedTo;
  content: string | null;
  isActive: string;
  canApprove: boolean;
  canEdit: boolean;
  canReview: boolean;
  comments: any[];
  next: string;
  prev: string;
  slideTime: string | null;
  background: string | null;
  elements: any[];
  screenshot: string | null;
  master: string | null;
}

interface DetailAid {
  id: number;
  name: string;
  job_code: string;
  date: string;
  folder_name: string;
  status: string;
  start_date: string;
  brand_id: number;
  country_id: number;
  createdBy: number;
  team_lead_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AssignedTo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_active: number;
  admin_id: number;
  created_at: string;
  updated_at: string;
  builder_id: number;
}

export interface ErrorResponse {
  rejectValue: { message: string };
}

export interface FilterData {
  page: number;
  name: string;
}

export interface SlideState {
  records: Slide[];
  totalPages: number;
  filterData: FilterData;
  listState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  getState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  record: Slide;
}

export interface ListPayload {
  records: Slide[];
  totalPages: number;
}

export interface ExtraModification {
  rejectValue: { message: string };
  state: RootState;
}
