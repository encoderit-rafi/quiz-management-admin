import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
type TPros = {
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  item_name: string;
};
export default function AppDeleteDialog({
  item_name,
  open,
  loading,
  onOpenChange,
  onConfirm,
}: TPros) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to{" "}
            <span className="font-semibold text-destructive">delete </span>{" "}
            <span className="font-semibold">{item_name}</span>? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="capitalize min-w-24">
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            className="flex items-center gap-2 min-w-24 capitalize"
            onClick={onConfirm}
            loading={loading}
          >
            <Trash2 /> Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
