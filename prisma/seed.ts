import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@trendymen.tn' },
        update: {},
        create: {
            email: 'admin@trendymen.tn',
            password: 'password123', // Note: In production this MUST be hashed
            role: 'ADMIN',
        },
    })

    // Create Categories
    const categories = ['T-Shirts', 'Shirts', 'Jeans', 'Pants', 'Jackets', 'Shoes', 'Accessories']

    for (const cat of categories) {
        await prisma.category.create({
            data: { name: cat }
        })
    }

    const categoryRecords = await prisma.category.findMany()

    // Products
    const productsData = [
        { name: 'Classic White T-Shirt', slug: 'classic-white-tshirt', price: 35.0, catName: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
        { name: 'Black Denim Jacket', slug: 'black-denim-jacket', price: 120.0, catName: 'Jackets', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500' },
        { name: 'Slim Fit Blue Jeans', slug: 'slim-fit-blue-jeans', price: 85.0, catName: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-780c821cd2e3?w=500' },
        { name: 'Casual Linen Shirt', slug: 'casual-linen-shirt', price: 65.0, catName: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500' },
        { name: 'Leather Chelsea Boots', slug: 'leather-chelsea-boots', price: 150.0, catName: 'Shoes', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500' },
        { name: 'Gold Tone Watch', slug: 'gold-tone-watch', price: 200.0, catName: 'Accessories', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500' },
        { name: 'Navy Chino Pants', slug: 'navy-chino-pants', price: 75.0, catName: 'Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500' },
        { name: 'Graphic Print T-Shirt', slug: 'graphic-print-tshirt', price: 40.0, catName: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500' },
        { name: 'Oxford Button Down', slug: 'oxford-button-down', price: 80.0, catName: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500' },
        { name: 'Distressed Black Jeans', slug: 'distressed-black-jeans', price: 90.0, catName: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500' },
        { name: 'Bomber Jacket Green', slug: 'bomber-jacket-green', price: 110.0, catName: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500' },
        { name: 'White Sneakers', slug: 'white-sneakers', price: 95.0, catName: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500' },
        { name: 'Leather Belt Black', slug: 'leather-belt-black', price: 30.0, catName: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500' },
        { name: 'Cargo Pants Olive', slug: 'cargo-pants-olive', price: 85.0, catName: 'Pants', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500' },
        { name: 'V-Neck Basic Tee', slug: 'v-neck-basic-tee', price: 30.0, catName: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
        { name: 'Flannel Checked Shirt', slug: 'flannel-checked-shirt', price: 55.0, catName: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500' },
        { name: 'Raw Denim Indigo', slug: 'raw-denim-indigo', price: 100.0, catName: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-780c821cd2e3?w=500' },
        { name: 'Winter Parka Coat', slug: 'winter-parka-coat', price: 180.0, catName: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
        { name: 'Suede Loafers', slug: 'suede-loafers', price: 130.0, catName: 'Shoes', image: 'https://images.unsplash.com/photo-1614252235314-e59663ea5573?w=500' },
        { name: 'Sunglasses Aviator', slug: 'sunglasses-aviator', price: 45.0, catName: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' },
    ]

    for (const p of productsData) {
        const cat = categoryRecords.find(c => c.name === p.catName)
        if (cat) {
            await prisma.product.create({
                data: {
                    name: p.name,
                    slug: p.slug,
                    description: `Premium ${p.name.toLowerCase()} perfect for any occasion.`,
                    price: p.price,
                    stock: 50,
                    images: p.image,
                    sizes: ['S', 'M', 'L', 'XL'].join(','),
                    colors: ['Black', 'White', 'Navy'].join(','),
                    categoryId: cat.id
                }
            })
        }
    }

    console.log('Seed completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
