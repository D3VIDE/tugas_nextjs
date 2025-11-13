import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from('barang')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  try {
    const { nama, deskripsi, harga, url_gambar } = await request.json()

    const { data, error } = await supabase
      .from('barang')
      .insert([{ 
        nama, 
        deskripsi, 
        harga, 
        url_gambar 
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}