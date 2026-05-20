import type { APIRoute } from 'astro';
export const productsData = [
     {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    category: "Celulares",
    price: 4990000,          
    priceString: "4.990.000", 
    oldPrice: "5.490.000",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60", 
    rating: 4.8,
    badge: "Oferta",
    specs: ["OLED 6.7\"", "A17 Pro", "48 MP"]
  },
  {
    id: 2,
    name: "Cargador Carga Rápida GaN 65W",
    category: "Accesorios / Cargadores",
    price: 129900,
    priceString: "129.900",
    image: "https://images.unsplash.com/photo-1619134517316-c85ee5222bf9?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    badge: "Top",
    specs: ["3 Puertos", "GaN Tech", "65W Max"]
  },
  {
    id: 3,
    name: "Audífonos Inalámbricos Noise Cancelling",
    category: "Audio",
    price: 349900,
    priceString: "349.900",
    oldPrice: "399.900",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    badge: null,
    specs: ["ANC Activo", "40h Batería", "BT 5.2"]
  },
  {
    id: 4,
    name: "Cable USB-C a USB-C Trenzado 2m",
    category: "Accesorios / Cables",
    price: 45000,
    priceString: "45.000",
    image: "https://images.unsplash.com/photo-1611532736597-eb2d126f4b22?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    badge: null,
    specs: ["100W PD", "Nylon 2m", "480 Mbps"]
  },{
    id: 6,
    name: "Cable USB-C a USB-C Trenzado 2m",
    category: "Accesorios / Cables",
    price: 45000,
    priceString: "45.000",
    image: "https://images.unsplash.com/photo-1611532736597-eb2d126f4b22?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    badge: null,
    specs: ["100W PD", "Nylon 2m", "480 Mbps"]
  },{
    id: 7,
    name: "Cable USB-C a USB-C Trenzado 2m",
    category: "Accesorios / Cables",
    price: 45000,
    priceString: "45.000",
    image: "https://images.unsplash.com/photo-1611532736597-eb2d126f4b22?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    badge: null,
    specs: ["100W PD", "Nylon 2m", "480 Mbps"]
  }
];

// Tu endpoint sigue funcionando igual para si alguien lo consulta desde fuera:
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(productsData), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};