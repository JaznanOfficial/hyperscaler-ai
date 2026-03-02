export interface ServiceInputProps {
  defaultValues?: Record<string, string | boolean>;
  onChange?: (fieldId: string, value: string | boolean) => void;
}
