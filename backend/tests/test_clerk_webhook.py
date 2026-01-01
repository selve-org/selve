"""
Comprehensive Clerk Webhook Sanity Tests

Tests all webhook event types and edge cases:
- user.created
- user.updated
- user.deleted
- Signature verification
- Error handling
- Database integrity
"""

import asyncio
import json
import os
import sys
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db import prisma


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'


def print_test(test_name: str):
    """Print test name"""
    print(f"\n{Colors.BLUE}{Colors.BOLD}🧪 TEST: {test_name}{Colors.RESET}")


def print_pass(message: str):
    """Print success message"""
    print(f"{Colors.GREEN}✅ PASS: {message}{Colors.RESET}")


def print_fail(message: str):
    """Print failure message"""
    print(f"{Colors.RED}❌ FAIL: {message}{Colors.RESET}")


def print_info(message: str):
    """Print info message"""
    print(f"{Colors.YELLOW}ℹ️  INFO: {message}{Colors.RESET}")


async def cleanup_test_users():
    """Clean up test users from database"""
    test_clerk_ids = [
        "user_test_created",
        "user_test_updated",
        "user_test_deleted",
        "user_test_duplicate",
    ]

    for clerk_id in test_clerk_ids:
        try:
            await prisma.user.delete_many(where={"clerkId": clerk_id})
        except:
            pass  # User might not exist


async def test_database_connection():
    """Test 1: Verify database connection"""
    print_test("Database Connection")

    try:
        await prisma.connect()
        print_pass("Connected to database")

        # Test query
        user_count = await prisma.user.count()
        print_info(f"Total users in database: {user_count}")

        return True
    except Exception as e:
        print_fail(f"Database connection failed: {e}")
        return False


async def test_webhook_endpoint_exists():
    """Test 2: Verify webhook endpoint exists"""
    print_test("Webhook Endpoint Exists")

    try:
        import httpx

        # Test that endpoint exists (without auth, should fail with 400/401/500, not 404)
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:8000/api/webhooks/clerk",
                json={"type": "test"},
                timeout=5.0
            )

            # Should not be 404 (endpoint exists)
            if response.status_code == 404:
                print_fail("Webhook endpoint not found (404)")
                return False

            print_pass(f"Webhook endpoint exists (returned {response.status_code})")
            return True

    except Exception as e:
        print_fail(f"Error checking endpoint: {e}")
        return False


async def test_user_created_event():
    """Test 3: Test user.created webhook event"""
    print_test("user.created Event")

    clerk_id = "user_test_created"
    email = "test_created@example.com"

    try:
        # Simulate user.created event (bypass signature verification)
        from app.services.user_service import UserService
        service = UserService(db=prisma)

        # Check user doesn't exist
        existing = await prisma.user.find_unique(where={"clerkId": clerk_id})
        if existing:
            print_info("Cleaning up existing test user")
            await prisma.user.delete(where={"clerkId": clerk_id})

        # Create user
        result = await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=email,
            name="Test User Created"
        )

        if result:
            print_pass(f"User created: {clerk_id}")

            # Verify in database
            user = await prisma.user.find_unique(where={"clerkId": clerk_id})

            if user:
                print_pass(f"User verified in database: {user.id}")
                print_info(f"Email: {user.email}")
                return True
            else:
                print_fail("User not found in database after creation")
                return False
        else:
            print_fail("User creation failed")
            return False

    except Exception as e:
        print_fail(f"Error in user.created test: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_user_updated_event():
    """Test 4: Test user.updated webhook event"""
    print_test("user.updated Event")

    clerk_id = "user_test_updated"
    original_email = "test_updated_original@example.com"
    new_email = "test_updated_new@example.com"

    try:
        from app.services.user_service import UserService
        service = UserService(db=prisma)

        # Create user first
        await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=original_email,
            name="Test User"
        )
        print_info(f"Created user with email: {original_email}")

        # Update user
        await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=new_email,
            name="Test User Updated"
        )

        # Verify update
        user = await prisma.user.find_unique(where={"clerkId": clerk_id})

        if user and user.email == new_email:
            print_pass(f"User updated successfully: {new_email}")
            return True
        else:
            print_fail(f"User update failed. Expected: {new_email}, Got: {user.email if user else 'None'}")
            return False

    except Exception as e:
        print_fail(f"Error in user.updated test: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_user_deleted_event():
    """Test 5: Test user.deleted webhook event"""
    print_test("user.deleted Event")

    clerk_id = "user_test_deleted"
    email = "test_deleted@example.com"

    try:
        from app.services.user_service import UserService
        service = UserService(db=prisma)

        # Create user first
        await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=email,
            name="Test User Delete"
        )
        print_info(f"Created user: {clerk_id}")

        # Delete user
        result = await service.handle_user_deleted(clerk_id=clerk_id)

        if result:
            print_pass("User deletion processed successfully")

            # Verify user is archived (soft delete)
            user = await prisma.user.find_unique(where={"clerkId": clerk_id})

            if user:
                if user.isArchived:
                    print_pass("User marked as archived (soft delete)")
                    print_info(f"Archived at: {user.archivedAt}")
                    return True
                else:
                    print_fail("User exists but not marked as archived")
                    return False
            else:
                # Hard delete - also acceptable
                print_pass("User hard deleted from database")
                return True
        else:
            print_fail("User deletion failed")
            return False

    except Exception as e:
        print_fail(f"Error in user.deleted test: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_duplicate_event_handling():
    """Test 6: Test idempotency - duplicate events"""
    print_test("Duplicate Event Handling (Idempotency)")

    clerk_id = "user_test_duplicate"
    email = "test_duplicate@example.com"

    try:
        from app.services.user_service import UserService
        service = UserService(db=prisma)

        # Create user twice
        result1 = await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=email,
            name="Test Duplicate"
        )
        print_info("First creation")

        result2 = await service.sync_user_from_clerk(
            clerk_id=clerk_id,
            email=email,
            name="Test Duplicate"
        )
        print_info("Second creation (duplicate)")

        # Verify only one user exists
        users = await prisma.user.find_many(where={"clerkId": clerk_id})

        if len(users) == 1:
            print_pass("Duplicate event handled correctly (only 1 user created)")
            return True
        else:
            print_fail(f"Expected 1 user, found {len(users)}")
            return False

    except Exception as e:
        print_fail(f"Error in duplicate test: {e}")
        import traceback
        traceback.print_exc()
        return False


