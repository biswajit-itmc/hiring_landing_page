import { firebaseAuth, isFirebaseConfigured, apiBaseUrl } from "./firebase";

export type UserRole = "SEEKER" | "EMPLOYER";

export interface BackendUser {
  id: string;
  firebaseUid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
  provider: "PASSWORD" | "GOOGLE" | "GITHUB" | "LINKEDIN";
  role: UserRole | null;
  roleSelectedAt?: string | null;
  onboardingCompleted?: boolean;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
  }
}

const DEV_TOKEN_KEY = "oyenaukri_dev_token";

export function setDevToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(DEV_TOKEN_KEY, token);
  else localStorage.removeItem(DEV_TOKEN_KEY);
}

async function getAuthToken(): Promise<string | null> {
  if (isFirebaseConfigured && firebaseAuth?.currentUser) {
    try {
      return await firebaseAuth.currentUser.getIdToken(true);
    } catch {
      return null;
    }
  }
  if (typeof window !== "undefined") {
    return localStorage.getItem(DEV_TOKEN_KEY);
  }
  return null;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  authToken?: string,
): Promise<T> {
  const token = authToken ?? (await getAuthToken());
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.error ?? `Request failed (${res.status})`,
      data?.code,
      data?.details
    );
  }
  return data as T;
}

export const authApi = {
  session: (idToken?: string) =>
    apiFetch<{ user: BackendUser }>("/auth/session", { method: "POST" }, idToken),
  me: () => apiFetch<{ user: BackendUser }>("/auth/me"),
  setRole: (role: UserRole, idToken?: string) =>
    apiFetch<{ user: BackendUser }>("/auth/role", {
      method: "POST",
      body: JSON.stringify({ role }),
    }, idToken),
};

// ---- Seeker profile types ----
export interface EducationEntry {
  id?: string;
  degree: string;
  college: string;
  stream?: string | null;
  startYear: number;
  endYear?: number | null;
  cgpa?: number | null;
}
export interface ExperienceEntry {
  id?: string;
  company: string;
  designation: string;
  responsibilities?: string | null;
  skillsUsed?: string[];
  startDate?: string | null;
  endDate?: string | null;
  current?: boolean;
}
export interface SeekerProfile {
  id: string;
  userId: string;
  phone?: string | null;
  location?: string | null;
  preferredLocations: string[];
  experienceYears?: number | null;
  currentCompany?: string | null;
  currentRole?: string | null;
  noticePeriod?: string | null;
  expectedSalary?: number | null;
  currentSalary?: number | null;
  employmentType?: string | null;
  workAuthorization?: string | null;
  skills: string[];
  technologies: string[];
  languages: string[];
  certifications?: unknown;
  interests: string[];
  resumeUrl?: string | null;
  resumeFileName?: string | null;
  resumeParsedAt?: string | null;
  resumeParsedData?: unknown;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  profileCompletion: number;
  onboardingCompleted: boolean;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: { id: string; title: string; description?: string | null; url?: string | null; technologies: string[] }[];
}

export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  currentRole?: string;
  currentCompany?: string;
  experienceYears?: number;
  skills?: string[];
  technologies?: string[];
  languages?: string[];
  certifications?: { name: string; issuer?: string }[];
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  interests?: string[];
  links?: { github?: string; linkedin?: string; portfolio?: string };
  summary?: string;
}

// ---- Company types ----
export interface Company {
  id: string;
  ownerId: string;
  name: string;
  website?: string | null;
  industry?: string | null;
  companySize?: string | null;
  foundedYear?: number | null;
  headquarters?: string | null;
  gst?: string | null;
  cin?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  description?: string | null;
  mission?: string | null;
  culture?: string | null;
  benefits: string[];
  socialLinks?: Record<string, string> | null;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  verificationNote?: string | null;
  verifiedAt?: string | null;
  onboardingCompleted: boolean;
}

