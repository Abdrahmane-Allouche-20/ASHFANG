import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      title="This page doesn't exist."
      lede="The link may be broken or the page may have moved."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary btn-lg">
          Back to home
        </Link>
        <Link href="/contact" className="btn btn-secondary btn-lg">
          Contact us
        </Link>
      </div>
    </PageHeader>
  );
}