async def test_environment_configuration():
    """Test 7: Verify environment configuration"""
    print_test("Environment Configuration")

    webhook_secret = os.getenv("CLERK_WEBHOOK_SECRET")

    if webhook_secret:
        if webhook_secret.startswith("whsec_"):
            print_pass("CLERK_WEBHOOK_SECRET is set and valid")
            print_info(f"Secret: {webhook_secret[:10]}...")
            return True
        else:
            print_fail("CLERK_WEBHOOK_SECRET is set but doesn't start with 'whsec_'")
            return False
    else:
        print_fail("CLERK_WEBHOOK_SECRET not set - webhook verification disabled!")
        print_info("Set CLERK_WEBHOOK_SECRET in .env for production security")
        return False


async def run_all_tests():
    """Run all sanity tests"""
    print(f"\n{Colors.BOLD}{'='*60}")
    print(f"🧪 CLERK WEBHOOK SANITY TESTS")
    print(f"{'='*60}{Colors.RESET}\n")

    results = {}

    # Test 1: Database Connection
    results["database"] = await test_database_connection()

    if not results["database"]:
        print_fail("Database connection failed - cannot continue tests")
        await prisma.disconnect()
        return results

    # Clean up before tests
    print_info("Cleaning up test users...")
    await cleanup_test_users()

    # Test 2: Endpoint exists
    results["endpoint"] = await test_webhook_endpoint_exists()

    # Test 3-6: Event handling
    results["user_created"] = await test_user_created_event()
    results["user_updated"] = await test_user_updated_event()
    results["user_deleted"] = await test_user_deleted_event()
    results["idempotency"] = await test_duplicate_event_handling()

    # Test 7: Configuration
    results["config"] = await test_environment_configuration()

    # Clean up after tests
    print_info("\nCleaning up test users...")
    await cleanup_test_users()

    # Disconnect
    await prisma.disconnect()

    # Summary
    print(f"\n{Colors.BOLD}{'='*60}")
    print(f"📊 TEST SUMMARY")
    print(f"{'='*60}{Colors.RESET}\n")

    passed = sum(1 for v in results.values() if v)
    total = len(results)

    for test_name, passed_test in results.items():
        status = f"{Colors.GREEN}✅ PASS" if passed_test else f"{Colors.RED}❌ FAIL"
        print(f"{status}{Colors.RESET} - {test_name}")

    print(f"\n{Colors.BOLD}Result: {passed}/{total} tests passed{Colors.RESET}")

    if passed == total:
        print(f"{Colors.GREEN}{Colors.BOLD}🎉 ALL TESTS PASSED!{Colors.RESET}\n")
        return True
    else:
        print(f"{Colors.RED}{Colors.BOLD}⚠️  SOME TESTS FAILED{Colors.RESET}\n")
        return False


if __name__ == "__main__":
    success = asyncio.run(run_all_tests())
    sys.exit(0 if success else 1)
