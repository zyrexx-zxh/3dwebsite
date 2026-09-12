"""
Server-side mirror of the frontend's siteConfig.js catalog.
"""

FRONTEND_STACKS = {
    "meta": {"name": "Instagram & Facebook", "price_modifier": 0},
    "telegram": {"name": "Telegram", "price_modifier": 0},
    "snapchat": {"name": "Snapchat", "price_modifier": 0},
}

PROJECT_TYPES = {
    "priority-auth": {"name": "Priority Authentication Support", "base_price": 350},
    "recovery-consulting": {"name": "Account Recovery Consulting", "base_price": 200},
    "emergency-audit": {"name": "Emergency Platform Audit", "base_price": 4000},
    "adv-verification": {"name": "Advanced Verification Setup", "base_price": 69},
    "manual-support": {"name": "Manual Account Support", "base_price": 1500},
    "tg-bot": {"name": "Mini-App & Bot Automation", "base_price": 300},
    "tg-engage": {"name": "Channel Engagement Strategy", "base_price": 8},
    "snap-security": {"name": "Account Security Consulting", "base_price": 350},
}

HOSTING_PLANS = {
    "standard": {"name": "Standard Processing", "price": 0},
    "priority": {"name": "Priority Queue", "price": 50},
}

DOMAIN_OPTIONS = {
    "have-tg": {"label": "I HAVE TELEGRAM", "fee": 0},
    "no-tg": {"label": "NO TELEGRAM ACCOUNT", "fee": 0},
}

PAYMENT_NETWORKS = {
    "usdt-trc20": {
        "name": "USDT (TRC-20)",
        "network": "Tron Network",
        "admin_address": "TYourTronAddressHere",
    },
    "btc": {
        "name": "Bitcoin",
        "network": "Bitcoin Network",
        "admin_address": "bc1YourBtcAddressHere",
    },
    "eth": {
        "name": "Ethereum",
        "network": "Ethereum mainnet",
        "admin_address": "0xYourEthAddressHere",
    },
    "sol": {
        "name": "Solana",
        "network": "Solana Network",
        "admin_address": "YourSolanaAddressHere",
    },
}

def compute_expected_total(frontend_stack: str, project_type: str, domain_option: str) -> float:
    total = 0.0
    project = PROJECT_TYPES.get(project_type)
    if project:
        total += project["base_price"]
    stack = FRONTEND_STACKS.get(frontend_stack)
    if stack:
        total += stack["price_modifier"]
    domain = DOMAIN_OPTIONS.get(domain_option)
    if domain:
        total += domain["fee"]
    return total
