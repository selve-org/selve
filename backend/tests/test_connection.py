import asyncio
from prisma import Prisma

async def test_connection():
    db = Prisma()
    try:
        await db.connect()
        print("✓ Database connection successful!")
        await db.disconnect()
        return True
    except Exception as e:
        print(f"✗ Database connection failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_connection())
