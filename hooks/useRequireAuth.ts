import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useRequireAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return session;
};

export default useRequireAuth;
