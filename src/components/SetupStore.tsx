"use client";
import DialogModel from "@/components/models/DialogModel";
import { useStoreModel } from "@/store/useStoreModel";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as Z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

const formShema = Z.object({
  name: Z.string().min(1),
});

const SetupStore = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useStoreModel((state) => state);
  const form = useForm<Z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
    },
  });

  const loading = form.formState.isLoading;

  const onSubmit = async (values: Z.infer<typeof formShema>) => {
    try {
      const response = await axios.post("/api/stores", values);
      console.log(response.data);
      toast(`store has been created '${response.data?.name}'`);
      window.location.assign(`/dashboard/${response.data.id}`);
    } catch (error) {
      console.log(error);
      toast(`Something went wrong`);
    }
  };

  return (
    <div>
      <DialogModel
        isOpen={true}
        title="Create Store"
        onClose={onClose}
        description="Add new Store to manage products and categories"
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Store Name..."
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    variant={"outline"}
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancle
                  </Button>
                  <Button type="submit" disabled={loading}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogModel>
    </div>
  );
};

export default SetupStore;
