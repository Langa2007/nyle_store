class Product {
  final int id;
  final String name;
  final String description;
  final double price;
  final String? imageUrl;
  final String category;
  final String vendorName;
  final double shippingRate;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    this.imageUrl,
    required this.category,
    required this.vendorName,
    required this.shippingRate,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    double parseDouble(dynamic value) {
      if (value == null) return 0.0;
      if (value is num) return value.toDouble();
      if (value is String) return double.tryParse(value) ?? 0.0;
      return 0.0;
    }

    return Product(
      id: json['id'],
      name: json['name'] ?? 'No Name',
      description: json['description'] ?? '',
      price: parseDouble(json['price']),
      imageUrl: json['image_url'] ?? json['image'],
      category: json['category'] ?? 'Uncategorized',
      vendorName: json['vendor_name'] ?? 'Unknown Seller',
      shippingRate: parseDouble(json['shipping_rate']),
    );
  }
}
