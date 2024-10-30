"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { FC, useState } from "react";

interface WorkingHours {
  day_of_week: number;
  open_time: string;
  close_time: string;
}

const daysOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const WorkingHoursForm: FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);

  const handleAddWorkingHours = () => {
    setWorkingHours((prev) => [
      ...prev,
      { day_of_week: 0, open_time: "09:00", close_time: "21:00" },
    ]);
  };

  const handleUpdateWorkingHours = (
    index: number,
    field: keyof WorkingHours,
    value: string | number
  ) => {
    setWorkingHours((prev) => 
      prev.map((hours, i) => 
        i === index ? { ...hours, [field]: value } : hours
      )
    );
  };

  const handleRemoveWorkingHours = (index: number) => {
    setWorkingHours((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto justify-center space-y-6">
      <h2 className="text-xl font-semibold">Добавить рабочие часы</h2>

      {workingHours.map((hours, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-center">
          <Select
            value={String(hours.day_of_week)}
            onValueChange={(value) =>
              handleUpdateWorkingHours(index, "day_of_week", parseInt(value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="День недели" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="time"
            value={hours.open_time}
            onChange={(e) =>
              handleUpdateWorkingHours(index, "open_time", e.target.value)
            }
            className="w-full"
          />

          <Input
            type="time"
            value={hours.close_time}
            onChange={(e) =>
              handleUpdateWorkingHours(index, "close_time", e.target.value)
            }
            className="w-full"
          />

          <Button
            variant="outline"
            onClick={() => handleRemoveWorkingHours(index)}
          >
            Удалить
          </Button>
        </div>
      ))}

      <Button onClick={handleAddWorkingHours} className="w-full mt-4">
        Добавить день
      </Button>

      <Button
        onClick={() => console.log(workingHours)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Сохранить
      </Button>
    </div>
  );
};

export default WorkingHoursForm;