// ---- File upload helper ----
async function apiUpload<T>(path: string, file: File, fieldName = "file"): Promise<T> {
  const token = await getAuthToken();
  const form = new FormData();
  form.append(fieldName, file);
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${apiBaseUrl}${path}`, { method: "POST", headers, body: form });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new ApiError(res.status, data?.error ?? `Upload failed (${res.status})`, data?.code);
  return data as T;
}

// ---- Seeker API ----
export const seekerApi = {
  getProfile: () => apiFetch<{ profile: SeekerProfile }>("/seeker/profile"),
  updateProfile: (data: Record<string, unknown>) =>
    apiFetch<{ profile: SeekerProfile; completion: number }>("/seeker/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  updateSkills: (data: Partial<Pick<SeekerProfile, "skills" | "technologies" | "languages" | "interests">>) =>
    apiFetch<{ profile: SeekerProfile; completion: number }>("/seeker/skills", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  updateEducation: (entries: EducationEntry[]) =>
    apiFetch<{ profile: SeekerProfile; completion: number }>("/seeker/education", {
      method: "PUT",
      body: JSON.stringify(entries),
    }),
  updateExperience: (entries: ExperienceEntry[]) =>
    apiFetch<{ profile: SeekerProfile; completion: number }>("/seeker/experience", {
      method: "PUT",
      body: JSON.stringify(entries),
    }),
  uploadResume: (file: File) =>
    apiUpload<{ profile: SeekerProfile; completion: number; parsed: ParsedResume | null; parseError: string | null }>(
      "/seeker/resume",
      file,
      "resume"
    ),
  getCompletion: () => apiFetch<{ completion: number }>("/seeker/completion"),
  completeOnboarding: () =>
    apiFetch<{ completed: boolean; completion: number }>("/seeker/onboarding/complete", { method: "POST" }),
};

// ---- Company API ----
export interface DashboardJobStats {
  id: string;
  title: string;
  status: JobStatus;
  workMode: WorkMode;
  locations: string[];
  employmentType?: string | null;
  createdAt: string;
  views: number;
  applicants: number;
}

export interface DashboardStats {
  activeJobs: number;
  totalJobs: number;
  totalApplicants: number;
  pipeline: Record<string, number>;
  recentApplications: Application[];
  jobs: DashboardJobStats[];
}

export const companyApi = {
  get: () => apiFetch<{ company: Company }>("/company"),
  dashboardStats: () => apiFetch<DashboardStats>("/company/dashboard"),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ company: Company }>("/company", { method: "POST", body: JSON.stringify(data) }),
  update: (data: Record<string, unknown>) =>
    apiFetch<{ company: Company }>("/company", { method: "PUT", body: JSON.stringify(data) }),
  submitVerification: () =>
    apiFetch<{ company: Company; message: string }>("/company/verification", { method: "POST" }),
  completeOnboarding: () =>
    apiFetch<{ completed: boolean; company: Company }>("/company/onboarding/complete", { method: "POST" }),
};

// ---- Job types ----
export type WorkMode = "REMOTE" | "HYBRID" | "ONSITE";
export type JobStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "CLOSED" | "ARCHIVED";

export interface JobSummary {
  id: string;
  title: string;
  employmentType?: string | null;
  workMode: WorkMode;
  locations: string[];
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency: string;
  experienceMin?: number | null;
  experienceMax?: number | null;
  publishedAt?: string | null;
  company: { id: string; name: string; logoUrl?: string | null; headquarters?: string | null };
}

export interface JobDetails extends JobSummary {
  companyId: string;
  department?: string | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  benefits: string[];
  aboutCompany?: string | null;
  requiredSkills: string[];
  preferredSkills: string[];
  educationPref?: string | null;
  experiencePref?: string | null;
  noticePeriodPref?: string | null;
  availabilityPref?: string | null;
  workAuthPref?: string | null;
  screeningQuestions?: unknown;
  status: JobStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobSearchResult {
  jobs: JobSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobSearchParams {
  keyword?: string;
  location?: string;
  workMode?: WorkMode;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceMin?: number;
  skills?: string[];
  industry?: string;
  postedWithinDays?: number;
  sort?: "newest" | "salary" | "relevance";
  page?: number;
  limit?: number;
}

// ---- Job API ----
export const jobApi = {
  search: (params: JobSearchParams) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v == null || v === "") return;
      if (Array.isArray(v)) v.forEach((item) => sp.append(k, String(item)));
      else sp.append(k, String(v));
    });
    return apiFetch<JobSearchResult>(`/jobs/search?${sp.toString()}`);
  },
  getById: (id: string) => apiFetch<{ job: JobDetails; isSaved: boolean }>(`/jobs/${id}`),
  create: (data: Record<string, unknown>) =>
    apiFetch<{ job: JobDetails }>("/jobs", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) =>
    apiFetch<{ job: JobDetails }>(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => apiFetch<{ deleted: boolean }>(`/jobs/${id}`, { method: "DELETE" }),
  listByCompany: () => apiFetch<{ jobs: JobDetails[] }>("/jobs/company/all"),
  save: (id: string) => apiFetch<{ saved: boolean }>(`/jobs/${id}/save`, { method: "POST" }),
  unsave: (id: string) => apiFetch<{ saved: boolean }>(`/jobs/${id}/save`, { method: "DELETE" }),
  listSaved: () => apiFetch<{ jobs: JobSummary[] }>("/jobs/saved/all"),
  duplicate: (id: string) => apiFetch<{ job: JobDetails }>(`/jobs/${id}/duplicate`, { method: "POST" }),
};

// ---- Application types ----
export type ApplicationStage = "APPLIED" | "SCREENING" | "SHORTLISTED" | "INTERVIEW" | "OFFER" | "HIRED" | "REJECTED";

export interface ApplicationSeeker {
  id: string;
  displayName: string | null;
  photoURL: string | null;
  email: string;
  seekerProfile: {
    id: string;
    currentRole: string | null;
    experienceYears: number | null;
    skills: string[];
    location: string | null;
    resumeUrl: string | null;
    profileCompletion: number;
  } | null;
}

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; displayName: string | null };
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  stage: ApplicationStage;
  coverLetter?: string | null;
  rating?: number | null;
  tags: string[];
  aiMatchScore?: number | null;
  aiSummary?: string | null;
  interviewAt?: string | null;
  interviewLink?: string | null;
  rejectedAt?: string | null;
  rejectReason?: string | null;
  createdAt: string;
  seeker: ApplicationSeeker;
  notes?: ApplicationNote[];
  job?: { id: string; title: string; company: { id: string; name: string; logoUrl?: string | null } };
}

// ---- Application API ----
export const applicationApi = {
  apply: (jobId: string, data: { coverLetter?: string; answers?: unknown }) =>
    apiFetch<{ application: Application }>(`/applications/${jobId}/apply`, { method: "POST", body: JSON.stringify(data) }),
  listMine: () => apiFetch<{ applications: Application[] }>("/applications/my/all"),
  listByJob: (jobId: string, stage?: ApplicationStage) =>
    apiFetch<{ applications: Application[]; stats: Record<string, number> }>(
      `/applications/job/${jobId}/all${stage ? `?stage=${stage}` : ""}`
    ),
  getById: (id: string) => apiFetch<{ application: Application }>(`/applications/${id}`),
  getTimeline: (id: string) => apiFetch<{ timeline: TimelineEvent[] }>(`/applications/${id}/timeline`),
  updateStage: (id: string, stage: ApplicationStage, rejectReason?: string) =>
    apiFetch<{ application: Application }>(`/applications/${id}/stage`, {
      method: "PUT",
      body: JSON.stringify({ stage, rejectReason }),
    }),
  updateRating: (id: string, rating: number) =>
    apiFetch<{ rating: number }>(`/applications/${id}/rating`, { method: "PUT", body: JSON.stringify({ rating }) }),
  updateTags: (id: string, tags: string[]) =>
    apiFetch<{ tags: string[] }>(`/applications/${id}/tags`, { method: "PUT", body: JSON.stringify({ tags }) }),
  addNote: (id: string, content: string) =>
    apiFetch<{ note: ApplicationNote }>(`/applications/${id}/notes`, { method: "POST", body: JSON.stringify({ content }) }),
  scheduleInterview: (id: string, interviewAt: string, link?: string) =>
    apiFetch<{ application: Application }>(`/applications/${id}/interview`, {
      method: "POST",
      body: JSON.stringify({ interviewAt, link }),
    }),
};

// ---- Timeline types ----
export interface TimelineEvent {
  id: string;
  event: string;
  fromStage?: ApplicationStage | null;
  toStage?: ApplicationStage | null;
  actorId?: string | null;
  metadata?: unknown;
  createdAt: string;
}

// ---- AI API ----
export interface GeneratedJD {
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string[];
  aboutCompany: string;
}

export interface CandidateMatchResult {
  matchScore: number;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  concerns: string[];
}

export const aiApi = {
  generateJD: (data: Record<string, unknown>) =>
    apiFetch<{ jd: GeneratedJD }>("/ai/jd/generate", { method: "POST", body: JSON.stringify(data) }),
  improveJD: (description: string) =>
    apiFetch<{ improved: string }>("/ai/jd/improve", { method: "POST", body: JSON.stringify({ description }) }),
  salaryRecommendation: (data: Record<string, unknown>) =>
    apiFetch<{ recommendation: { min: number; max: number; currency: string; reasoning: string; marketAverage: number } }>(
      "/ai/salary",
      { method: "POST", body: JSON.stringify(data) }
    ),
  scoreCandidate: (applicationId: string) =>
    apiFetch<{ result: CandidateMatchResult }>(`/ai/score/${applicationId}`, { method: "POST" }),
  interviewQuestions: (applicationId: string) =>
    apiFetch<{ questions: string[] }>(`/ai/interview-questions/${applicationId}`),
};

// ---- Public API (no auth needed) ----
export const publicApi = {
  getCompany: (id: string) =>
    apiFetch<{ company: Company; jobs: JobSummary[] }>(`/public/companies/${id}`),
  listCompanies: (page = 1, limit = 12) =>
    apiFetch<{ companies: (Company & { _count?: { jobs: number } })[]; total: number; page: number; limit: number; totalPages: number }>(
      `/public/companies?page=${page}&limit=${limit}`
    ),
};

// ---- Conversation types ----
export interface ConversationParticipant {
  id: string;
  displayName: string | null;
  photoURL: string | null;
  email: string;
  role: UserRole | null;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  readAt?: string | null;
  createdAt: string;
  sender: { id: string; displayName: string | null; photoURL: string | null };
}

export interface Conversation {
  id: string;
  applicationId?: string | null;
  jobId?: string | null;
  participantAId: string;
  participantBId: string;
  lastMessageAt?: string | null;
  lastMessageText?: string | null;
  createdAt: string;
  updatedAt: string;
  participantA: ConversationParticipant;
  participantB: ConversationParticipant;
  job?: { id: string; title: string; company: { id: string; name: string; logoUrl?: string | null } } | null;
  application?: { id: string; stage: ApplicationStage } | null;
  messages: ChatMessage[];
}

export const conversationApi = {
  start: (data: { otherUserId?: string; jobId?: string; applicationId?: string }) =>
    apiFetch<{ conversation: Conversation }>("/conversations", { method: "POST", body: JSON.stringify(data) }),
  list: () => apiFetch<{ conversations: Conversation[] }>("/conversations"),
  getById: (id: string) => apiFetch<{ conversation: Conversation }>(`/conversations/${id}`),
  sendMessage: (id: string, body: string, attachmentUrl?: string, attachmentName?: string) =>
    apiFetch<{ message: ChatMessage }>(`/conversations/${id}/messages`, {
      method: "POST",
      body: JSON.stringify({ body, attachmentUrl, attachmentName }),
    }),
};

// ---- Notification types ----
export type NotificationType =
  | "APPLICATION_RECEIVED"
  | "APPLICATION_STATUS_CHANGED"
  | "INTERVIEW_SCHEDULED"
  | "MESSAGE_RECEIVED"
  | "JOB_EXPIRING"
  | "WELCOME"
  | "GENERAL";

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body?: string | null;
  linkUrl?: string | null;
  read: boolean;
  readAt?: string | null;
  createdAt: string;
}

export const notificationApi = {
  list: (unreadOnly?: boolean) =>
    apiFetch<{ notifications: NotificationItem[] }>(`/notifications${unreadOnly ? "?unreadOnly=true" : ""}`),
  unreadCount: () => apiFetch<{ count: number }>("/notifications/unread-count"),
  markRead: (id: string) => apiFetch<{ read: boolean }>(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () => apiFetch<{ read: boolean }>("/notifications/read-all", { method: "POST" }),
};
