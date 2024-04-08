"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  CreateRoomParamsSchema,
  CreateRoomParamsType,
} from "@/lib/client/room/create";
import { PermissionEnumType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

type CreateRoomFormProps = {
  createRoomQuery: (params: CreateRoomParamsType) => void;
};
const CreateRoomForm = ({ createRoomQuery }: CreateRoomFormProps) => {
  const [open, setOpen] = useState(false);

  const defaultParams: CreateRoomParamsType = {
    id: `room-${nanoid()}`,
    defaultAccesses: ["room:write", "room:read", "room:presence:write"],
    usersAccesses: {
      hector: ["room:write"],
    },
    groupsAccesses: {
      product: ["room:write"],
    },
  };

  const form = useForm<CreateRoomParamsType>({
    resolver: zodResolver(CreateRoomParamsSchema),
    defaultValues: defaultParams,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    form.handleSubmit(
      (valid) => {
        createRoomQuery(valid);
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(valid, null, 2)}
              </code>
            </pre>
          ),
        });
      },
      (invalid) => console.log(invalid)
    )(e);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size="sm"
          className="h-8 gap-1"
          onPointerDown={() => {
            console.log("create room");
          }}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Room
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add room</DialogTitle>
          <DialogDescription>Add...</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder={defaultParams["id"]} {...field} />
                  </FormControl>
                  <FormDescription>This is the Room's id.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultAccesses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Accesses</FormLabel>
                  <FormControl>
                    <MultiSelect<PermissionEnumType>
                      selected={field.value}
                      onSelectedChange={(selected) =>
                        form.setValue("defaultAccesses", selected)
                      }
                      options={[
                        "room:write",
                        "room:read",
                        "room:presence:write",
                      ]}
                    />
                  </FormControl>
                  <FormDescription>Default Accesses</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
          control={form.control}
          name="groupsAccesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Accesses</FormLabel>
              <FormControl>
              </FormControl>
              <FormDescription>Group Accesses</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
            {/* <FormField
          control={form.control}
          name="usersAccesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Users Accesses</FormLabel>
              <FormControl>
              </FormControl>
              <FormDescription>Users Accesses</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateRoomForm };
