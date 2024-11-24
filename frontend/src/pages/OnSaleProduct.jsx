const OnSaleProduct = ({ products }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="text-center text-lg">No products on sale</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold text-primary">${product.price}</span>
                  <span className="badge badge-error">{product.discountPercentage}% OFF</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default OnSaleProduct;
  