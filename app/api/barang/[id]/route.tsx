import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

interface Context {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, context: Context) {
  const { id } = await context.params

  const { data, error } = await supabase
    .from('barang')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Barang not found' }, { status: 404 })
  }

  return NextResponse.json({ data })
}

export async function PUT(request: Request, context: Context) {
  const { id } = await context.params
  const { nama, deskripsi, harga, url_gambar } = await request.json()

  const { data, error } = await supabase
    .from('barang')
    .update({ nama, deskripsi, harga, url_gambar })
    .eq('id', id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: data[0] })
}

export async function DELETE(request: Request, context: Context) {
  const { id } = await context.params

  const { error } = await supabase
    .from('barang')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Barang deleted successfully' })
}