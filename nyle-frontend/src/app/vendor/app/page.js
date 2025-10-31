import VendorInfoLayout from "@/components/vendor/VendorInfoLayout";
import Link from "next/link";

export default function VendorAppPage() {
  return (
    <VendorInfoLayout
      title="Get Our Vendors App"
      subtitle="Manage your store anytime, anywhere."
    >
      <p>
        The Nyle Vendors App gives you full control of your store from your
        phone — add new products, track orders, and chat with customers easily.
      </p>

      <p>Available soon on Google Play and App Store.</p>

      <div className="flex space-x-4 mt-6">
        <Link
          href="#"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Google Play
        </Link>
        <Link
          href="#"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          App Store
        </Link>
      </div>
    </VendorInfoLayout>
  );
}
