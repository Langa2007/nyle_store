"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Uasin Gishu", "Kericho",
  "Nyeri", "Meru", "Machakos", "Kakamega", "Bungoma", "Kisii", "Migori", "Embu",
  "Kitui", "Laikipia", "Garissa", "Mandera", "Wajir", "Marsabit", "Turkana",
  "Samburu", "Narok", "Kajiado", "Bomet", "Siaya", "Homa Bay", "Vihiga",
  "Busia", "Trans Nzoia", "Elgeyo Marakwet", "West Pokot", "Nandi",
  "Baringo", "Tharaka-Nithi", "Isiolo", "Tana River", "Kilifi", "Kwale",
  "Lamu", "Taita-Taveta", "Murang’a", "Nyandarua", "Kirinyaga"
];

const businessTypes = [
  "Electronics & Accessories", "Home & Garden", "Cutleries", "Beauty Products",
  "Construction, Building & Machinery", "Groceries", "Office Supplies",
  "Luggage & Bags", "Men's Wear", "Children's Wear", "Women's Outfit",
  "Sports Gears", "Farm Clothing", "Farm Equipment", "Computers", "Baby Products",
  "Household Items", "Phones & Tablets", "Other"
];

export default function VendorSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    legal_name: "",
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    business_type: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters, contain letters, numbers, and one special character.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vendors/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Successful signup message
      alert(
        "Signup successful! Please verify your email. Once verified, your account will be under review for admin approval. You’ll receive an email once approved or rejected."
      );

      router.push("/vendor/login");
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Become a Seller
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="legal_name" placeholder="Legal Name"
            value={form.legal_name} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="text" name="company_name" placeholder="Company / Store Name"
            value={form.company_name} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="text" name="contact_person" placeholder="Contact Person"
            value={form.contact_person} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="text" name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="text" name="address" placeholder="Business Address"
            value={form.address} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <select name="country" value={form.country} onChange={handleChange} required
            className="w-full p-3 border rounded">
            <option value="">Select County</option>
            {counties.map((county, i) => (
              <option key={i} value={county}>{county}</option>
            ))}
          </select>

          <select name="business_type" value={form.business_type} onChange={handleChange} required
            className="w-full p-3 border rounded">
            <option value="">Select Business Type</option>
            {businessTypes.map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </select>

          <input type="password" name="password" placeholder="Password"
            value={form.password} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <input type="password" name="confirm_password" placeholder="Confirm Password"
            value={form.confirm_password} onChange={handleChange} required
            className="w-full p-3 border rounded" />

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
