"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useName from "@/hooks/useName";
import { addFolder } from "@/lib/actions/folder";
import { renameItem } from "@/lib/actions/shared";
import { formSchema } from "@/schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const FolderModal = () => {
  const { isOpen, onClose, type, item } = useName();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user?.id) {
      toast.error(
        "You need to be registered in order to perform this operation!"
      );
    } else {
      // adding new folder
      if (type === "name") {
        toast.promise(
          addFolder({ folderName: values.name, userId: user.id }).then(() =>
            router.refresh()
          ),
          {
            loading: "Processing",
            success: "Folder created successfully",
            error: "Error creating folder",
          }
        );
      } else if (type === "rename") {
        // renaming a folder/file
        if (item) {
          toast.promise(
            renameItem(item, values.name).then(() => router.refresh()),
            {
              loading: "Renaming...",
              success: "Renamed successfull!",
              error: "Rename failed",
            }
          );
        } else {
          toast.error("Unexpected error occurred!");
        }
      }

      form.reset();
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {type === "name" ? "New Folder" : "New Name"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={
                          type === "name" ? "My Folder..." : "New name..."
                        }
                        {...field}
                      />
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
