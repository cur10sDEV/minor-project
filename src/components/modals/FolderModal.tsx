"use client";

import useFolder from "@/hooks/useFolder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  folderName: z.string().min(2, {
    message: "Folder name must be at least 2 characters.",
  }),
});

const FolderModal = () => {
  const { isOpen, onOpen, onClose } = useFolder();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="My Folder..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center space-x-2">
                <Button variant={"ghost"} type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant={"outline"} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default FolderModal;
