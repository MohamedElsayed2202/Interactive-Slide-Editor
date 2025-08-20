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
  elements: Element[];
  screenshot: Media | null;
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

export interface Media {
  id: number;
  path: string;
  type: string;
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
  queryData: FilterData;
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
  getMediaState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  addMediaState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  record: Slide;
  type: "text" | "image";
  media: Media[];
  elements: Element[];
  currentElementId: string;
  typedText: string;
  backgrounds: Background[];
  isAdding: boolean;
  elementToBeAdded: Pick<
    Element,
    "x_position" | "y_position" | "z_index" | "width" | "height"
  >;
  selectedImage: {
    id: number | undefined;
    path: string;
  };
  saveState: {
    error: null | string;
    loading: boolean;
    success: boolean;
  };
  openModal: boolean;
}

export interface Element {
  id: string;
  slideId: string;
  type: "text" | "image";
  content: string;
  width?: number;
  height?: number;
  x_position: number;
  y_position: number;
  z_index: number;
}

export interface Background {
  slideId: string;
  path: string;
}

export interface ListPayload {
  records: Slide[];
  totalPages: number;
}

export interface ExtraModification {
  rejectValue: { message: string };
  state: RootState;
}

export interface Position {
  id: string;
  x: number;
  y: number;
}

export interface Size {
  id: string;
  width: number;
  height: number;
}

export interface ClipboardState {
  copiedElement: Element;
}
