"use client";
import Heading from "@/components/Heading";
import APiAlert from "@/components/models/APiAlert";
import { AlertModel } from "@/components/models/AlertModel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface SettingFormProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingForm: React.FC<SettingFormProps> = ({ store }) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const loading = form.formState.isLoading;

  const onSubmit = async (data: SettingFormValues) => {
    try {
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast("Store Upadted");
    } catch (error) {
      toast("Something went wrong!");
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      toast("Store deleted");
      router.push("/");
    } catch (error) {
      toast("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="w-5 h-5 mr-2" />
          Delete Store
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className=" grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <APiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingForm;
