export default function ProductDetails({ params }) {
  return (
    <div className="p-6">
      <h1>Product ID: {params.id}</h1>
      <p>Product details loading…</p>
    </div>
  );
}
