import { Button } from "@/components/ui/button";

export const FormNewFooterMobile = () => {
  return (
    <div className="flex items-center justify-center gap-2 md:hidden">
      <Button variant="outline" size="sm">
        Discard
      </Button>
      <Button size="sm">Save Product</Button>
    </div>
  );
};
