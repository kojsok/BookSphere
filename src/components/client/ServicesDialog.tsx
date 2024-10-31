'use client'

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ServicesForm from "./ServicesForm";
import { useState } from "react";

interface ServicesDialogProps {
  mode?: 'new' | 'edit'
}

const ServicesDialog = ({ mode = 'new' }: ServicesDialogProps) => {
  const [open, setOpen] = useState<null | boolean>(null)
  const isEdit = mode === 'edit';
  const buttonInner = isEdit ? <Pencil /> : 'Добавить услугу';
  const title = isEdit ? 'Редактировать услугу' : 'Новая услуга';
  const descr = isEdit ? 'редактировать' : 'добавить новую'
  return (
    <Dialog {...open !== null && { open: open }}>
      <DialogTrigger asChild>
        <Button>{buttonInner}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            Здесь вы можете {descr} услугу
          </DialogDescription>
        </DialogHeader>
        <ServicesForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default ServicesDialog;