"use client";

import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MessageType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  message: MessageType["content"][0];
}

export const FormBubble: React.FC<Props> = ({ message }) => {
  const fields = React.useMemo(() => {
    const f: { name: string; error: string }[] = [];

    if (message?.fields && message?.fields?.length > 0) {
      for (const item of message?.fields) {
        f.push({
          name: item.name,
          error: item.error ?? "Field is required",
        });
      }
    }

    return f;
  }, [message]);

  const formSchema = React.useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const f of fields) {
      shape[f.name] = z.string().min(1, { message: f.error });
    }

    return z.object(shape);
  }, [fields]);

  type FormSchemaType = z.infer<typeof formSchema>;

  const defaultValues = React.useMemo(() => {
    const obj: Record<string, string> = {};

    for (const f of fields) {
      obj[f.name] = "";
    }

    return obj;
  }, [fields]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  async function onSubmit(values: FormSchemaType) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully");
      console.log(values);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  if (!message.fields) return null;

  return (
    <div className="relative flex flex-col">
      <pre className="font-sans text-sm font-normal whitespace-pre-wrap sm:text-base">
        {message.message}
      </pre>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-1.5 flex flex-col gap-1"
        >
          {message.fields.map((item, idx) => {
            const Field = item.field === "input" ? Input : Textarea;

            return (
              <FormField
                key={idx}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Field
                        {...field}
                        type={item.type}
                        placeholder={item.placeholder}
                        disabled={isSubmitting}
                        aria-invalid={!!form.formState.errors[field.name]}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                      />
                    </FormControl>
                    <FormMessage className="ml-3" />
                  </FormItem>
                )}
              />
            );
          })}

          <Button
            size="lg"
            type="submit"
            variant="secondary"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Please wait..."
          >
            <span>{isSubmitSuccessful ? "Thanks!" : "Send Message"}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
