import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faArrowLeftLong, 
  faCartShopping, 
  faHeart,
  faShare,
  faStar,
  faTruck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button/Button"
import formatToIDRCurrency from "../../utils/formatToIDRCurrency"
import getAllProducts from "../../services/getAllProducts"

export default function ProductDetail() {
  const {slug} = useParams()
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)

  useEffect(() => {
    const allProducts = getAllProducts()
    const product = allProducts.find(prod => prod.slug === slug)
    setProduct(product)
  },[])

  const handleQuantityChange = (action) => {
    if (action === 'increment' && quantity < product.stock) {
      setQuantity(prev => prev + 1)
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  if(!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-4xl text-pink-400 mb-4">Product Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-500 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <Navbar />
      
      {/* Header & Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-8 gap-4">
          <Link to="/" className="text-pink-400 hover:text-pink-500 transition-colors">
            <FontAwesomeIcon icon={faArrowLeftLong} className="text-3xl" />
          </Link>
          <h4 className="text-3xl font-medium text-gray-800">{product.name ?? 'No Label'}</h4>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="relative group">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-[500px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute top-8 right-8 space-x-3">
                <Button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-full shadow-md transition-all duration-300 ${
                    isWishlist ? 'bg-pink-400 scale-110' : 'bg-white hover:bg-pink-50'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={faHeart} 
                    className={`text-xl ${isWishlist ? 'text-white' : 'text-pink-400'}`}
                  />
                </Button>
                <Button className="p-3 rounded-full bg-white shadow-md hover:bg-blue-50 transition-all duration-300">
                  <FontAwesomeIcon icon={faShare} className="text-xl text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Price & Rating Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl font-bold text-gray-800">
                  {formatToIDRCurrency(product.price) ?? 'Not For Sale'}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon key={star} icon={faStar} className="text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    product.stock <= 25 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    <span className="font-medium">
                      {product.stock <= 25 
                        ? `Only ${product.stock} items left in stock!` 
                        : 'In Stock'}
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700">
                    <span className="font-medium">Out of stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    onClick={() => handleQuantityChange('decrement')}
                    className="px-4 py-2 bg-blue-100 text-blue-500 rounded-l-lg font-bold hover:bg-blue-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center py-2 bg-gray-50 font-medium">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange('increment')}
                    className="px-4 py-2 bg-blue-100 text-blue-500 rounded-r-lg font-bold hover:bg-blue-200 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              {product.stock > 0 ? (
                <Button
                  type="button"
                  className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="font-medium">Add to Cart • {formatToIDRCurrency(product.price * quantity)}</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full py-4 bg-gray-400 text-white rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                  disabled
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="font-medium">Out of Stock</span>
                </Button>
              )}
            </div>

            {/* Product Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Category:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {product.category ?? 'Uncategorized'}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ?? 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}