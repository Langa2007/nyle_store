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
    return Product(
      id: json['id'],
      name: json['name'] ?? 'No Name',
      description: json['description'] ?? '',
      price: (json['price'] as num).toDouble(),
      imageUrl: json['image_url'] ?? json['image'],
      category: json['category'] ?? 'Uncategorized',
      vendorName: json['vendor_name'] ?? 'Unknown Seller',
      shippingRate: (json['shipping_rate'] as num?)?.toDouble() ?? 0.0,
    );
  }
}
