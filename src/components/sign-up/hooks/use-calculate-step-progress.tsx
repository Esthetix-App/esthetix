import { useFormContext } from "react-hook-form";
import type { SignUpFormData } from "./use-sign-up-form";

interface useCalculateStepProgress {
  step: keyof SignUpFormData;
  totalFields?: number;
}

export const useCalculateStepProgress = ({
  step,
  totalFields,
}: useCalculateStepProgress) => {
  const { watch } = useFormContext<SignUpFormData>();

  const stepFields = watch(step);

  const calculateProgress = () => {
    const total = totalFields ?? Object.entries(stepFields).length - 1;
    const filledFields = Object.values(stepFields).filter(Boolean).length;
    return (filledFields / total) * 100;
  };

  const progress = calculateProgress();

  return progress;
};
