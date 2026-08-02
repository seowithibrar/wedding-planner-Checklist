export interface WeddingTask {
  id: string;
  title: string;
  description: string;
  category: string;
  monthsBefore: number;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  completed?: boolean;
  completedAt?: string;
  assignedTo?: string;
  dueDate?: string;
  notes?: string;
}

export interface TaskCategory {
  id: string;
  label: string;
  color: string;
  icon: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  monthsBefore: number;
  category: string;
  icon: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  completedAt?: string;
  targetDate?: string;
}

export interface WeddingProfile {
  weddingDate: string;
  partnerName1: string;
  partnerName2: string;
  budget: number;
  guestCount: number;
  style: 'traditional' | 'modern' | 'destination' | 'intimate' | 'rustic' | 'glamorous';
  venueType: 'indoor' | 'outdoor' | 'both';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  category: string;
  notes?: string;
  isAllDay?: boolean;
}

export interface PlannerDay {
  date: string;
  tasks: WeddingTask[];
  notes: string;
}

export interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  byCategory: Record<string, { total: number; completed: number; percentage: number }>;
}

export interface ToolInfo {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

export type PlannerView = 'day' | 'week' | 'month';
export type MilestoneStatus = 'not-started' | 'in-progress' | 'completed';
