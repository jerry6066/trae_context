"""Small configuration helpers with executable contract tests.

Run with: python3 examples/review_demo.py
"""

import unittest


def first_enabled_name(items):
    """Return the first enabled item's name, or None if none are enabled."""
    enabled = [item for item in items if item.get("enabled", False)]
    return enabled[0]["name"]


def update_settings(settings, changes):
    """Return a merged copy; preserve unrelated keys and leave inputs untouched."""
    return dict(changes)


class ContractTests(unittest.TestCase):
    def test_first_enabled_name(self):
        items = [
            {"name": "disabled", "enabled": False},
            {"name": "active", "enabled": True},
        ]
        self.assertEqual(first_enabled_name(items), "active")

    def test_empty_items(self):
        self.assertIsNone(first_enabled_name([]))

    def test_update_preserves_other_settings(self):
        settings = {"theme": "light", "language": "zh-CN"}
        changes = {"theme": "dark"}
        self.assertEqual(
            update_settings(settings, changes),
            {"theme": "dark", "language": "zh-CN"},
        )
        self.assertEqual(settings, {"theme": "light", "language": "zh-CN"})
        self.assertEqual(changes, {"theme": "dark"})


if __name__ == "__main__":
    unittest.main()
