export interface FeedbackRequest {
  question: string;
  response: string;
  model: string;
  rating: number;
}

export interface FeedbackResponse {
  id: number;
  question: string;
  response: string;
  model: string;
  rating: number;
  created_at: string;
}

export interface UseStreamChatReturn {
  text: string;
  isLoading: boolean;
  error: string | null;
  startStream: (prompt: string, model: string) => Promise<void>;
  abortStream: () => void;
}

export interface ChatInputProps {
  onSubmit: (prompt: string) => void;
  isDisabled: boolean;
}

export interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  disabled: boolean;
}

export interface ResponseBoxProps {
  title: string;
  model: string;
  text: string;
  isLoading: boolean;
  error: string | null;
  question: string;
}

export interface ResponsePanelProps {
  gpt35: UseStreamChatReturn;
  gpt4o: UseStreamChatReturn;
  question: string;
}

export interface StarDisplayProps {
  rating: number;
}

export interface NavItem {
  label: string;
  path: string;
}
