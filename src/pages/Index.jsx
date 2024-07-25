import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Sneaker Side-Hustle Tracker</h1>
        <p className="mb-6">Keep track of your sneaker purchases and sales with ease.</p>
        <Button asChild>
          <Link to="/sneaker-accounting">Go to Sneaker Accounting</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
