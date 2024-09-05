"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CircleCheckBig } from "lucide-react";
import { verifyEmail } from "../../../lib/actions/user.actions";
import DefaultLayout from "@/components/Layout/DefaultLayout";

const VerifyEmailContent: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (token) {
        try {
          await verifyEmail(token);
          setStatus("success");
        } catch (error) {
          console.error("Error verifying email:", error);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="mt-20 h-screen  text-center">
      <span className="mt-15 inline-block">
        <CircleCheckBig size={60} />
      </span>
      {status === "loading" && <p>Verifying your email, please wait...</p>}
      {status === "success" && (
        <p>Your email has been successfully verified!</p>
      )}
      {status === "error" && (
        <p>There was an error verifying your email. Please try again.</p>
      )}
      {status === "success" && (
        <button
          onClick={() => router.push("/auth-page/sign-in")}
          className="mt-4 rounded-lg bg-primary p-3 text-white"
        >
          Go to Sign In
        </button>
      )}
    </div>
  );
};

const VerifyEmailPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </DefaultLayout>
  );
};

export default VerifyEmailPage;
