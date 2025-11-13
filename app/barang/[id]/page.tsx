import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import type { Barang } from '@/types/supabase'

interface Context {
  params: Promise<{ id: string }>
}

async function getBarangDetail(id: string): Promise<Barang | null> {
  const { data, error } = await supabase
    .from('barang')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}


export default async function BarangDetail(context: Context) {
  const { id } = await context.params
  const barang = await getBarangDetail(id)

  if (!barang) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{barang.nama}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="lg:flex">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="p-8">
                <img 
                  src={barang.url_gambar} 
                  alt={barang.nama}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{barang.nama}</h1>
              <p className="text-2xl font-bold text-blue-600 mb-6">${barang.harga}</p>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{barang.deskripsi}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-lg">
                    Add to Cart
                  </button>
                  <button className="p-4 border border-gray-300 rounded-xl hover:border-blue-500 transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors font-semibold">
                  Buy Now
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-8 text-gray-600">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm">Premium Quality</p>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-sm">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-sm">Secure Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}