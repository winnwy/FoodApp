import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const loading = false;

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    // move to next input field
    if (value !== "" && index !== otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
    // move to previous input field
    if (value === "" && index !== 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap=10 border border-gray-200">
        <div className="text-center mb-4">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 character code sent to your email address
          </p>
        </div>
        <form>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element) => {
                  if (element) inputRef.current[idx] = element;
                }}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-xs md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <div className="mt-6">
            {loading ? (
              <Button
                disabled
                className="w-full" variant={"orange"}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className=" w-full" variant={"orange"}
              >
                Verify
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
