import AppLayout from "@lib/components/Layouts/AppLayout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@lib/auth/session";

const Page = () => {
  return (
    <>
      <AppLayout>
        <div>View Users/ Add Users</div>
      </AppLayout>
    </>
  );
};

export default Page;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session && session?.user?.role === "admin") {
   
    return { redirect: { permanent: false, destination: "/admin" } };
  }

  if(session && session?.user?.role === "suspended") {
    return {
      redirect: {
        destination: "/noaccount",
        permanent: false,
      },
    };
  }

  return {
    props: { session: session },
  };
}

