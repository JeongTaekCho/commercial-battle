import StoreReport from "@/src/components/report/StoreReport";

export default async function StoreReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StoreReport id={id} />;
}
