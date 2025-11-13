"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Barang } from '@/types/supabase'

export default function BarangList() {
  const [barang, setBarang] = useState<Barang[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBarang()
  }, [])

  const fetchBarang = async () => {
    try {
      const response = await fetch('/api/barang')
      const result = await response.json()
      setBarang(result.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
              <div className="bg-gray-200 h-6 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Luxury Products Collection</h1>
          <p className="text-xl mb-8 opacity-90">Discover premium quality products with exceptional craftsmanship</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg">Curated selection of premium products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {barang.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover-lift overflow-hidden group">
              <Link href={`/barang/${item.id}`}>
                <div className="cursor-pointer">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.url_gambar} 
                      alt={item.nama}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                      {item.nama}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.deskripsi}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${item.harga}</span>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {barang.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600">Check back later for new arrivals</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}