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
import { addFolder } from "@/lib/actions/folder";
import { formSchema } from "@/schemas";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const FolderModal = () => {
  const { isOpen, onClose } = useFolder();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      toast.error(
        "You need to be registered in order to perform this operation!"
      );
    } else {
      const folder = await toast.promise(
        addFolder({ folderName: values.folderName, userId: user.id }),
        {
          loading: "Processing",
          success: "Folder created successfully",
          error: "Error creating folder",
        }
      );

      form.reset();
      onClose();
    }
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
