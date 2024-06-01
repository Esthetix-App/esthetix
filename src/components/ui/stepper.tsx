"use client";

import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { Button } from "./button";
import { Progress } from "./progress";

interface IStep {
  id: string;
  content: ReactNode;
}

interface StepperContextValue {
  steps: IStep[];
  currentStep: number;
  currentStepProgress: number;
  previousStep: () => void;
  nextStep: () => void;
  changeStepProgress: (progress: number) => void;
}

export const StepperContext = createContext({} as StepperContextValue);

interface IStepperProviderProps {
  steps: IStep[];
  initialStep?: number;
  children: React.ReactNode;
}

const Stepper = ({
  children,
  steps,
  initialStep = 0,
}: IStepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [currentStepProgress, setCurrentStepProgress] = useState(0);

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(prevState - 1, 0));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(prevState + 1, steps.length - 1));
  }, [steps.length]);

  const changeStepProgress = useCallback((progress: number) => {
    setCurrentStepProgress(progress);
  }, []);

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStep,
        nextStep,
        previousStep,
        currentStepProgress,
        changeStepProgress,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

const useStepperContext = () => {
  return useContext(StepperContext);
};

const StepperActiveStep = () => {
  const { currentStep, steps } = useStepperContext();

  return steps[currentStep]?.content;
};

const StepperNextButton = () => {
  const { nextStep } = useStepperContext();

  return <Button onClick={nextStep}>Avançar</Button>;
};

const StepperPreviousButton = () => {
  const { previousStep } = useStepperContext();

  return (
    <Button variant="ghost" onClick={previousStep}>
      Voltar
    </Button>
  );
};

const StepperProgress = () => {
  const { steps, currentStep, currentStepProgress } = useStepperContext();

  return (
    <Fragment>
      {steps.map((step, index) => (
        <Progress
          key={step.id}
          value={
            currentStep > index
              ? 100
              : currentStep === index
                ? currentStepProgress
                : 0
          }
        />
      ))}
    </Fragment>
  );
};

export {
  useStepperContext,
  Stepper,
  StepperProgress,
  StepperActiveStep,
  StepperNextButton,
  StepperPreviousButton,
};
