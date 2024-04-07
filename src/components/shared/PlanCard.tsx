import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type plan = {
  name: string;
  description: string;
  price: string;
  options: string;
  priceId?: string;
};

interface PlanCardProps {
  plan: plan;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const { name, description, options, price, priceId } = plan;
  return (
    <div className="border rounded-md p-4">
      <h1 className="text-center text-xl">{name}</h1>
      <div className="text-center mt-4 text-3xl">{description}</div>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">
          {price !== "Free" && "$"}
          {price}
        </span>
        <span className="text-gray-500 dark:text-gray-400"> / month</span>
      </div>
      <div className="w-full flex justify-center">
        <Button className="text-lg p-6">Get Offer</Button>
      </div>
      <Separator className="mt-4" />
      <p className="mt-3 opacity-75">This plan includes</p>

      <div className="flex flex-col mt-4 space-y-2">
        {options.split(", ").map((o) => (
          <div key={o} className="flex items-center">
            <Check className="mr-2" size={16} />
            <span>{o}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PlanCard;
