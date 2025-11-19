"use client";

import * as React from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { RxOpenInNewWindow } from "react-icons/rx";

import { cn, extractDomain } from "@/lib/utils";
import { MessageType } from "@/lib/types";
import { useSound } from "../provider/sound.provider";
import { useChatAudio } from "@/hooks/audio";

import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// -----------------------------------------------------
// Form schema builder
// -----------------------------------------------------
function useDynamicForm(messages: MessageType[]) {
  const fields = React.useMemo(() => {
    const f: { name: string; error: string }[] = [];

    for (const msg of messages) {
      for (const c of msg.content) {
        if (c.form && c.form.length > 0) {
          for (const item of c.form) {
            f.push({
              name: item.name,
              error: item.error ?? "Field is required",
            });
          }
        }
      }
    }

    return f;
  }, [messages]);

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

  return { form, formSchema };
}

// -----------------------------------------------------
// Typing bubble
// -----------------------------------------------------
function TypingBubble({
  msg,
  typingDots,
}: {
  msg: MessageType;
  typingDots: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2 sm:gap-3"
    >
      <Avatar size="sm">
        <AvatarImage src={msg.avatar ?? "img.jpg"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex max-w-[280px] flex-col gap-1 sm:max-w-[308px]">
        <p className="ml-2 text-xs font-medium opacity-50 sm:text-sm">
          {msg.from}
        </p>

        <div className="bg-secondary text-foreground dark:bg-secondary/70 w-fit rounded-xl">
          <div className="flex items-center gap-1 p-3">
            {typingDots.map((_, i) => (
              <motion.span
                key={i}
                className="bg-foreground size-[7px] rounded-full"
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------
// Main bubble component
// -----------------------------------------------------
export function MessageBubble({ messages }: { messages: MessageType[] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { form, formSchema } = useDynamicForm(messages);

  const { isMuted } = useSound();
  const { ready: audioReady, sentRef, recvRef } = useChatAudio();

  const bottomRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(true);
  const [showTyping, setShowTyping] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentContentIndex, setCurrentContentIndex] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    function handle() {
      setIsVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", handle);
    handle();
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  // -----------------------------------------------------
  // Submit handler
  // -----------------------------------------------------
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully");
      console.log(values);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // -----------------------------------------------------
  // Scroll
  // -----------------------------------------------------
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex, currentContentIndex, showTyping]);

  // -----------------------------------------------------
  // Audio
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (!audioReady) return;
    if (isMuted) return;
    if (currentIndex >= messages.length) return;

    const msg = messages[currentIndex];
    if (!showTyping) {
      const ref = msg.type === "user" ? sentRef : recvRef;
      ref.current?.play().catch(() => {});
    }
  }, [
    audioReady,
    isMuted,
    currentIndex,
    currentContentIndex,
    showTyping,
    sentRef,
    recvRef,
    messages,
    isVisible,
  ]);

  // -----------------------------------------------------
  // Step 1: initial typing delay
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (currentIndex >= messages.length) return;

    const msg = messages[currentIndex];

    if (msg.type === "user") {
      setShowTyping(false);
      setCurrentContentIndex(msg.content.length);

      const t = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setCurrentContentIndex(0);
        setShowTyping(true);
      }, 1000);

      return () => clearTimeout(t);
    }

    const lengths = msg.content.map((c) => (c.text ? c.text.length : 0));
    const delay = Math.min(7000, 800 + lengths[0] * 50);

    setShowTyping(true);

    const t = setTimeout(() => {
      setShowTyping(false);
      setCurrentContentIndex(1);
    }, delay);

    return () => clearTimeout(t);
  }, [currentIndex, isVisible, messages]);

  // -----------------------------------------------------
  // Step 2: reveal content
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (currentIndex >= messages.length) return;
    if (showTyping) return;

    const total = messages[currentIndex].content.length;
    if (currentContentIndex >= total) return;

    const t = setTimeout(() => {
      setCurrentContentIndex((i) => i + 1);
    }, 450);

    return () => clearTimeout(t);
  }, [currentContentIndex, currentIndex, isVisible, messages, showTyping]);

  // -----------------------------------------------------
  // Step 3: move to next message
  // -----------------------------------------------------
  React.useEffect(() => {
    if (!isVisible) return;
    if (currentIndex >= messages.length) return;

    const msg = messages[currentIndex];
    const lengths = msg.content.map((c) => (c.text ? c.text.length : 0));
    const delay = Math.min(7000, 800 + lengths[0] * 50);

    if (currentContentIndex === msg.content.length) {
      const t = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setCurrentContentIndex(0);
        setShowTyping(true);
      }, delay);

      return () => clearTimeout(t);
    }
  }, [currentContentIndex, currentIndex, isVisible, messages]);

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  const typingDots = ["0", "1", "2"];

  return (
    <div className="flex flex-col gap-3">
      {messages.slice(0, currentIndex + 1).map((msg, idx) => {
        const isActive = idx === currentIndex;
        const isFromUser = msg.type === "user";
        const visible = isActive ? currentContentIndex : msg.content.length;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive && showTyping ? 0.4 : 1 }}
            transition={{ duration: 0.3 }}
            className={cn("flex items-end gap-2 sm:gap-3", {
              "flex-row-reverse": isFromUser,
            })}
          >
            {!isFromUser && !(isActive && showTyping) && (
              <Avatar size="sm">
                <AvatarImage src={msg.avatar ?? "img.jpg"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}

            <div className="flex max-w-[280px] flex-col gap-1 sm:max-w-[308px]">
              {!(isActive && showTyping) && (
                <p
                  className={cn(
                    "mr-0 ml-2 text-xs font-normal opacity-50 sm:text-sm",
                    isFromUser && "mr-2 ml-0 text-right",
                  )}
                >
                  {msg.from}
                </p>
              )}

              <div className="flex flex-col gap-1">
                {msg.content.slice(0, visible).map((content, cIdx) => {
                  const Comp = content.route?.href ? Link : "div";

                  return (
                    <Comp
                      key={cIdx}
                      href={content.route?.href as string}
                      className={cn(
                        "bg-secondary/50 text-foreground w-fit rounded-xl",
                        isFromUser && "bg-primary dark:bg-primary text-white",
                      )}
                    >
                      {/* IMAGE */}
                      {content.imgUrl && (
                        <div className="p-2 pb-0">
                          <div className="group bg-secondary relative max-h-[300px] overflow-hidden rounded-lg">
                            <Image
                              src={content.imgUrl}
                              alt={content?.text?.[0] ?? "Image"}
                              className="size-full object-cover transition duration-500 ease-out group-hover:scale-110"
                              width={1200}
                              height={760}
                              quality={100}
                              priority
                            />
                            {content.route?.href && (
                              <div className="bg-background/80 absolute top-2 right-2 flex size-10 items-center justify-center rounded-full border backdrop-blur-2xl">
                                <RxOpenInNewWindow className="size-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* TEXT */}
                      <div className="flex flex-col px-3 py-1.5">
                        <div className="flex flex-col gap-2">
                          {content.text &&
                            content.text.map((txt, idx2) => (
                              <p
                                key={idx2}
                                className={cn(
                                  "text-foreground text-sm font-normal sm:text-base",
                                  isFromUser && "font-medium text-white",
                                )}
                              >
                                {txt}
                              </p>
                            ))}
                        </div>

                        {/* LINKS */}
                        {content.links && content.links.length > 0 && (
                          <div className="bg-secondary my-1.5 flex flex-col rounded-lg px-3 py-2">
                            {content.links.map((link, i3) => (
                              <Link
                                key={i3}
                                href={link.href ?? ""}
                                target={
                                  content.route?.newTab ? "_blank" : "_self"
                                }
                                className="group mb-2 flex flex-col last-of-type:mb-0"
                              >
                                <p className="text-foreground text-sm font-normal">
                                  {link.text}
                                </p>
                                <span className="text-primary w-max items-center text-sm font-medium group-hover:underline">
                                  {extractDomain(link.href ?? "")}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* SOCIALS */}
                        {content.socials && content.socials.length > 0 && (
                          <div className="my-1.5 flex flex-col gap-1.5">
                            {content.socials.map((social, i4) => (
                              <Link
                                key={i4}
                                href={social.href ?? ""}
                                target="_blank"
                                className={buttonVariants({
                                  variant: "secondary",
                                  size: "lg",
                                })}
                              >
                                <span>{social.text}</span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* FORM */}
                        {content.form && content.form.length > 0 && (
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="my-1.5 flex flex-col gap-1.5"
                            >
                              {content.form.map((social, i5) => {
                                const Field =
                                  social.field === "input" ? Input : Textarea;

                                return (
                                  <FormField
                                    key={i5}
                                    control={form.control}
                                    name={social.name}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Field
                                            autoComplete="off"
                                            type={social.type}
                                            placeholder={social.placeholder}
                                            {...field}
                                            disabled={isSubmitting}
                                            value={
                                              typeof field.value === "string"
                                                ? field.value
                                                : ""
                                            }
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                );
                              })}

                              <Button
                                type="submit"
                                variant="secondary"
                                className="w-full"
                                size="lg"
                                isLoading={isSubmitting}
                                loadingText="Please wait..."
                              >
                                <span>Send Message</span>
                              </Button>
                            </form>
                          </Form>
                        )}
                      </div>
                    </Comp>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}

      {showTyping && currentIndex < messages.length && isVisible && (
        <TypingBubble msg={messages[currentIndex]} typingDots={typingDots} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
