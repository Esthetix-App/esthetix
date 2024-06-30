"use client";

import React, { useRef } from "react";
import ReactSignature, {
  type SignatureRef,
  type SignatureProps,
} from "@uiw/react-signature";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

interface ISignatureProps extends Omit<SignatureProps, "ref"> {
  disabled?: boolean;
}

function Signature({ disabled, ...props }: ISignatureProps) {
  const signatureRef = useRef<SignatureRef | null>(null);
  const handleClear = () => {
    signatureRef.current?.clear();
  };

  return (
    <div>
      <ReactSignature
        ref={signatureRef}
        className="border-b border-foreground/60"
        {...props}
        readonly={disabled}
        options={{
          size: 2,
          ...props.options,
        }}
      />
      {!disabled && (
        <Button size="sm" type="button" className="mt-4" onClick={handleClear}>
          <Eraser className="mr-2 size-4" />
          Limpar
        </Button>
      )}
    </div>
  );
}

export { Signature };
