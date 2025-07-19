export const Info = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                
                {/* Shipping Info Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">SHIPPING INFO</h1>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                            At Keya (केया), every kurti is made with care and packed with love. Here's everything you need to know about how your order reaches you:
                        </p>
                        
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Where do we ship?</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We currently ship across all serviceable pincodes in India.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">How long does delivery take?</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span><span className="font-medium">Processing Time:</span> 3–5 working days (since we make each piece after you order)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span><span className="font-medium">Delivery Time:</span> 3–7 working days post dispatch, depending on your location</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span><span className="font-medium">Total Time:</span> Please allow 8–12 working days from order to delivery.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Shipping Charges</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span><span className="font-medium text-red-700">₹70 flat shipping fee</span> for orders below ₹1500</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span><span className="font-medium text-green-600">Free shipping</span> on all prepaid orders above ₹1500</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Order Tracking</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Once your order is packed and dispatched, you'll receive a tracking link via SMS or email. You can also DM us on Instagram (labelkeya_) for any updates.
                                </p>
                            </div>

                            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-800">
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Important Notes:</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span>We do not offer COD (Cash on Delivery) currently but will do soon.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span>Orders once placed cannot be canceled after 12 hours.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span>In case of delays due to weather, strikes, or courier disruptions, we'll keep you informed.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Returns & Exchanges Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">RETURNS & EXCHANGES</h1>
                        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                            At Keya, every piece is made-to-order with love, which means we do not accept returns. However, we do offer exchanges for size-related issues, provided the conditions below are met.
                        </p>
                        
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">What's eligible for exchange:</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-green-600 mr-2">✓</span>
                                        <span>Only size exchanges for the same product</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-green-600 mr-2">✓</span>
                                        <span>Request must be raised within 24 hours of delivery</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-green-600 mr-2">✓</span>
                                        <span>Product must be unused, unwashed, and in original condition</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-green-600 mr-2">✓</span>
                                        <span>Exchange is allowed only once per order</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">What's not eligible:</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-600 mr-2">✗</span>
                                        <span>Orders placed under discounts or offers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-600 mr-2">✗</span>
                                        <span>Plus-size garments (3XL and above)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-600 mr-2">✗</span>
                                        <span>Custom-sized products</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-600 mr-2">✗</span>
                                        <span>Requests raised after 24 hours</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-600 mr-2">✗</span>
                                        <span>Minor color or fabric texture differences (please allow slight variations due to lighting, screen settings, or handcrafted nature)</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Exchange Process:</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <span className="bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                                        <span className="text-gray-700">DM us your Order ID and issue on Instagram (labelkeya_) or email us at keyaandyou@gmail.com</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                                        <span className="text-gray-700">We'll confirm the request within 24–48 hours</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                                        <span className="text-gray-700">If reverse pickup is available for your pincode, we'll schedule it. If not, you'll need to self-ship.</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                                        <span className="text-gray-700">Once we receive and inspect your original item, we'll ship your replacement.</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-red-800 mb-4">Exchange charges:</h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span>₹100 for standard size changes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-medium text-red-700 mr-2">•</span>
                                        <span>₹250 for design customizations</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                                <p className="text-gray-700 leading-relaxed">
                                    <span className="font-medium text-blue-800">Pro Tip:</span> We've added a 2–3 inch extra margin inside each garment to allow for easy self-alteration in case of minor size issues — this is often the fastest solution without the wait.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cancellation Policy Section */}
                <section className="mb-16">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">CANCELLATION POLICY</h1>
                        
                        <div className="text-center space-y-6">
                            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-800">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Orders once placed cannot be cancelled or changed, as they are made-to-order. 
                                    Please double-check your size and order details before confirming.
                                </p>
                            </div>
                            
                            <div className="bg-[#7c1034] text-white p-6 rounded-lg">
                                <h3 className="text-xl font-medium">
                                    Thank you for choosing slow fashion — made for you, with pyaar se ❤️
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Info;