import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export const FormFooterMobile = ({
  showResetButton,
}: {
  showResetButton?: boolean;
}) => {
  const { reset } = useFormContext();

  const handleResetForm = () => {
    reset();
  };

  return (
    <div className="flex items-center justify-center gap-2 pb-10 md:hidden">
      {showResetButton && (
        <Button type="button" variant="outline" onClick={handleResetForm}>
          Descartar
        </Button>
      )}
      <Button type="submit">Salvar Formulário</Button>
    </div>
  );
};
