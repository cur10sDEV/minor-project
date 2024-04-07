"use client";

import usePlan from "@/hooks/usePlan";
import PlanCard from "../shared/PlanCard";
import { Dialog, DialogContent } from "../ui/dialog";

const PlanModal = () => {
  const { isOpen, onClose } = usePlan();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-12">
        <div className="opactiy-75 text-center text-xl mb-4">
          Choose a plan that&apos;s right for you
        </div>
        <div className="grid grid-cols-2 gap-12">
          {planArray.map((plan) => (
            <PlanCard plan={plan} key={plan.name} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PlanModal;

const planArray = [
  {
    name: "Basic",
    description: "1.5 GB",
    price: "Free",
    options: "1.5 GB of storage",
  },
  {
    name: "Pro",
    description: "15 GB",
    price: "10",
    options:
      "15 GB of storage, More storage, Share with upto 5 members, More features unlocked",
  },
];
