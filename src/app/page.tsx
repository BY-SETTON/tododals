import TodaysTasks from "@/app/todays-tasks/TodaysTasks";

export default async function Home({params}: {
  params: {
    id: string
  }
}) {
  return (<TodaysTasks/>);
}
