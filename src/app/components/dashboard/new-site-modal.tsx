"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { createSite } from "@/lib/actions/page";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSiteSchema } from "@/lib/validations/page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof createSiteSchema>;

export default function NewPageModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      title: "",
      subdomain: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await createSite(data);
      if (res.success === false) {
        toast.error("Error", { description: res.msg });
      } else if (res.site) {
        toast.success("Success", {
          description: data.title + " has been created.",
        });
        setOpen(false);

        router.refresh();
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Site</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Site</DialogTitle>
          <DialogDescription>
            Enter the details for your new site.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 rounded-md ">
                      <Input
                        {...field}
                        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <div className="inline-flex items-center px-3 text-sm border border-l-0 rounded-r-md border-input bg-muted text-muted-foreground">
                        .visionvault.site
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-4" />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-umami-event="create-site"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  </>
                ) : (
                  "Create Site"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
