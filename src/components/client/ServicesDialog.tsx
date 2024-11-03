'use client'

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ServicesForm from "./ServicesForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A modal dialog component for adding or editing a service.
 * Utilizes a form (`ServicesForm`) to allow users to either create a new service or edit an existing one.
 * The dialog can be customized in appearance through optional styling props.
 *
 * @remarks
 * This component leverages `Dialog`, `DialogTrigger`, `DialogContent`, and other dialog elements for structure and control.
 * It accepts a `mode` prop to toggle between 'new' (create) and 'edit' (update) states for the form.
 *
 * @component
 * @param {ServicesDialogProps} props - The properties to configure the `ServicesDialog`.
 * 
 * @prop {"new" | "edit"} [mode="new"] - Specifies the dialog mode: "new" for adding a new service, or "edit" for modifying an existing service.
 * 
 * @prop {Object} [styling] - Optional CSS class names to customize dialog appearance.
 * @prop {string} [styling.trigger] - Class name for the button or trigger element.
 * @prop {string} [styling.title] - Class name for the dialog title.
 * @prop {string} [styling.description] - Class name for the dialog description.
 * @prop {string} [styling.header] - Class name for the dialog header.
 * 
 * @example
 * // Basic usage for creating a new service
 * <ServicesDialog mode="new" />
 *
 * @example
 * // Using with custom styles and edit mode
 * <ServicesDialog
 *   mode="edit"
 *   styling={{
 *     trigger: "custom-trigger",
 *     title: "custom-title",
 *     description: "custom-description",
 *     header: "custom-header",
 *   }}
 * />
 * 
 * @returns {JSX.Element} The rendered `ServicesDialog` component.
 */

interface ServicesDialogProps {
  mode?: 'new' | 'edit',
  styling?: {
    trigger?: string,
    title?: string,
    description?: string,
    header?: string
  }
}

const ServicesDialog = ({ mode = 'new', styling }: ServicesDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const isEdit = mode === 'edit';
  const buttonInner = isEdit ? <Pencil className="group-hover:text-primary transition ease-in-out duration-150" /> : 'Добавить услугу';
  const title = isEdit ? 'Редактировать услугу' : 'Новая услуга';
  const descr = isEdit ? 'редактировать' : 'добавить новую'
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className={cn(styling?.trigger)}
      >
        <Button className="group" variant={isEdit ? 'outline' : 'default'}>{buttonInner}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader
          className={cn(styling?.header)}
        >
          <DialogTitle
            className={cn(styling?.title)}
          >
            {title}
          </DialogTitle>
          <DialogDescription
            className={cn(styling?.description)}
          >
            Здесь вы можете {descr} услугу
          </DialogDescription>
        </DialogHeader>
        <ServicesForm onSuccess={() => setOpen(false)} />
      </DialogContent>

    </Dialog>
  );
}

export default ServicesDialog;