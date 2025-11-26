"""
Seed script for placeholder testimonials.
Run this once to populate the database with initial testimonials.
"""

import asyncio
from prisma import Prisma

PLACEHOLDER_TESTIMONIALS = [
    {
        "firstName": "Alex",
        "lastName": "R",
        "message": "SELVE felt like talking to a wise friend who also happened to be a data scientist. The triangulation of feedback from my peers was a game-changer for my self-awareness.",
        "role": "Product Manager",
        "company": None,
        "rating": 5,
        "sentimentScore": 0.8,
        "isPlaceholder": True,
        "isApproved": True,
    },
    {
        "firstName": "Jordan",
        "lastName": "T",
        "message": "I've tried every personality test out there. SELVE is the first one that felt dynamic and truly personalized. It's less about putting you in a box and more about giving you a compass.",
        "role": "UX Designer",
        "company": None,
        "rating": 5,
        "sentimentScore": 0.75,
        "isPlaceholder": True,
        "isApproved": True,
    },
]


async def seed_testimonials():
    prisma = Prisma()
    await prisma.connect()
    
    try:
        # Check if there are already testimonials
        existing = await prisma.testimonial.count()
        
        if existing > 0:
            print(f"Found {existing} existing testimonials. Skipping seed.")
            return
        
        # Create placeholder testimonials
        for testimonial in PLACEHOLDER_TESTIMONIALS:
            created = await prisma.testimonial.create(data=testimonial)
            print(f"Created testimonial: {created.firstName} {created.lastName}.")
        
        print(f"\n✅ Successfully seeded {len(PLACEHOLDER_TESTIMONIALS)} placeholder testimonials.")
        
    finally:
        await prisma.disconnect()


if __name__ == "__main__":
    asyncio.run(seed_testimonials())
