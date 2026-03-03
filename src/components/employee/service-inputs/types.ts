import type { FixedServiceId } from "@/data/fixed-services";

export interface ServiceInputProps {
  defaultValues?: Record<string, string | boolean>;
  onChange?: (fieldId: string, value: string | boolean) => void;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  serviceId?: FixedServiceId | null;
}
