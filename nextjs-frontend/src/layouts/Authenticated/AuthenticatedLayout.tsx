"use client";
import { Session } from "next-auth";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ session: Session | null }>;

export function AuthenticatedLayout({ children, session }: Props) {
  // Redirect if not logged in
  // const router = useRouter();
  // if (!session) {
  //   router.push("/login");
  // }

  return <>{children}</>;
}
