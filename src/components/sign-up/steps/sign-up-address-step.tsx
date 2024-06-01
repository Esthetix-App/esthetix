import {
  StepperNextButton,
  StepperPreviousButton,
} from "@/components/ui/stepper";

export const SignUpAddressStep = () => {
  return (
    <div className="grid gap-4">
      SignUpAddressStep
      <div className="mt-3 flex items-center justify-end gap-3  ">
        <StepperPreviousButton />
        <StepperNextButton />
      </div>
    </div>
  );
};
