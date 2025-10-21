// src/types/questionnaire.ts

/**
 * Questionnaire Type Definitions
 * 
 * These types define the contract between the backend and frontend for the wizard questionnaire system.
 * The backend sends questions with specific renderConfig instructions, and the frontend interprets
 * and renders them using the appropriate input components.
 */

// ============= Question Types =============

/**
 * All supported input types for rendering questions
 */
export type QuestionInputType =
  | "pill-select"      // Pill/capsule-shaped buttons for single or multiple selection
  | "text-input"       // Standard text input field
  | "textarea"         // Multi-line text input
  | "number-input"     // Numeric input with optional min/max
  | "email-input"      // Email validation input
  | "phone-input"      // Phone number input
  | "date-input"       // Date picker
  | "time-input"       // Time picker
  | "datetime-input"   // Date and time picker
  | "scale-slider"     // Numeric scale/slider (e.g., 1-10)
  | "checkbox"         // Single checkbox or multiple checkboxes
  | "radio"            // Radio button group
  | "dropdown"         // Select dropdown
  | "multi-select"     // Multiple selection dropdown
  | "rating"           // Star or emoji rating
  | "file-upload"      // File upload input
  | "color-picker"     // Color selection
  | "range-slider"     // Range slider with min and max values
  | "toggle"           // Toggle/switch button
  | "likert-scale";    // Likert scale (Strongly Disagree to Strongly Agree)

/**
 * Validation rules that can be applied to any input type
 */
export interface ValidationRule {
  type: "required" | "min" | "max" | "minLength" | "maxLength" | "pattern" | "email" | "url" | "custom";
  value?: string | number | boolean;
  message?: string;
  customValidator?: (value: unknown) => boolean;
}

/**
 * Styling instructions from backend for rendering components
 */
export interface RenderStyle {
  variant?: "default" | "outlined" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: string;
  layout?: "vertical" | "horizontal" | "grid";
  gridColumns?: number;
  spacing?: "tight" | "normal" | "relaxed";
}

/**
 * Configuration for rendering different input types
 * This is sent by the backend to instruct frontend how to display the question
 */
export interface RenderConfig {
  // For select-based inputs (pill-select, radio, checkbox, dropdown)
  options?: Array<{
    label: string;
    value: string | number;
    description?: string;
    icon?: string;
    disabled?: boolean;
  }>;
  
  // For scale/slider inputs
  min?: number;
  max?: number;
  step?: number;
  labels?: { [key: number]: string }; // Labels for specific scale values
  showValue?: boolean;
  
  // For text inputs
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  rows?: number; // For textarea
  
  // For file upload
  accept?: string; // File types to accept
  maxSize?: number; // Max file size in bytes
  multiple?: boolean;
  
  // General styling and layout
  style?: RenderStyle;
  
  // Help text or additional information
  helpText?: string;
  tooltip?: string;
  
  // Conditional rendering logic (for future expansion)
  conditionalRender?: {
    dependsOn: string; // Question ID
    condition: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    value: unknown;
  };
}

/**
 * A question object sent from the backend
 */
export interface QuestionnaireQuestion {
  id: string;
  text: string;
  description?: string;
  type: QuestionInputType;
  renderConfig: RenderConfig;
  isRequired: boolean;
  order?: number;
  sectionId?: string;
  validation?: ValidationRule[];
}

// ============= Session Types =============

/**
 * Session status
 */
export type SessionStatus = "in-progress" | "completed" | "abandoned";

/**
 * Questionnaire session data
 */
export interface QuestionnaireSession {
  id: string;
  userId?: string;
  status: SessionStatus;
  currentStep: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

/**
 * Answer data structure
 */
export interface QuestionnaireAnswer {
  id?: string;
  sessionId: string;
  questionId: string;
  answer: unknown; // Flexible type for any answer format
  createdAt?: string;
  updatedAt?: string;
}

// ============= Section & Checkpoint Types =============

/**
 * Question section grouping
 */
export interface QuestionnaireSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  questions?: QuestionnaireQuestion[];
}

/**
 * Checkpoint milestone in the wizard
 */
export interface QuestionnaireCheckpoint {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  order: number;
  iconType?: string;
  isCompleted?: boolean;
}

// ============= API Response Types =============

/**
 * Response from session creation
 */
export interface CreateSessionResponse {
  sessionId: string;
  session: QuestionnaireSession;
}

/**
 * Response from fetching questions (adaptive mode)
 */
export interface GetQuestionsResponse {
  question?: QuestionnaireQuestion;
  done?: boolean;
  checkpoint?: QuestionnaireCheckpoint;
  progress?: {
    current: number;
    total: number;
    percentage: number;
  };
}

/**
 * Response from fetching all questions (batch mode)
 */
export interface GetAllQuestionsResponse {
  questions: QuestionnaireQuestion[];
  sections?: QuestionnaireSection[];
  checkpoints?: QuestionnaireCheckpoint[];
}

/**
 * Response from submitting an answer
 */
export interface SubmitAnswerResponse {
  success: boolean;
  answer: QuestionnaireAnswer;
}

/**
 * Error response structure
 */
export interface QuestionnaireError {
  error: string;
  message: string;
  statusCode: number;
}

// ============= Frontend State Types =============

/**
 * Local state for managing the wizard
 */
export interface WizardState {
  session: QuestionnaireSession | null;
  currentQuestion: QuestionnaireQuestion | null;
  answers: Map<string, unknown>;
  checkpoints: QuestionnaireCheckpoint[];
  isLoading: boolean;
  error: string | null;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
}

/**
 * Actions for wizard state management
 */
export type WizardAction =
  | { type: "SET_SESSION"; payload: QuestionnaireSession }
  | { type: "SET_QUESTION"; payload: QuestionnaireQuestion | null }
  | { type: "SET_ANSWER"; payload: { questionId: string; answer: unknown } }
  | { type: "SET_CHECKPOINTS"; payload: QuestionnaireCheckpoint[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROGRESS"; payload: { current: number; total: number; percentage: number } }
  | { type: "COMPLETE_CHECKPOINT"; payload: string }
  | { type: "RESET" };

// ============= Canvas Types =============

/**
 * Artistic canvas configuration
 */
export interface ArtisticCanvasConfig {
  type: "pattern" | "image";
  source?: string; // URL for image type
  patternType?: "gradient" | "geometric" | "abstract" | "waves" | "particles";
  colors?: string[];
  animated?: boolean;
}

/**
 * Canvas rotation timing
 */
export interface CanvasRotation {
  interval: number; // Milliseconds (random < 60000)
  nextRotation: number;
}
